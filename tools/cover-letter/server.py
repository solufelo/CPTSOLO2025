import http.server
import os
import sys

class StaticHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Inject CORS headers for local asset loading safety
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

def run(port=8090):
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server_address = ("", port)
    httpd = http.server.HTTPServer(server_address, StaticHandler)
    print(f"Cover Letter Server running at http://localhost:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down Cover Letter server.")
        httpd.server_close()

if __name__ == "__main__":
    port = 8090
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    run(port)
