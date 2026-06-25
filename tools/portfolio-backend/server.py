import http.server
import json
import os
import sqlite3
import hashlib
import uuid
import sys
import base64
import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

try:
    import stripe
except ImportError:
    stripe = None

# Ensure stdout is unbuffered
sys.stdout.reconfigure(line_buffering=True)

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "portfolio.db")
SESSIONS = {}  # token -> user_id

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

def init_db():
    conn = get_db_connection()
    c = conn.cursor()
    
    # 1. Users table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE,
            password_hash TEXT,
            created_at TEXT
        )
    ''')
    
    # 2. Profiles table
    c.execute('''
        CREATE TABLE IF NOT EXISTS profiles (
            id TEXT PRIMARY KEY,
            email TEXT,
            full_name TEXT,
            phone TEXT,
            notifications INTEGER DEFAULT 1,
            email_updates INTEGER DEFAULT 1,
            is_online INTEGER DEFAULT 0,
            last_seen TEXT,
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE
        )
    ''')
    
    # 3. Orders table
    c.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            service_type TEXT,
            package_type TEXT,
            price REAL,
            status TEXT DEFAULT 'pending',
            stripe_payment_intent_id TEXT,
            stripe_checkout_session_id TEXT,
            requirements TEXT,
            google_drive_folder_id TEXT,
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY(user_id) REFERENCES profiles(id) ON DELETE CASCADE
        )
    ''')
    
    # 4. Order Files table
    c.execute('''
        CREATE TABLE IF NOT EXISTS order_files (
            id TEXT PRIMARY KEY,
            order_id TEXT,
            file_name TEXT,
            file_url TEXT,
            file_type TEXT,
            uploaded_at TEXT,
            FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE
        )
    ''')
    
    # 5. Blog Posts table
    c.execute('''
        CREATE TABLE IF NOT EXISTS blog_posts (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            title TEXT,
            slug TEXT UNIQUE,
            description TEXT,
            category TEXT,
            content TEXT,
            read_time TEXT DEFAULT '5 min',
            published INTEGER DEFAULT 0,
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY(user_id) REFERENCES profiles(id) ON DELETE CASCADE
        )
    ''')
    
    # 6. Direct Messages table
    c.execute('''
        CREATE TABLE IF NOT EXISTS direct_messages (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            admin_id TEXT,
            subject TEXT,
            message TEXT,
            file_url TEXT,
            file_name TEXT,
            read INTEGER DEFAULT 0,
            status TEXT DEFAULT 'open',
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY(user_id) REFERENCES profiles(id) ON DELETE CASCADE
        )
    ''')
    
    # 7. Order Messages table (Live Chat)
    c.execute('''
        CREATE TABLE IF NOT EXISTS order_messages (
            id TEXT PRIMARY KEY,
            order_id TEXT,
            user_id TEXT,
            message TEXT,
            file_url TEXT,
            file_name TEXT,
            read INTEGER DEFAULT 0,
            created_at TEXT,
            FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY(user_id) REFERENCES profiles(id) ON DELETE CASCADE
        )
    ''')
    
    # 8. Order Revisions table
    c.execute('''
        CREATE TABLE IF NOT EXISTS order_revisions (
            id TEXT PRIMARY KEY,
            order_id TEXT,
            user_id TEXT,
            revision_number INTEGER,
            request_description TEXT,
            status TEXT DEFAULT 'pending',
            admin_notes TEXT,
            created_at TEXT,
            updated_at TEXT,
            UNIQUE(order_id, revision_number),
            FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY(user_id) REFERENCES profiles(id) ON DELETE CASCADE
        )
    ''')
    
    # 9. Contact Submissions table
    c.execute('''
        CREATE TABLE IF NOT EXISTS contact_submissions (
            id TEXT PRIMARY KEY,
            name TEXT,
            email TEXT,
            phone TEXT,
            service TEXT,
            budget TEXT,
            message TEXT,
            created_at TEXT
        )
    ''')

    # 10. Showcase Projects table (portfolio CMS — editable without code)
    c.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            name TEXT,
            category TEXT,
            status TEXT DEFAULT 'wip',
            blurb TEXT,
            stack TEXT,
            image_url TEXT,
            video_url TEXT,
            demo_url TEXT,
            github_url TEXT,
            case_study_url TEXT,
            internal_demo INTEGER DEFAULT 0,
            sort_order INTEGER DEFAULT 0,
            published INTEGER DEFAULT 0,
            created_at TEXT,
            updated_at TEXT
        )
    ''')

    conn.commit()
    conn.close()

init_db()

class RequestHandler(http.server.BaseHTTPRequestHandler):
    def get_authenticated_user(self):
        auth_header = self.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            if token in SESSIONS:
                return SESSIONS[token]
        return None

    def get_authenticated_email(self):
        uid = self.get_authenticated_user()
        if not uid:
            return None
        conn = get_db_connection()
        c = conn.cursor()
        c.execute("SELECT email FROM users WHERE id = ?", (uid,))
        row = c.fetchone()
        conn.close()
        return row[0] if row else None

    def is_admin_request(self):
        email = self.get_authenticated_email()
        return bool(email and (email == "solomonolufelo@outlook.com" or "admin" in email))

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        if parsed_url.path == "/api/auth/session":
            self.handle_get_session()
        elif parsed_url.path == "/api/messages/realtime":
            self.handle_realtime_messages()
        else:
            self.send_error(404, "Endpoint Not Found")

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        if parsed_url.path == "/api/auth/signup":
            self.handle_signup()
        elif parsed_url.path == "/api/auth/login":
            self.handle_login()
        elif parsed_url.path == "/api/auth/logout":
            self.handle_logout()
        elif parsed_url.path == "/api/order/checkout":
            self.handle_checkout()
        elif parsed_url.path == "/api/stripe/webhook":
            self.handle_stripe_webhook()
        elif parsed_url.path == "/api/order/message-notification":
            self.handle_message_notification()
        elif parsed_url.path == "/api/order/revision-notification":
            self.handle_revision_notification()
        elif parsed_url.path == "/api/contact/submit":
            self.handle_contact_submit()
        elif parsed_url.path == "/api/upload":
            self.handle_upload()
        elif parsed_url.path == "/api/admin/create-client-project":
            self.handle_create_client_project()
        elif parsed_url.path == "/api/project/notify":
            self.handle_project_notify()
        elif parsed_url.path.startswith("/api/db/"):
            table_name = parsed_url.path.split("/api/db/")[1]
            self.handle_database_query(table_name)
        else:
            self.send_error(404, "Endpoint Not Found")

    def handle_signup(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            params = json.loads(body.decode("utf-8"))
            
            email = params.get("email", "").strip().lower()
            password = params.get("password", "")
            
            # Support both direct full_name and options.data.full_name
            full_name = params.get("full_name", "")
            if not full_name and "options" in params:
                full_name = params.get("options", {}).get("data", {}).get("full_name", "")
            full_name = full_name.strip() if full_name else email.split("@")[0].capitalize()
            
            if not email or not password:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Email and password required"}).encode("utf-8"))
                return
                
            password_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
            user_id = str(uuid.uuid4())
            created_at = datetime.now().isoformat()
            
            conn = get_db_connection()
            c = conn.cursor()
            try:
                # Insert user
                c.execute("INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
                          (user_id, email, password_hash, created_at))
                # Insert default profile
                c.execute("INSERT INTO profiles (id, email, full_name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
                          (user_id, email, full_name, created_at, created_at))
                conn.commit()
            except sqlite3.IntegrityError:
                conn.close()
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "User with this email already exists"}).encode("utf-8"))
                return
                
            conn.close()
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"message": "Registration successful!", "user_id": user_id}).encode("utf-8"))
            
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def handle_login(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            params = json.loads(body.decode("utf-8"))
            
            email = params.get("email", "").strip().lower()
            password = params.get("password", "")
            
            password_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
            
            conn = get_db_connection()
            c = conn.cursor()
            c.execute("SELECT id FROM users WHERE email = ? AND password_hash = ?", (email, password_hash))
            row = c.fetchone()
            conn.close()
            
            if not row:
                self.send_response(401)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Invalid email or password"}).encode("utf-8"))
                return
                
            user_id = row[0]
            token = str(uuid.uuid4())
            SESSIONS[token] = user_id
            
            # Update last_seen and online status
            conn = get_db_connection()
            c = conn.cursor()
            c.execute("UPDATE profiles SET is_online = 1, last_seen = ? WHERE id = ?", (datetime.now().isoformat(), user_id))
            conn.commit()
            conn.close()
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"token": token, "user_id": user_id, "email": email, "message": "Login successful!"}).encode("utf-8"))
            
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def handle_logout(self):
        auth_header = self.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            if token in SESSIONS:
                user_id = SESSIONS[token]
                # Update online status
                conn = get_db_connection()
                c = conn.cursor()
                c.execute("UPDATE profiles SET is_online = 0 WHERE id = ?", (user_id,))
                conn.commit()
                conn.close()
                
                del SESSIONS[token]
                        
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"message": "Logged out successfully"}).encode("utf-8"))

    def handle_get_session(self):
        user_id = self.get_authenticated_user()
        if not user_id:
            self.send_response(401)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"authenticated": False}).encode("utf-8"))
            return
            
        conn = get_db_connection()
        c = conn.cursor()
        c.execute("SELECT u.email, p.full_name FROM users u LEFT JOIN profiles p ON u.id = p.id WHERE u.id = ?", (user_id,))
        row = c.fetchone()
        conn.close()
        
        email = row[0] if row else ""
        full_name = row[1] if row else ""
        
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"authenticated": True, "user_id": user_id, "email": email, "full_name": full_name}).encode("utf-8"))

    def handle_database_query(self, table_name):
        user_id = self.get_authenticated_user()
        # Authenticate queries (except select published blog posts)
        is_public_blog_request = False
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            params = json.loads(body.decode("utf-8"))
            
            operation = params.get("operation", "select")
            conditions = params.get("conditions", {})
            order = params.get("order")
            is_single = params.get("isSingle", False)
            data = params.get("data")
            
            if table_name in ("blog_posts", "projects") and operation == "select" and conditions.get("published") == 1:
                is_public_blog_request = True
                
            if not user_id and not is_public_blog_request:
                self.send_response(401)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Unauthorized"}).encode("utf-8"))
                return
                
            conn = get_db_connection()
            c = conn.cursor()
            
            # Format outputs mapping SQLite types to JSON expectations
            def format_row(cursor, row_data):
                if not row_data:
                    return None
                desc = cursor.description
                return {desc[i][0]: row_data[i] for i in range(len(desc))}

            def attach_profile_info(row_dict):
                if not row_dict or "user_id" not in row_dict or not row_dict["user_id"]:
                    return row_dict
                if "profiles" not in row_dict:
                    pc = conn.cursor()
                    pc.execute("SELECT email, full_name, last_seen, is_online FROM profiles WHERE id = ?", (row_dict["user_id"],))
                    p_row = pc.fetchone()
                    if p_row:
                        row_dict["profiles"] = {
                            "email": p_row[0],
                            "full_name": p_row[1],
                            "last_seen": p_row[2],
                            "is_online": bool(p_row[3])
                        }
                    else:
                        row_dict["profiles"] = None
                return row_dict
                
            if operation == "select":
                query = f"SELECT * FROM {table_name}"
                where_clauses = []
                values = []
                for k, v in conditions.items():
                    where_clauses.append(f"{k} = ?")
                    values.append(v)
                    
                if where_clauses:
                    query += " WHERE " + " AND ".join(where_clauses)
                    
                if order:
                    field = order.get("field", "created_at")
                    ascending = order.get("ascending", True)
                    query += f" ORDER BY {field} {'ASC' if ascending else 'DESC'}"
                    
                if is_single:
                    query += " LIMIT 1"
                    
                c.execute(query, values)
                if is_single:
                    row = c.fetchone()
                    result = attach_profile_info(format_row(c, row))
                else:
                    rows = c.fetchall()
                    result = [attach_profile_info(format_row(c, r)) for r in rows]
                    
            elif operation == "insert":
                # Ensure user_id is injected for security in tables owned by users
                if isinstance(data, dict):
                    if "user_id" in data and table_name in ("orders", "order_messages", "direct_messages", "order_revisions"):
                        data["user_id"] = user_id
                    elif "id" in data and table_name == "profiles":
                        data["id"] = user_id
                        
                    cols = ", ".join(data.keys())
                    placeholders = ", ".join(["?"] * len(data))
                    query = f"INSERT INTO {table_name} ({cols}) VALUES ({placeholders})"
                    c.execute(query, list(data.values()))
                    result = data
                elif isinstance(data, list):
                    # Multi-row insert
                    result = []
                    for row_item in data:
                        if "user_id" in row_item and table_name in ("orders", "order_messages", "direct_messages", "order_revisions"):
                            row_item["user_id"] = user_id
                        cols = ", ".join(row_item.keys())
                        placeholders = ", ".join(["?"] * len(row_item))
                        query = f"INSERT INTO {table_name} ({cols}) VALUES ({placeholders})"
                        c.execute(query, list(row_item.values()))
                        result.append(row_item)
                else:
                    raise ValueError("Insert data must be dictionary or list")
                    
            elif operation == "update":
                set_clauses = []
                values = []
                for k, v in data.items():
                    set_clauses.append(f"{k} = ?")
                    values.append(v)
                    
                query = f"UPDATE {table_name} SET " + ", ".join(set_clauses)
                where_clauses = []
                for k, v in conditions.items():
                    where_clauses.append(f"{k} = ?")
                    values.append(v)
                    
                if where_clauses:
                    query += " WHERE " + " AND ".join(where_clauses)
                    
                c.execute(query, values)
                result = data
                
            elif operation == "delete":
                query = f"DELETE FROM {table_name}"
                where_clauses = []
                values = []
                for k, v in conditions.items():
                    where_clauses.append(f"{k} = ?")
                    values.append(v)
                    
                if where_clauses:
                    query += " WHERE " + " AND ".join(where_clauses)
                    
                c.execute(query, values)
                result = {"deleted": c.rowcount}
                
            else:
                raise ValueError("Unsupported operation")
                
            conn.commit()
            conn.close()
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"data": result}).encode("utf-8"))
            
        except Exception as e:
            print("DB Query Error:", str(e))
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def handle_realtime_messages(self):
        user_id = self.get_authenticated_user()
        if not user_id:
            self.send_response(401)
            self.end_headers()
            return
            
        parsed_url = urllib.parse.urlparse(self.path)
        queries = urllib.parse.parse_qs(parsed_url.query)
        since = queries.get("since", [datetime.now().isoformat()])[0]
        
        try:
            conn = get_db_connection()
            c = conn.cursor()
            
            # Fetch new order messages where sender is not the current user (e.g. admin responses)
            # or messages related to the user's orders
            c.execute('''
                SELECT om.* FROM order_messages om
                JOIN orders o ON om.order_id = o.id
                WHERE (o.user_id = ? OR ? = 'solomonolufelo@outlook.com')
                AND om.created_at > ?
                ORDER BY om.created_at ASC
            ''', (user_id, user_id, since))
            
            rows = c.fetchall()
            desc = c.description
            messages = []
            for r in rows:
                messages.append({desc[i][0]: r[i] for i in range(len(desc))})
                
            conn.close()
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"messages": messages}).encode("utf-8"))
            
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def handle_checkout(self):
        try:
            if not stripe:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Stripe package not installed on server."}).encode("utf-8"))
                return

            stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
            if not stripe.api_key:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "STRIPE_SECRET_KEY is not configured"}).encode("utf-8"))
                return

            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            params = json.loads(body.decode("utf-8"))

            amount = params.get("amount")
            service_type = params.get("serviceType")
            package_type = params.get("packageType")
            user_id = params.get("userId")
            order_id = params.get("orderId", "")
            order_data = params.get("orderData", {})

            if not amount or not service_type or not package_type or not user_id:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Missing required fields"}).encode("utf-8"))
                return

            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd',
                            'product_data': {
                                'name': f"{service_type} - {package_type}",
                                'description': f"Voice tag order: {order_data.get('voiceTagText', package_type)}",
                            },
                            'unit_amount': int(amount * 100),
                        },
                        'quantity': 1,
                    },
                ],
                mode='payment',
                success_url=f"{os.environ.get('URL', 'https://captainsolo.ca')}/order/success?session_id={{CHECKOUT_SESSION_ID}}",
                cancel_url=f"{os.environ.get('URL', 'https://captainsolo.ca')}/order/voice-tag?canceled=true",
                metadata={
                    'userId': user_id,
                    'serviceType': service_type,
                    'packageType': package_type,
                    'orderId': order_id,
                    'orderData': json.dumps(order_data),
                },
                customer_email=order_data.get('email') or None,
                allow_promotion_codes=True,
                payment_intent_data={
                    'statement_descriptor': 'CAPTAINSOLO',
                    'statement_descriptor_suffix': 'VOICE',
                },
                phone_number_collection={'enabled': True},
                invoice_creation={
                    'enabled': True,
                    'invoice_data': {
                        'description': f"{service_type} - {package_type} package",
                        'metadata': {
                            'service_type': service_type,
                            'package_type': package_type,
                        },
                    },
                },
            )

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"sessionId": session.id, "url": session.url}).encode("utf-8"))

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def handle_stripe_webhook(self):
        try:
            if not stripe:
                self.send_response(500)
                self.end_headers()
                return

            stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
            webhook_secret = os.environ.get("STRIPE_WEBHOOK_SECRET")

            sig = self.headers.get("stripe-signature")
            content_length = int(self.headers.get("Content-Length", 0))
            payload = self.rfile.read(content_length)

            try:
                event = stripe.Webhook.construct_event(payload, sig, webhook_secret)
            except Exception as e:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(json.dumps({"error": f"Webhook Error: {str(e)}"}).encode("utf-8"))
                return

            if event['type'] == 'checkout.session.completed':
                session = event['data']['object']
                metadata = session.get('metadata', {})
                u_id = metadata.get('userId')
                if u_id:
                    order_id = metadata.get('orderId')
                    service_type = metadata.get('serviceType')
                    package_type = metadata.get('packageType')
                    order_data = json.loads(metadata.get('orderData', '{}'))
                    session_id = session.get('id')
                    payment_intent = session.get('payment_intent')
                    amount_total = session.get('amount_total', 0) / 100.0

                    conn = get_db_connection()
                    c = conn.cursor()
                    
                    order_to_update = None
                    if order_id:
                        c.execute("SELECT id FROM orders WHERE id = ?", (order_id,))
                        row = c.fetchone()
                        if row:
                            order_to_update = row[0]
                            
                    if not order_to_update:
                        c.execute("SELECT id FROM orders WHERE stripe_checkout_session_id = ?", (session_id,))
                        row = c.fetchone()
                        if row:
                            order_to_update = row[0]
                            
                    if not order_to_update:
                        c.execute('''
                            SELECT id FROM orders 
                            WHERE user_id = ? AND status = 'pending' AND service_type = ? AND package_type = ?
                            ORDER BY created_at DESC LIMIT 1
                        ''', (u_id, service_type, package_type))
                        row = c.fetchone()
                        if row:
                            order_to_update = row[0]

                    updated_at = datetime.now().isoformat()
                    if order_to_update:
                        c.execute('''
                            UPDATE orders 
                            SET status = 'paid', stripe_checkout_session_id = ?, stripe_payment_intent_id = ?, updated_at = ?
                            WHERE id = ?
                        ''', (session_id, payment_intent, updated_at, order_to_update))
                    else:
                        new_oid = str(uuid.uuid4())
                        c.execute('''
                            INSERT INTO orders (id, user_id, service_type, package_type, price, status, stripe_checkout_session_id, stripe_payment_intent_id, requirements, created_at, updated_at)
                            VALUES (?, ?, ?, ?, ?, 'paid', ?, ?, ?, ?, ?)
                        ''', (new_oid, u_id, service_type, package_type, amount_total, session_id, payment_intent, json.dumps(order_data), updated_at, updated_at))
                    conn.commit()
                    conn.close()

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"received": True}).encode("utf-8"))

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def send_email_smtp(self, to_email, subject, html_content):
        smtp_host = os.environ.get("SMTP_HOST", "localhost")
        smtp_port = int(os.environ.get("SMTP_PORT", "587"))
        smtp_user = os.environ.get("SMTP_USER", "")
        smtp_pass = os.environ.get("SMTP_PASS", "")

        if not smtp_user or not smtp_pass:
            print(f"[MOCK EMAIL] To: {to_email}, Subject: {subject}")
            return True

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f"CaptainSolo <{smtp_user}>"
            msg["To"] = to_email

            part = MIMEText(html_content, "html")
            msg.attach(part)

            with smtplib.SMTP(smtp_host, smtp_port) as server:
                if smtp_port == 587:
                    server.starttls()
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, to_email, msg.as_string())
            print(f"[SMTP EMAIL SENT] To: {to_email}, Subject: {subject}")
            return True
        except Exception as e:
            print(f"[SMTP EMAIL ERROR] Failed to send email to {to_email}: {e}")
            return False

    def handle_message_notification(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            params = json.loads(body.decode("utf-8"))

            order_id = params.get("orderId")
            recipient_email = params.get("recipientEmail")
            recipient_name = params.get("recipientName", "Customer")
            sender_name = params.get("senderName", "Admin")
            message_preview = params.get("messagePreview", "")
            is_admin = params.get("isAdmin", False)
            order_url = params.get("orderUrl")

            if not recipient_email or not sender_name or not order_url:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Missing required fields"}).encode("utf-8"))
                return

            subject = f"New message from {sender_name} on your order" if is_admin else f"New message from {sender_name} on order #{order_id[:8] if order_id else ''}"

            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: #CFA355; color: white; padding: 20px; text-align: center; }}
                    .content {{ padding: 20px; background: #f9f9f9; }}
                    .button {{ display: inline-block; padding: 12px 24px; background: #CFA355; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }}
                    .message-preview {{ background: white; padding: 15px; border-left: 4px solid #CFA355; margin: 20px 0; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>CaptainSolo - New Message</h1>
                    </div>
                    <div class="content">
                        <h2>You have a new message!</h2>
                        <p>Hi {recipient_name},</p>
                        <p>{'An admin' if is_admin else 'A customer'} has sent you a new message regarding your order.</p>
                        
                        <div class="message-preview">
                            <strong>Message Preview:</strong>
                            <p>{message_preview[:100] + ('...' if len(message_preview) > 100 else '')}</p>
                        </div>
                        
                        <p>Click the button below to view the full conversation and respond:</p>
                        <a href="{order_url}" class="button" style="color: white;">View Order & Respond</a>
                        
                        <p style="margin-top: 30px; font-size: 12px; color: #666;">
                            This is an automated email from CaptainSolo. Please do not reply to this email.
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """

            self.send_email_smtp(recipient_email, subject, html_content)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "message": "Email notification queued"}).encode("utf-8"))

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def handle_revision_notification(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            params = json.loads(body.decode("utf-8"))

            order_id = params.get("orderId")
            revision_number = params.get("revisionNumber")
            request_description = params.get("requestDescription", "")
            status = params.get("status", "pending")
            recipient_email = params.get("recipientEmail", "work@captainsolo.ca")
            recipient_name = params.get("recipientName", "Admin")
            customer_name = params.get("customerName", "Customer")
            is_update = params.get("isUpdate", False)
            order_url = params.get("orderUrl")

            if not order_id or not order_url:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Missing required fields"}).encode("utf-8"))
                return

            subject = f"Revision #{revision_number} status updated - {status}" if is_update else f"New revision request #{revision_number} from {customer_name}"

            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: #CFA355; color: white; padding: 20px; text-align: center; }}
                    .content {{ padding: 20px; background: #f9f9f9; }}
                    .button {{ display: inline-block; padding: 12px 24px; background: #CFA355; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }}
                    .revision-details {{ background: white; padding: 15px; border-left: 4px solid #CFA355; margin: 20px 0; }}
                    .status-badge {{ display: inline-block; padding: 5px 10px; border-radius: 3px; font-weight: bold; }}
                    .status-pending {{ background: #fbbf24; color: #78350f; }}
                    .status-in-progress {{ background: #3b82f6; color: white; }}
                    .status-completed {{ background: #10b981; color: white; }}
                    .status-rejected {{ background: #ef4444; color: white; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>CaptainSolo - Revision { 'Update' if is_update else 'Request' }</h1>
                    </div>
                    <div class="content">
                        <h2>{ 'Revision Status Updated' if is_update else 'New Revision Request' }</h2>
                        <p>Hi {recipient_name},</p>
                        
                        { f'''
                        <p>The status of revision #{revision_number} for your order has been updated.</p>
                        <div class="revision-details">
                            <p><strong>Revision #{revision_number}</strong></p>
                            <p><strong>New Status:</strong> <span class="status-badge status-{status}">{status.upper()}</span></p>
                        </div>
                        ''' if is_update else f'''
                        <p><strong>{customer_name}</strong> has submitted a new revision request for order #{order_id[:8] if order_id else ''}.</p>
                        <div class="revision-details">
                            <p><strong>Revision #{revision_number}</strong></p>
                            <p><strong>Customer:</strong> {customer_name}</p>
                            <p><strong>Request:</strong></p>
                            <p>{request_description}</p>
                        </div>
                        ''' }
                        
                        <p>Click the button below to view the order and see the details:</p>
                        <a href="{order_url}" class="button" style="color: white;">View Order</a>
                        
                        <p style="margin-top: 30px; font-size: 12px; color: #666;">
                            This is an automated email from CaptainSolo. Please do not reply to this email.
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """

            self.send_email_smtp(recipient_email, subject, html_content)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "message": "Email notification queued"}).encode("utf-8"))

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def handle_contact_submit(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            params = json.loads(body.decode("utf-8"))

            name = params.get("name", "").strip()
            email = params.get("email", "").strip()
            phone = params.get("phone", "").strip()
            service = params.get("service", "").strip()
            budget = params.get("budget", "").strip()
            message = params.get("message", "").strip()

            if not name or not email or not message:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Name, email, and message are required"}).encode("utf-8"))
                return

            submission_id = str(uuid.uuid4())
            created_at = datetime.now().isoformat()

            # Store in SQLite
            conn = get_db_connection()
            c = conn.cursor()
            c.execute('''
                INSERT INTO contact_submissions (id, name, email, phone, service, budget, message, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (submission_id, name, email, phone, service, budget, message, created_at))
            conn.commit()
            conn.close()

            # Send Email Alert to Admin
            admin_email = os.environ.get("SMTP_USER", "work@captainsolo.ca")
            subject = f"New Contact Form Submission from {name}"
            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: #CFA355; color: white; padding: 15px; text-align: center; }}
                    .content {{ padding: 20px; background: #f9f9f9; }}
                    .details {{ background: white; padding: 15px; border-left: 4px solid #CFA355; margin: 15px 0; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>New Inquiry Received</h1>
                    </div>
                    <div class="content">
                        <p>You have received a new contact form submission on <strong>captainsolo.ca</strong>.</p>
                        
                        <div class="details">
                            <p><strong>Name:</strong> {name}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Phone:</strong> {phone or 'Not provided'}</p>
                            <p><strong>Service:</strong> {service or 'Not selected'}</p>
                            <p><strong>Budget:</strong> {budget or 'Not selected'}</p>
                            <p><strong>Message:</strong></p>
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """
            self.send_email_smtp(admin_email, subject, html_content)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "message": "Inquiry submitted successfully"}).encode("utf-8"))

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def handle_upload(self):
        """Accept a base64 data-URL image/video, save it to the public assets dir,
        and return its web path. Requires an authenticated (admin) session.

        On cPanel set UPLOAD_DIR -> ~/public_html/assets/projects/uploads and
        UPLOAD_URL_PREFIX -> /assets/projects/uploads (defaults target local dev)."""
        try:
            user_id = self.get_authenticated_user()
            if not user_id:
                self.send_response(401)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Unauthorized"}).encode("utf-8"))
                return

            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            params = json.loads(body.decode("utf-8"))

            filename = params.get("filename", "upload")
            data_url = params.get("dataUrl", "")

            if not data_url or "," not in data_url:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Missing or invalid dataUrl"}).encode("utf-8"))
                return

            header, b64 = data_url.split(",", 1)
            ext = os.path.splitext(filename)[1].lower().lstrip(".")
            if not ext and "image/" in header:
                ext = header.split("image/")[1].split(";")[0]
            allowed = {"png", "jpg", "jpeg", "webp", "gif", "svg", "mp4"}
            if ext not in allowed:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": f"Unsupported file type: .{ext}"}).encode("utf-8"))
                return

            default_dir = os.path.normpath(os.path.join(
                os.path.dirname(os.path.abspath(__file__)),
                "..", "..", "public", "assets", "projects", "uploads"))
            upload_dir = os.environ.get("UPLOAD_DIR", default_dir)
            url_prefix = os.environ.get("UPLOAD_URL_PREFIX", "/assets/projects/uploads")
            os.makedirs(upload_dir, exist_ok=True)

            safe_name = f"{uuid.uuid4().hex}.{ext}"
            with open(os.path.join(upload_dir, safe_name), "wb") as f:
                f.write(base64.b64decode(b64))

            web_url = f"{url_prefix.rstrip('/')}/{safe_name}"
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"url": web_url}).encode("utf-8"))

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))


    def handle_create_client_project(self):
        """Admin-only: create (or reuse) a client account by email and open a
        project (order row) for them. Returns the new order id and, if the
        account was just created, a temp password for the admin to share."""
        try:
            if not self.is_admin_request():
                self.send_response(403)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Admin only"}).encode("utf-8"))
                return

            content_length = int(self.headers.get("Content-Length", 0))
            params = json.loads(self.rfile.read(content_length).decode("utf-8"))

            client_email = params.get("clientEmail", "").strip().lower()
            client_name = params.get("clientName", "").strip()
            title = params.get("title", "").strip()
            description = params.get("description", "").strip()
            stage = params.get("stage", "intake").strip() or "intake"

            if not client_email or not title:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "clientEmail and title are required"}).encode("utf-8"))
                return

            now = datetime.now().isoformat()
            temp_password = None
            conn = get_db_connection()
            c = conn.cursor()
            c.execute("SELECT id FROM users WHERE email = ?", (client_email,))
            row = c.fetchone()
            if row:
                client_id = row[0]
            else:
                client_id = str(uuid.uuid4())
                temp_password = uuid.uuid4().hex[:10]
                pw_hash = hashlib.sha256(temp_password.encode("utf-8")).hexdigest()
                full_name = client_name or client_email.split("@")[0].capitalize()
                c.execute("INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
                          (client_id, client_email, pw_hash, now))
                c.execute("INSERT INTO profiles (id, email, full_name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
                          (client_id, client_email, full_name, now, now))

            order_id = str(uuid.uuid4())
            requirements = json.dumps({"description": description, "isClientProject": True})
            c.execute('''
                INSERT INTO orders (id, user_id, service_type, package_type, price, status, requirements, created_at, updated_at)
                VALUES (?, ?, 'project', ?, 0, ?, ?, ?, ?)
            ''', (order_id, client_id, title, stage, requirements, now, now))
            conn.commit()
            conn.close()

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "user_id": client_id,
                "order_id": order_id,
                "tempPassword": temp_password,
            }).encode("utf-8"))

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def handle_project_notify(self):
        """Admin-only: email a client about a project stage change or a new
        deliverable. type = 'status' | 'deliverable'."""
        try:
            if not self.is_admin_request():
                self.send_response(403)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Admin only"}).encode("utf-8"))
                return

            content_length = int(self.headers.get("Content-Length", 0))
            params = json.loads(self.rfile.read(content_length).decode("utf-8"))

            recipient_email = params.get("recipientEmail", "").strip()
            recipient_name = params.get("recipientName", "there")
            notify_type = params.get("type", "status")
            project_title = params.get("projectTitle", "your project")
            stage = params.get("stage", "")
            file_name = params.get("fileName", "")
            order_url = params.get("orderUrl", "https://captainsolo.ca/dashboard")

            if not recipient_email:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "recipientEmail required"}).encode("utf-8"))
                return

            if notify_type == "deliverable":
                subject = f"New deliverable ready — {project_title}"
                inner = f"""
                    <h2>Your files are ready</h2>
                    <p>Hi {recipient_name},</p>
                    <p>A new deliverable has been added to <strong>{project_title}</strong>:</p>
                    <div class="message-preview"><strong>{file_name or 'New file'}</strong></div>
                    <p>Open your project to view and download it.</p>
                """
            else:
                subject = f"Project update — {project_title}"
                inner = f"""
                    <h2>Project status updated</h2>
                    <p>Hi {recipient_name},</p>
                    <p>The status of <strong>{project_title}</strong> is now:</p>
                    <div class="message-preview"><strong>{stage.replace('-', ' ').title()}</strong></div>
                """

            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: #CFA355; color: white; padding: 20px; text-align: center; }}
                    .content {{ padding: 20px; background: #f9f9f9; }}
                    .button {{ display: inline-block; padding: 12px 24px; background: #CFA355; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }}
                    .message-preview {{ background: white; padding: 15px; border-left: 4px solid #CFA355; margin: 20px 0; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header"><h1>captainsolo.ca — Project Update</h1></div>
                    <div class="content">
                        {inner}
                        <a href="{order_url}" class="button" style="color: white;">Open project</a>
                        <p style="margin-top: 30px; font-size: 12px; color: #666;">Automated message from captainsolo.ca.</p>
                    </div>
                </div>
            </body>
            </html>
            """

            self.send_email_smtp(recipient_email, subject, html_content)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True}).encode("utf-8"))

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))


def run(port=8081):
    server_address = ("", port)
    httpd = http.server.HTTPServer(server_address, RequestHandler)
    print(f"Portfolio SQLite Backend running on http://localhost:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()

if __name__ == "__main__":
    port = 8081
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    run(port)
