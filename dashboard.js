const token = sessionStorage.getItem("token");
if (!token) {
  window.location.href = "index.html";
}

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

document.getElementById("logoutBtn").addEventListener("click", function() {
  sessionStorage.removeItem("token");
  window.location.href = "index.html";
});

loadHostInfo();
