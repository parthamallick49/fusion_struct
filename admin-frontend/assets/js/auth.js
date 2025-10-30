// assets/js/auth.js

// Check if user is logged in or not
function checkAuth() {
  const token = getToken();
  const currentPage = window.location.pathname.split("/").pop();

  if (!token && currentPage !== "login.html") {
    window.location.href = "login.html";
    return false;
  }

  if (token && currentPage === "login.html") {
    window.location.href = "index.html";
    return false;
  }

  return true;
}

// Logout
function logout() {
  clearToken();
  window.location.href = "login.html";
}

// Handle login
async function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    Swal.fire("Error", "Please enter username and password", "error");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      setToken(data.token);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
        window.location.href = "index.html";
      });
    } else {
      Swal.fire("Login Failed", data.message || "Invalid credentials", "error");
    }
  } catch (err) {
    Swal.fire("Error", "Server not reachable", "error");
  }
}
