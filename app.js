document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = "";

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      errorMsg.textContent = data.error || "Login failed. Check your username and password.";
      return;
    }

    const data = await res.json();
    sessionStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } catch (err) {
    errorMsg.textContent = "Something went wrong. Try again.";
  }
});
