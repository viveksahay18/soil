// Hardcoded credentials
const validUsername = "admin";
const validPassword = "12345";

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (username === validUsername && password === validPassword) {
    // Successful login
    alert("Login successful!");
    errorMessage.textContent = "";
    window.location.href = "admindashboard.html";
  } else {
    // Login failed
    errorMessage.textContent = "Invalid username or password";
  }
});
