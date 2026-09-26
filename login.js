// /api/login.js
// Serverless function for Vercel. Verifies username/password against
// environment variables and returns a simple signed token.
//
// Set these in your hosting provider's dashboard (Environment Variables):
//   PORTAL_USERS = a JSON string like:
//     {"alice":"somepassword","bob":"anotherpassword"}
//   PORTAL_SECRET = any random long string, used to sign tokens

const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    body = JSON.parse(body);
  }
  const { username, password } = body || {};

  const usersJson = process.env.PORTAL_USERS || "{}";
  const secret = process.env.PORTAL_SECRET || "change-me";
  const users = JSON.parse(usersJson);

  if (!username || !password || users[username] !== password) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const payload = Buffer.from(JSON.stringify({ u: username, t: Date.now() })).toString("base64");
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  const token = payload + "." + sig;

  res.status(200).json({ token });
};
