
function checkLoginDetails(event) {
    event.preventDefault();

    // Get DOM elements
    let email = document.getElementById("email");
    let pass = document.getElementById("password");
    let error = document.getElementById("error");

    // Get registered users
    let retrivedData = [];

    try {
        retrivedData = JSON.parse(
            localStorage.getItem("users")
        ) || [];

    } catch (err) {
        error.textContent = "Invalid user data";
        error.style.color = "red";
        return;
    }

    // Check whether users is an array
    if (!Array.isArray(retrivedData)) {
        error.textContent = "Invalid user data";
        error.style.color = "red";
        return;
    }

    // Get input values
    let enteredEmail = email.value.trim();
    let enteredPassword = pass.value.trim();
    let selectedRole = document.querySelector('input[name="loginRole"]:checked')?.value || "user";

    const adminAccount = {
        memberId: "ADM-001",
        username: "Admin",
        email: "admin@lms.com",
        department: "Administration",
        phone: "",
        address: "",
        role: "admin"
    };

    // The local-only admin credentials are intentionally not saved with member data.
    const isAdminLogin =
        selectedRole === "admin" &&
        enteredEmail === "admin@lms.com" &&
        enteredPassword === "admin123";
    let currentUser = isAdminLogin
        ? adminAccount
        : selectedRole === "user"
          ? retrivedData.find(user =>
                user.email === enteredEmail &&
                user.password === enteredPassword &&
                (user.role || "user") === "user"
            )
          : null;

    // Validate login
    if (currentUser) {

        // Clear error
        error.textContent = "";

        // Store current user
        localStorage.setItem(
            "currentuser",
            JSON.stringify(currentUser)
        );

        // Set authentication status
        localStorage.setItem("isAuthenticated", "true");

        // Clear inputs
        email.value = "";
        pass.value = "";

        // Redirect to dashboard
        window.location.href = "dashboard.html";

    } else {

        error.textContent = "Invalid Username and Password";
        error.style.color = "red";
    }
}


// Forgot Password Navigation
let forgotBtn = document.getElementsByClassName("forgot-btn")[0];

if (forgotBtn) {
    forgotBtn.addEventListener("click", function () {
        window.location.href = "forgot.html";
    });
}



