const token = sessionStorage.getItem("token");
if (!token) {
  window.location.href = "index.html";
}

// --- Load host connection address ---
async function loadHostInfo() {
  try {
    const res = await fetch("/api/host-info", {
      headers: { "Authorization": "Bearer " + token }
    });
    if (!res.ok) {
      window.location.href = "index.html";
      return;
    }
    const data = await res.json();
    document.getElementById("hostAddress").textContent = data.hostAddress;
  } catch (err) {
    document.getElementById("hostAddress").textContent = "Could not load host address. Ask the host owner directly.";
  }
}

document.getElementById("logoutBtn").addEventListener("click", function () {
  sessionStorage.removeItem("token");
  window.location.href = "index.html";
});

loadHostInfo();

// --- Invite a friend box ---
let adminPassword = "";

document.getElementById("unlockBtn").addEventListener("click", function () {
  adminPassword = document.getElementById("adminPassword").value;
  if (!adminPassword) return;
  document.getElementById("inviteBox").style.display = "block";
  document.getElementById("gateMsg").textContent = "";
});

document.getElementById("sendInviteBtn").addEventListener("click", async function () {
  const
