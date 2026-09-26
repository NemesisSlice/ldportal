// /api/host-info.js
// Returns the host's connection address, only if the token is valid.
//
// Set this in your hosting provider's dashboard (Environment Variables):
//   HOST_ADDRESS = your public IP or dynamic DNS name, e.g. "203.0.113.5" or "mygamehost.duckdns.org"
//   PORTAL_SECRET = same secret used in login.js

const crypto = require("crypto");

module.exports = async (req, res) => {
  const auth = req.headers["authorization"] || "";
  const token = auth.replace("Bearer ", "");

  if (!token || !token.includes(".")) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const [payload, sig] = token.split(".");
  const secret = process.env.PORTAL_SECRET || "change-me";
  const expectedSig = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  if (sig !== expectedSig) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const hostAddress = process.env.HOST_ADDRESS || "not-configured.example.com";
  res.status(200).json({ hostAddress });
};
