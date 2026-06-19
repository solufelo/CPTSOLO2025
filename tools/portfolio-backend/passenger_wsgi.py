import os
import sys
import json
import sqlite3
import hashlib
import uuid
import urllib.parse
from datetime import datetime

# Setup paths
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from server import DB_FILE, SESSIONS, get_db_connection

def application(environ, start_response):
    path = environ.get('PATH_INFO', '')
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
            
        else:
            start_response('404 Not Found', headers)
            return [json.dumps({"error": "Endpoint Not Found"}).encode('utf-8')]
            
    except Exception as e:
        start_response('500 Internal Server Error', headers)
        return [json.dumps({"error": str(e)}).encode('utf-8')]
