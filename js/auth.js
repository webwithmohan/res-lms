(function () {
  const currentUser = JSON.parse(localStorage.getItem("currentuser") || "null");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const role = currentUser?.role || "user";

  window.currentSessionUser = currentUser;
  window.isAdmin = isAuthenticated && role === "admin";
  window.isAuthenticatedUser = isAuthenticated && Boolean(currentUser);

  if (!window.isAuthenticatedUser) {
    window.location.replace("login.html");
    return;
  }

  if (document.body?.dataset.adminOnly === "true" && !window.isAdmin) {
    window.location.replace("dashboard.html");
  }
  if (document.body?.dataset.userOnly === "true" && window.isAdmin) {
    window.location.replace("dashboard.html");
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!window.isAdmin) {
      document.querySelectorAll(".admin-only").forEach((element) => {
        element.remove();
      });

      document.querySelectorAll(".admin-page-link").forEach((element) => {
        element.remove();
      });

    } else {
      document.querySelectorAll(".user-only, .user-page-link").forEach((element) => {
        element.remove();
      });
    }
  });

  window.requireAdmin = function requireAdmin() {
    if (!window.isAdmin) {
      alert("Admin access required.");
      return false;
    }
    return true;
  };
})();
