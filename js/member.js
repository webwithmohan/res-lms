

let members = JSON.parse(localStorage.getItem("users"));

function loadMembersData() {
    let main = document.querySelector("table tbody")
    console.log(main);
    main.innerHTML = ""
    let totalUsers = document.getElementById("total-users");
    totalUsers.textContent = `Total Users : ${members.length}`;

    for (let i = 0; i < members.length; i++) {
        main.innerHTML += `<tr><td>${members[i].memberId}</td><td>${members[i].username}</td><td>${members[i].department}</td><td>${members[i].email}</td><td>${members[i].phone}</td><td>${members[i].address}</td><td><button class="btn-edit btn" onClick="editUserPopup('${members[i].memberId}')">Edit</button><button data-email="${members[i].email}" onclick="deleteUser('${members[i].memberId}')" class="btn-delete btn">Delete</button></td></tr>`;
    }
}


document.onload = loadMembersData();




//Create editUserPopup function
function editUserPopup(id) {
    let mem = members.find(user => user.memberId == id)
    let existingOverlay = document.querySelector('.overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    let main = document.getElementsByTagName('main')[0]
    let overlay = document.createElement('div')
    overlay.setAttribute("class", "overlay")
    overlay.innerHTML = `<div class="popup">
    <form action="" method="">
    <h1>Edit Member</h1>
    <input type="text"  id="memberId" value="${mem.memberId}" readonly class="text-muted">
    <input type="text"  value="${mem.username}" id="memberUsername">
    <input type="text"  id="memberDepartment" value="${mem.department}">
    <input type="text"  id="memberEmail" value="${mem.email}">
    <input type="text"  id="memberPhone" value="${mem.phone}">
    <input type="text"  id="memberAddress" value="${mem.address}">

    <button class="btns btn-edits" onClick="editMember()">Edit</button>
    <button class="btns btn-cancels">Cancel</button>
    
    
    </div>`
    main.appendChild(overlay)



}

//Edit Function
function editMember() {
    event.preventDefault();
    let memberId = document.getElementById('memberId').value;
    let memberUsername = document.getElementById('memberUsername').value;
    let memberDepartment = document.getElementById('memberDepartment').value;
    let memberEmail = document.getElementById('memberEmail').value;
    let memberPhone = document.getElementById('memberPhone').value;
    let memberAddress = document.getElementById('memberAddress').value;



    if (memberId == "" || memberUsername == "" || memberDepartment == "" || memberEmail == "" || memberPhone == ""||memberAddress=="") {
        Swal.fire({
            icon: "warning",
            title: "Require All Fields"
        })
        return

    }
    let currentMemberId = document.getElementById('memberId').value
    let emailExist = members.some(user => user.email == memberEmail && user.memberId !== currentMemberId);
    if (emailExist) {
        Swal.fire({
            icon: "warning",
            title: "Email Already Exist"
        })
        return

    }

    let user = members.find(u => u.memberId == currentMemberId);
    user.memberId = memberId;
    user.username = memberUsername;
    user.email = memberEmail;
    user.department = memberDepartment;
    user.phone = memberPhone;
    user.address=memberAddress;
    localStorage.setItem('users', JSON.stringify(members))
    document.getElementsByClassName('overlay')[0].style.display = "none"
    loadMembersData();
    Toastify({
            text: "Edit Successfully !",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "var(--main-color)",
                borderRadius: "10px"
            },


        }).showToast();











}
//Delete User Popup
function deleteUser(id) {
    Swal.fire({
        icon: "warning",
        title: "Are you sure to delete ?",
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            if (members.length > 1) {
                members = members.filter(user => user.memberId != id);
                localStorage.setItem('users', JSON.stringify(members))

                Toastify({
                    text: "Deleted Member  Successfully !",
                    duration: 2000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "red",
                        borderRadius: "10px"
                    },


                }).showToast();
                loadMembersData();



            } else {
                members = members.filter(user => user.memberId != id);
                localStorage.setItem('users', JSON.stringify(members))
                window.location.href = "../templates/login.html"

            }


        }
    })


}
//Add member function
function addMember(id) {
    let mem = members[members.length -1].memberId
    let newId;
    let cid = Number(mem.split('-')[1]) + 1
    newId = `MEM-${cid}`




    let main = document.getElementsByTagName('main')[0]
    let overlay = document.createElement('div')
    overlay.setAttribute("class", "overlay")
    overlay.innerHTML = `<div class="popup">
    <form action="" method="">
    <h1>Add Member</h1>
    <input type="text" placeholder="member" id="memberId" value="${newId}" readonly class="text-muted">
    <input type="text" placeholder="Member Name" id="memberUsername" value="">
    <input type="text" placeholder="Member Email" id="memberEmail" value="">
    <select id="memberDepartment" name=""><option value="">Select Department</option>
    <option value="Master of Application">Master of Apllication</option>
    <option value="Bachelor of Computer Science">Bachelor of Computer Science</option></select>
    <input type="text" placeholder="Address" id="memberAddress" value="">
    <input type="text" placeholder="Phone" id="memberPhone" value="">
    <input type="text" placeholder="Password" id="memberPassword" value="">
    <input type="text" placeholder="Confirm Password" id="confirmPassword" value="">

    <button class="btns btn-edits" onClick="saveMember()">Save</button>
    <button class="btns btn-cancels">Cancel</button>
    
    
    </div>`
    main.appendChild(overlay)

}

//Save Member Function
function saveMember() {

    event.preventDefault();
    let memberId = document.getElementById('memberId').value;
    let memberUsername = document.getElementById('memberUsername').value;
    let memberEmail = document.getElementById('memberEmail').value;
    let memberDepartment = document.getElementById('memberDepartment').value;
    let memberAddress = document.getElementById('memberAddress').value;
    let memberPhone = document.getElementById('memberPhone').value;
    let memberPassword = document.getElementById('memberPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;


    //Check All Field Are must be Not Empty
    let currentMemberId = document.getElementById('memberId').value
    if (memberUsername == "" || memberEmail == "" || memberDepartment == "" || memberAddress == "" || memberPhone == "" || memberPassword == "" || confirmPassword == "") {
        alert("All Fields Are Required")
        return
    }
    //Check Email Already Exits
    let emailExist = members.some(user => user.email == memberEmail &&user.memberId !== currentMemberId)


    if (emailExist) {
        Toastify({
            text: "Email Already Exist !",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "red",
                borderRadius: "10px"
            },


        }).showToast();
        return;

    }
    //Phone Validation
    if (!/^[6-9]\d{9}$/.test(memberPhone.trim())) {
        Toastify({
            text: "Invalid Phone Number !",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "red",
                borderRadius: "10px"
            },


        }).showToast();
        return;

    }


    //Check Password 
    if (memberPassword !== confirmPassword) {
        Toastify({
            text: "Password Not Match !",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "red",
                borderRadius: "10px"
            },


        }).showToast();

    }


    let newUser = {
        address: memberAddress,
        department: memberDepartment,
        email: memberEmail,
        memberId: memberId,
        password: memberPassword,
        phone: memberPhone,
        username: memberUsername,

    }
    members.push(newUser);
    Toastify({
        text: "Member Added Successfully!",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            background: "green",
            borderRadius: "10px"
        },


    }).showToast();
    localStorage.setItem('users',JSON.stringify(members))
    loadMembersData()
    document.getElementsByClassName('overlay')[0].style.display = "none"


  


}