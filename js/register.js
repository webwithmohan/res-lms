let alreadyBtn = document.getElementById("already-button");
alreadyBtn.addEventListener("click", function () {
  window.location.href = "login.html";
});

//Eye Function
// let closeEye = document.getElementsByClassName("close-eye")[0];
// let password = document.getElementById("password");
// let confirmPassword = document.getElementById("confirm-password");
// closeEye.addEventListener("click", () => {
//   if (password.type == "password") {
//     confirmPassword.type = "text";
//     password.type = "text";
//     closeEye.classList.replace("fa-eye-slash", "fa-eye");
//   } else {
//     confirmPassword.type = "password";
//     password.type = "password";
//     closeEye.classList.replace("fa-eye", "fa-eye-slash");
//   }
// });

//Register Form Validation
let username = document.getElementById("user-name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let address = document.getElementById("address");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");

//Error Tags
let usernameError = document.getElementById("username-error");
let emailError = document.getElementById("email-error");
let phoneError = document.getElementById("phone-error");
let addressError = document.getElementById("address-error");
let passwordError = document.getElementById("password-error");
let confirmPasswordError = document.getElementById("confirm-password-error");
let department = document.getElementById("department");

function checkForm() {
  event.preventDefault();
 

  let valid = true;
  //Form Validation
  if (username.value.trim() == "") {
    usernameError.textContent = "Username Cannot be Empty";
    usernameError.style.color = "red";
    valid = false;
  } else if (username.value.length < 8) {
    usernameError.textContent = "Atleast 8 character";
    usernameError.style.color = "red";
    valid = false;
  } else {
    usernameError.textContent = "";
  }

  //Email Validation

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    emailError.textContent = "Please Enter Correct Details";
    emailError.style.color = "red";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  //Phone Validation
  if (!/^[6-9]\d{9}$/.test(phone.value.trim())) {
    phoneError.textContent = "Please Enter Correct Format";
    phoneError.style.color = "red";
    valid = false;
  } else {
    phoneError.textContent = "";
  }

  //Address Validation
  if (address.value == "") {
    addressError.textContent = "Address Cannot be empty";
    addressError.style.color = "red";
    valid = false;
  } else {
    addressError.textContent = "";
  }

  // password validation
  if (password.value.trim() === "") {
    passwordError.textContent = "Password Cannot be empty";
    passwordError.style.color = "red";
    valid = false;
  } else if (password.value.length < 8) {
    passwordError.textContent = "Password Must greater than 8 charater";
    passwordError.style.color="red"
    valid = false;
  } else {
    passwordError.textContent = "";
  }
  //Confirm Password Validation

  if (confirmPassword.value.trim() === "") {
    confirmPasswordError.textContent = "Confirm Password Cannot be empty";
    confirmPasswordError.style.color = "red";
    valid = false;
  } else if (confirmPassword.value.length < 8) {
    confirmPasswordError.textContent = "Password Must greater than 8 charater";
    confirmPasswordError.style.color="red"
    valid = false;
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = "Password do not match";
    confirmPasswordError.style.color = "red";
    valid = false;
  } else {
    confirmPasswordError.textContent = "";
  }

  if (valid) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const matchingIds = users
      .map((user) => user.memberId)
      .filter((id) => typeof id === "string" && id.startsWith("MEM-"));
    const highestId = matchingIds.reduce((highest, id) => {
      const number = Number.parseInt(id.split("-")[1], 10);
      return Number.isFinite(number) ? Math.max(highest, number) : highest;
    }, 100);
    const accountId = `MEM-${highestId + 1}`;

    const emailExists = users.some(
      (user) => user.email?.toLowerCase() === email.value.trim().toLowerCase(),
    );
    if (emailExists) {
      emailError.textContent = "Email Already Registered";
      emailError.style.color = "red";
      return;
    }

    let newUser = {
      memberId: accountId,
      username: username.value.trim(),
      email: email.value.trim(),
      department: document.getElementById("department").value,
      phone: phone.value.trim(),
      address: address.value,
      password: password.value.trim(),
      role: "user",
    };

    //new user
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire({
      icon: "success",
      title: "Register Success",
      text: "Account Created Successfully ! You can Login",
    }).then((result) => {
      window.location.href = "login.html";
    });
  }
}

// localStorage.removeItem('users')
