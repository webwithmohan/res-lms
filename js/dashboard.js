document.addEventListener("sidebarloaded", () => {
  let currentUser = JSON.parse(localStorage.getItem("currentuser"));
  
  
  console.log(currentUser);

  let user = document.querySelector(".profile p .user");
  user.textContent = currentUser.username;

  const logoutButton = document.querySelector(".menu .logout button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      Swal.fire({
        icon: "warning",
        title: "Are you Sure to Logout",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("isAuthenticated", false);
          window.location.href = "login.html";
        }
      });
    });
  }
});


//recent History Manage
let recents=JSON.parse(localStorage.getItem('recenthistory')) || []
let recent=recents.slice(-5).reverse();
let tables=document.querySelector('.recent-issue-box table tbody')
tables.innerHTML="";
recent.forEach((r) => {
  let status=r.status=="Issue"?"issue":"return"
  tables.innerHTML +=` <tr>
              <th>${r.recentId}</th>
              <th>${r.issueMember}</th>
              <th>${r.issueBook}</th>
              <th>${r.issueDate}</th>
              <th>${r.dueDate}</th>
              <th><span class="${status}">${r.status}</span></th>
            </tr>`


})

let memberss=JSON.parse(localStorage.getItem('users')) || []
document.getElementById('members').textContent=memberss.length

let issuebooks=JSON.parse(localStorage.getItem('issuebooks')) || []
let today=new Date()
today.setHours(0,0,0,0)
let overdueBooks=issuebooks.filter((issue) => {
  let dueDate=new Date(issue.dueDate)
  dueDate.setHours(0,0,0,0)
  return dueDate < today
})
document.getElementById('available-books').textContent=overdueBooks.length



//Quick Action section Manage (Add Book ,Add Member ,Issue Book, Reports)

function navigateReports(){
  
  window.location.href="../templates/reports.html"
}
function navigateAddBook(){
  
  window.location.href="../templates/books.html"
}

function navigateAddMembers(){
  
  window.location.href="../templates/members.html"
}
function navigateIssueBooks(){
  
  window.location.href="../templates/issuebook.html"
}




