
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

    // Find matching user
    let currentUser = retrivedData.find(user =>
        user.email === enteredEmail &&
        user.password === enteredPassword
    );

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


// Check Authentication
let isAuthenticated = localStorage.getItem("isAuthenticated");

if (isAuthenticated === "true") {
    window.location.href = "dashboard.html";
}
