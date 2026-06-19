import http.server
import json
import os
import sqlite3
import hashlib
import uuid
import sys
import urllib.parse
from datetime import datetime

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
            
            if table_name == "blog_posts" and operation == "select" and conditions.get("published") == 1:
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
