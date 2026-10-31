
function checkLoginDetails(event) {
  event.preventDefault();
  let email = document.getElementById("email");
  let pass = document.getElementById("password");
  let error = document.getElementById("error");

  let retrivedData = JSON.parse(localStorage.getItem("users"));
  console.log(retrivedData);
  //current user find

  //      let current=retrivedData.find(d => d.email== email && d.password==pass);
  //      console.log(current);

  //     localStorage.setItem("currentUser",JSON.stringify(current || "demo"))
  // }

  //////////////////////////////////////////////////////////////////////
  let valid = false;

  for (let d of retrivedData) {
    if (email.value.trim() == d.email && pass.value.trim() == d.password) {
      valid = true;
    }
  }

  let current = retrivedData.find((user) => user.email == email.value);
  console.log(current);
  localStorage.setItem("currentuser", JSON.stringify(current));

  if (valid) {
    error.textContent = "";
    email.value = "";
    pass.value = "";
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem('isAuthenticated',true)
    window.location.href = "dashboard.html";
  } else {
    error.textContent = "Invalid Username and Password";
    error.style.color = "red";
  }
}

//Render Forgot Password Page
let forgotBtn = document.getElementsByClassName("forgot-btn")[0];
forgotBtn.addEventListener("click", function () {
  window.location.href = "forgot.html";
});
let bool=localStorage.getItem('isAuthenticated')
if(bool === "true"){
 
  
   window.location.href = "dashboard.html";

}
     


