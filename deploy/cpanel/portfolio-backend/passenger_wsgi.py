import os
import sys
import json
import sqlite3
import hashlib
import uuid
import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# Setup paths
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from server import DB_FILE, SESSIONS, get_db_connection

try:
    import stripe
except ImportError:
    stripe = None

def application(environ, start_response):
    path = environ.get('PATH_INFO', '') or '/'
    # cPanel mounts app at /api — Passenger may pass /auth/session without /api prefix
    if not path.startswith('/api'):
        path = '/api' + (path if path.startswith('/') else '/' + path)
    method = environ.get('REQUEST_METHOD', 'GET')
    
    # CORS Headers
    headers = [
        ('Content-Type', 'application/json'),
        ('Access-Control-Allow-Origin', '*'),
        ('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'),
        ('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    ]
    
    if method == 'OPTIONS':
        start_response('200 OK', headers)
        return [b'']
        
    # Get request body
    body = b''
    try:
        content_length = int(environ.get('CONTENT_LENGTH', 0) or 0)
        if content_length > 0:
            body = environ['wsgi.input'].read(content_length)
    except Exception:
        pass
        
    params = {}
    if body:
        try:
            params = json.loads(body.decode('utf-8'))
        except Exception:
            pass
            
    # Resolve user session
    auth_header = environ.get('HTTP_AUTHORIZATION', '')
    user_id = None
    if auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
        if token in SESSIONS:
            user_id = SESSIONS[token]
            
    try:
        if path == "/api/auth/signup" and method == "POST":
            email = params.get("email", "").strip().lower()
            password = params.get("password", "")
            full_name = params.get("full_name", "")
            if not full_name and "options" in params:
                full_name = params.get("options", {}).get("data", {}).get("full_name", "")
            full_name = full_name.strip() if full_name else email.split("@")[0].capitalize()
            
            if not email or not password:
                start_response('400 Bad Request', headers)
                return [json.dumps({"error": "Email and password required"}).encode('utf-8')]
                
            password_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
            new_uid = str(uuid.uuid4())
            created_at = datetime.now().isoformat()
            
            conn = get_db_connection()
            c = conn.cursor()
            try:
                c.execute("INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
                          (new_uid, email, password_hash, created_at))
                c.execute("INSERT INTO profiles (id, email, full_name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
                          (new_uid, email, full_name, created_at, created_at))
                conn.commit()
            except sqlite3.IntegrityError:
                conn.close()
                start_response('400 Bad Request', headers)
                return [json.dumps({"error": "User with this email already exists"}).encode('utf-8')]
            conn.close()
            
            start_response('200 OK', headers)
            return [json.dumps({"message": "Registration successful!", "user_id": new_uid}).encode('utf-8')]
            
        elif path == "/api/auth/login" and method == "POST":
            email = params.get("email", "").strip().lower()
            password = params.get("password", "")
            password_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
            
            conn = get_db_connection()
            c = conn.cursor()
            c.execute("SELECT u.id, p.full_name FROM users u LEFT JOIN profiles p ON u.id = p.id WHERE u.email = ? AND u.password_hash = ?", (email, password_hash))
            row = c.fetchone()
            conn.close()
            
            if not row:
                start_response('401 Unauthorized', headers)
                return [json.dumps({"error": "Invalid email or password"}).encode('utf-8')]
                
            login_uid = row[0]
            full_name = row[1] or ""
            new_token = str(uuid.uuid4())
            SESSIONS[new_token] = login_uid
            
            conn = get_db_connection()
            c = conn.cursor()
            c.execute("UPDATE profiles SET is_online = 1, last_seen = ? WHERE id = ?", (datetime.now().isoformat(), login_uid))
            conn.commit()
            conn.close()
            
            start_response('200 OK', headers)
            return [json.dumps({
                "token": new_token, 
                "user_id": login_uid, 
                "email": email, 
                "full_name": full_name,
                "message": "Login successful!"
            }).encode('utf-8')]
            
        elif path == "/api/auth/logout" and method == "POST":
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]
                if token in SESSIONS:
                    conn = get_db_connection()
                    c = conn.cursor()
                    c.execute("UPDATE profiles SET is_online = 0 WHERE id = ?", (SESSIONS[token],))
                    conn.commit()
                    conn.close()
                    del SESSIONS[token]
            start_response('200 OK', headers)
            return [json.dumps({"message": "Logged out successfully"}).encode('utf-8')]
            
        elif path == "/api/auth/session" and method == "GET":
            if not user_id:
                start_response('401 Unauthorized', headers)
                return [json.dumps({"authenticated": False}).encode('utf-8')]
                
            conn = get_db_connection()
            c = conn.cursor()
            c.execute("SELECT u.email, p.full_name FROM users u LEFT JOIN profiles p ON u.id = p.id WHERE u.id = ?", (user_id,))
            row = c.fetchone()
            conn.close()
            
            email = row[0] if row else ""
            full_name = row[1] if row else ""
            
            start_response('200 OK', headers)
            return [json.dumps({"authenticated": True, "user_id": user_id, "email": email, "full_name": full_name}).encode('utf-8')]
            
        elif path.startswith("/api/db/") and method == "POST":
            table_name = path.split("/api/db/")[1]
            
            operation = params.get("operation", "select")
            conditions = params.get("conditions", {})
            order = params.get("order")
            is_single = params.get("isSingle", False)
            data = params.get("data")
            
            is_public_blog_request = (table_name == "blog_posts" and operation == "select" and conditions.get("published") == 1)
            
            if not user_id and not is_public_blog_request:
                start_response('401 Unauthorized', headers)
                return [json.dumps({"error": "Unauthorized"}).encode('utf-8')]
                
            conn = get_db_connection()
            c = conn.cursor()
            
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
            
            start_response('200 OK', headers)
            return [json.dumps({"data": result}).encode('utf-8')]
            
        elif path == "/api/messages/realtime" and method == "GET":
            if not user_id:
                start_response('401 Unauthorized', headers)
                return [b'']
                
            queries = urllib.parse.parse_qs(environ.get('QUERY_STRING', ''))
            since = queries.get("since", [datetime.now().isoformat()])[0]
            
            conn = get_db_connection()
            c = conn.cursor()
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
            
            start_response('200 OK', headers)
            return [json.dumps({"messages": messages}).encode('utf-8')]
             
        elif path == "/api/order/checkout" and method == "POST":
            if not stripe:
                start_response('500 Internal Server Error', headers)
                return [json.dumps({"error": "Stripe package not installed on server."}).encode('utf-8')]

            stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
            if not stripe.api_key:
                start_response('500 Internal Server Error', headers)
                return [json.dumps({"error": "STRIPE_SECRET_KEY is not configured"}).encode('utf-8')]

            amount = params.get("amount")
            service_type = params.get("serviceType")
            package_type = params.get("packageType")
            user_uid = params.get("userId")
            order_id = params.get("orderId", "")
            order_data = params.get("orderData", {})

            if not amount or not service_type or not package_type or not user_uid:
                start_response('400 Bad Request', headers)
                return [json.dumps({"error": "Missing required fields"}).encode('utf-8')]

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
                    'userId': user_uid,
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

            start_response('200 OK', headers)
            return [json.dumps({"sessionId": session.id, "url": session.url}).encode('utf-8')]

        elif path == "/api/stripe/webhook" and method == "POST":
            if not stripe:
                start_response('500 Internal Server Error', headers)
                return [json.dumps({"error": "Stripe package not installed on server."}).encode('utf-8')]

            stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
            webhook_secret = os.environ.get("STRIPE_WEBHOOK_SECRET")

            sig = environ.get('HTTP_STRIPE_SIGNATURE', '')
            try:
                event = stripe.Webhook.construct_event(body, sig, webhook_secret)
            except Exception as e:
                start_response('400 Bad Request', headers)
                return [json.dumps({"error": f"Webhook Error: {str(e)}"}).encode('utf-8')]

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

            start_response('200 OK', headers)
            return [json.dumps({"received": True}).encode('utf-8')]

        elif path == "/api/order/message-notification" and method == "POST":
            order_id = params.get("orderId")
            recipient_email = params.get("recipientEmail")
            recipient_name = params.get("recipientName", "Customer")
            sender_name = params.get("senderName", "Admin")
            message_preview = params.get("messagePreview", "")
            is_admin = params.get("isAdmin", False)
            order_url = params.get("orderUrl")

            if not recipient_email or not sender_name or not order_url:
                start_response('400 Bad Request', headers)
                return [json.dumps({"error": "Missing required fields"}).encode('utf-8')]

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

            smtp_host = os.environ.get("SMTP_HOST", "localhost")
            smtp_port = int(os.environ.get("SMTP_PORT", "587"))
            smtp_user = os.environ.get("SMTP_USER", "")
            smtp_pass = os.environ.get("SMTP_PASS", "")

            if smtp_user and smtp_pass:
                try:
                    msg = MIMEMultipart("alternative")
                    msg["Subject"] = subject
                    msg["From"] = f"CaptainSolo <{smtp_user}>"
                    msg["To"] = recipient_email
                    msg.attach(MIMEText(html_content, "html"))
                    with smtplib.SMTP(smtp_host, smtp_port) as server:
                        if smtp_port == 587:
                            server.starttls()
                        server.login(smtp_user, smtp_pass)
                        server.sendmail(smtp_user, recipient_email, msg.as_string())
                except Exception as e:
                    print(f"SMTP Error: {e}")
            else:
                print(f"[MOCK EMAIL] To: {recipient_email}, Subject: {subject}")

            start_response('200 OK', headers)
            return [json.dumps({"success": True, "message": "Email notification queued"}).encode('utf-8')]

        elif path == "/api/order/revision-notification" and method == "POST":
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
                start_response('400 Bad Request', headers)
                return [json.dumps({"error": "Missing required fields"}).encode('utf-8')]

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

            smtp_host = os.environ.get("SMTP_HOST", "localhost")
            smtp_port = int(os.environ.get("SMTP_PORT", "587"))
            smtp_user = os.environ.get("SMTP_USER", "")
            smtp_pass = os.environ.get("SMTP_PASS", "")

            if smtp_user and smtp_pass:
                try:
                    msg = MIMEMultipart("alternative")
                    msg["Subject"] = subject
                    msg["From"] = f"CaptainSolo <{smtp_user}>"
                    msg["To"] = recipient_email
                    msg.attach(MIMEText(html_content, "html"))
                    with smtplib.SMTP(smtp_host, smtp_port) as server:
                        if smtp_port == 587:
                            server.starttls()
                        server.login(smtp_user, smtp_pass)
                        server.sendmail(smtp_user, recipient_email, msg.as_string())
                except Exception as e:
                    print(f"SMTP Error: {e}")
            else:
                print(f"[MOCK EMAIL] To: {recipient_email}, Subject: {subject}")

            start_response('200 OK', headers)
            return [json.dumps({"success": True, "message": "Email notification queued"}).encode('utf-8')]

        elif path == "/api/contact/submit" and method == "POST":
            name = params.get("name", "").strip()
            email = params.get("email", "").strip()
            phone = params.get("phone", "").strip()
            service = params.get("service", "").strip()
            budget = params.get("budget", "").strip()
            message = params.get("message", "").strip()

            if not name or not email or not message:
                start_response('400 Bad Request', headers)
                return [json.dumps({"error": "Name, email, and message are required"}).encode('utf-8')]

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

            # Email notification
            smtp_host = os.environ.get("SMTP_HOST", "localhost")
            smtp_port = int(os.environ.get("SMTP_PORT", "587"))
            smtp_user = os.environ.get("SMTP_USER", "")
            smtp_pass = os.environ.get("SMTP_PASS", "")

            if smtp_user and smtp_pass:
                try:
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
                    msg = MIMEMultipart("alternative")
                    msg["Subject"] = subject
                    msg["From"] = f"CaptainSolo <{smtp_user}>"
                    msg["To"] = admin_email
                    msg.attach(MIMEText(html_content, "html"))
                    with smtplib.SMTP(smtp_host, smtp_port) as server:
                        if smtp_port == 587:
                            server.starttls()
                        server.login(smtp_user, smtp_pass)
                        server.sendmail(smtp_user, admin_email, msg.as_string())
                except Exception as e:
                    print(f"SMTP Error: {e}")

            start_response('200 OK', headers)
            return [json.dumps({"success": True, "message": "Inquiry submitted successfully"}).encode('utf-8')]

        else:
             start_response('404 Not Found', headers)
             return [json.dumps({"error": "Endpoint Not Found"}).encode('utf-8')]
            
    except Exception as e:
        start_response('500 Internal Server Error', headers)
        return [json.dumps({"error": str(e)}).encode('utf-8')]
