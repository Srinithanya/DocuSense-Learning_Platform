"""
DocuSense backend: FastAPI + SQLite.
Serves the frontend and provides login + per-user storage.
Run:  python backend/main.py   ->  http://localhost:8000
"""
import base64, hashlib, hmac, json, os, re, secrets, sqlite3, time
from pathlib import Path
from typing import Optional

import uvicorn
from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

BASE = Path(__file__).resolve().parent
ROOT = BASE.parent
DB_PATH = BASE / "docusense.db"
KEY_FILE = BASE / "secret.key"
TOKEN_DAYS = 30


def load_secret() -> bytes:
    env = os.environ.get("DOCUSENSE_SECRET")
    if env:
        return env.encode()
    if not KEY_FILE.exists():
        KEY_FILE.write_text(secrets.token_hex(32))
    return KEY_FILE.read_text().strip().encode()


SECRET = load_secret()


def db():
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys=ON")
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    with db() as c:
        c.executescript("""
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            salt TEXT NOT NULL,
            pw_hash TEXT NOT NULL,
            created TEXT DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS documents(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            doc_id TEXT NOT NULL,
            title TEXT,
            data TEXT NOT NULL,
            updated TEXT DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, doc_id));
        CREATE TABLE IF NOT EXISTS bookmarks(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            bm_id TEXT NOT NULL,
            data TEXT NOT NULL,
            UNIQUE(user_id, bm_id));
        CREATE TABLE IF NOT EXISTS user_state(
            user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
            history TEXT,
            profile TEXT);
        """)


# ---------- security helpers ----------
def hash_pw(pw: str, salt: Optional[str] = None):
    salt = salt or secrets.token_hex(16)
    h = hashlib.pbkdf2_hmac("sha256", pw.encode(), bytes.fromhex(salt), 200_000).hex()
    return salt, h


def make_token(uid: int) -> str:
    payload = json.dumps({"uid": uid, "exp": int(time.time()) + TOKEN_DAYS * 86400})
    b = base64.urlsafe_b64encode(payload.encode()).decode()
    sig = hmac.new(SECRET, b.encode(), hashlib.sha256).hexdigest()
    return f"{b}.{sig}"


def user_from_auth(authorization: Optional[str]):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "Not logged in")
    try:
        b, sig = authorization[7:].split(".")
        good = hmac.new(SECRET, b.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(sig, good):
            raise ValueError
        data = json.loads(base64.urlsafe_b64decode(b.encode()))
        if data["exp"] < time.time():
            raise ValueError
    except Exception:
        raise HTTPException(401, "Session expired, please log in again")
    with db() as c:
        u = c.execute("SELECT id,name,email FROM users WHERE id=?", (data["uid"],)).fetchone()
    if not u:
        raise HTTPException(401, "Account not found")
    return u


app = FastAPI(title="DocuSense API")
init_db()


@app.get("/api/health")
def health():
    return {"ok": True}


@app.post("/api/signup")
async def signup(request: Request):
    d = await request.json()
    name = str(d.get("name", "")).strip()[:60]
    email = str(d.get("email", "")).strip().lower()
    pw = str(d.get("password", ""))
    if not name or not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        raise HTTPException(400, "Enter a valid name and email")
    if len(pw) < 6:
        raise HTTPException(400, "Password must be at least 6 characters")
    salt, h = hash_pw(pw)
    try:
        with db() as c:
            cur = c.execute("INSERT INTO users(name,email,salt,pw_hash) VALUES(?,?,?,?)", (name, email, salt, h))
            uid = cur.lastrowid
    except sqlite3.IntegrityError:
        raise HTTPException(409, "An account with this email already exists")
    return {"token": make_token(uid), "user": {"name": name, "email": email}}


@app.post("/api/login")
async def login(request: Request):
    d = await request.json()
    email = str(d.get("email", "")).strip().lower()
    with db() as c:
        u = c.execute("SELECT * FROM users WHERE email=?", (email,)).fetchone()
    if not u:
        raise HTTPException(401, "Wrong email or password")
    _, h = hash_pw(str(d.get("password", "")), u["salt"])
    if not hmac.compare_digest(h, u["pw_hash"]):
        raise HTTPException(401, "Wrong email or password")
    return {"token": make_token(u["id"]), "user": {"name": u["name"], "email": u["email"]}}


@app.get("/api/me")
def me(authorization: Optional[str] = Header(None)):
    u = user_from_auth(authorization)
    return {"name": u["name"], "email": u["email"]}


@app.get("/api/state")
def get_state(authorization: Optional[str] = Header(None)):
    u = user_from_auth(authorization)
    with db() as c:
        docs = [json.loads(r["data"]) for r in c.execute(
            "SELECT data FROM documents WHERE user_id=? ORDER BY updated DESC, id DESC", (u["id"],))]
        st = c.execute("SELECT history, profile FROM user_state WHERE user_id=?", (u["id"],)).fetchone()
    return {
        "documents": docs,
        "history": json.loads(st["history"]) if st and st["history"] else None,
        "user": json.loads(st["profile"]) if st and st["profile"] else None,
    }


@app.put("/api/state")
async def put_state(request: Request, authorization: Optional[str] = Header(None)):
    u = user_from_auth(authorization)
    d = await request.json()
    docs = [x for x in (d.get("documents") or []) if isinstance(x, dict) and x.get("id")]
    with db() as c:
        keep = [x["id"] for x in docs]
        if keep:
            c.execute(f"DELETE FROM documents WHERE user_id=? AND doc_id NOT IN ({','.join('?' * len(keep))})",
                      (u["id"], *keep))
        else:
            c.execute("DELETE FROM documents WHERE user_id=?", (u["id"],))
        for x in docs:
            c.execute("""INSERT INTO documents(user_id,doc_id,title,data) VALUES(?,?,?,?)
                         ON CONFLICT(user_id,doc_id) DO UPDATE SET title=excluded.title,
                         data=excluded.data, updated=CURRENT_TIMESTAMP""",
                      (u["id"], x["id"], str(x.get("title", ""))[:200], json.dumps(x)))
        c.execute("""INSERT INTO user_state(user_id,history,profile) VALUES(?,?,?)
                     ON CONFLICT(user_id) DO UPDATE SET history=excluded.history, profile=excluded.profile""",
                  (u["id"], json.dumps(d.get("history")), json.dumps(d.get("user"))))
    return {"ok": True}


@app.get("/api/bookmarks")
def get_bookmarks(authorization: Optional[str] = Header(None)):
    u = user_from_auth(authorization)
    with db() as c:
        rows = c.execute("SELECT data FROM bookmarks WHERE user_id=? ORDER BY id DESC", (u["id"],)).fetchall()
    return {"items": [json.loads(r["data"]) for r in rows]}


@app.put("/api/bookmarks")
async def put_bookmarks(request: Request, authorization: Optional[str] = Header(None)):
    u = user_from_auth(authorization)
    items = [x for x in ((await request.json()).get("items") or []) if isinstance(x, dict) and x.get("id")]
    with db() as c:
        c.execute("DELETE FROM bookmarks WHERE user_id=?", (u["id"],))
        # stored oldest-first so that "newest first" ordering (id DESC) matches the UI
        for x in reversed(items):
            c.execute("INSERT INTO bookmarks(user_id,bm_id,data) VALUES(?,?,?)", (u["id"], x["id"], json.dumps(x)))
    return {"ok": True}


# ---------- serve the frontend (only js/css + index.html, never the db) ----------
app.mount("/js", StaticFiles(directory=ROOT / "js"), name="js")
app.mount("/css", StaticFiles(directory=ROOT / "css"), name="css")


@app.get("/")
def index():
    return FileResponse(ROOT / "index.html")


if __name__ == "__main__":
    print("DocuSense running at http://localhost:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000)
