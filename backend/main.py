from flask import Flask

app = Flask(__name__)


# Should redirect to /login if not logged in,
# and to /stats if logged in
@app.route("/")
def api_index():
    return "index"


@app.route("/login")
def api_login():
    return "login"


# If not logged in, redirect to login.
# Redirect back after logging in.
@app.route("/scan/<username>")
def api_scan(username):
    return f"Scanned {username}"


# Same as above. Double redirect if not logged in.
@app.route("/stats/<username>")
def api_stats(username):
    pass


if __name__ == "__main__":
    app.run(debug=True)
