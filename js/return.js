let issuebooks = JSON.parse(localStorage.getItem("issuebooks")) || [];
let books = JSON.parse(localStorage.getItem("books")) || [];
let table = document.querySelector(".table-container .issue-table tbody");

function loadIssue() {
  if (issuebooks.length == 0) {
    let table = document.querySelector(".table-container .issue-table tbody");
    table.innerHTML = "";
    let tabl = document.querySelector(".image-container");
    let image=document.createElement('img')
    image.src="../assets/images/returnbook.png"
    image.setAttribute('id',"myImage")
   
    tabl.append(image)

  } else {
    let table = document.querySelector(".table-container .issue-table tbody");
    table.innerHTML = "";
    issuebooks.forEach((issue) => {
      let today = new Date();
      today.setHours(0, 0, 0, 0);

      let dueDate = new Date(issue.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      let statusText = dueDate < today ? "Overdue" : "Issued";
      let statusClass = dueDate < today ? "overdue" : "issued";

      table.innerHTML += ` <tr>
        <td>${issue.issueId}</td>
        <td>${issue.issueBook}
        <span style="display:block">Book Id :${issue.bookId}</span>
        </td>
        <td>
          <strong>${issue.issueMember}</strong>
        
        </td>
        <td>${issue.issueDate}</td>
        <td>
          <span class="date">${issue.dueDate}</</span>
          <span class="status ${statusClass}">${statusText}</span>
        </td>
        <td>
         
          <button class="btn return" onClick=returnBook('${issue.issueId}','${issue.bookId}','${issue.issueId}')>Return</button>
        </td>
      </tr>`;
    });
  }
}
document.onload = loadIssue();

// function updateDueDate() {

//     let issue = JSON.parse(localStorage.getItem("issuebooks")) || [];

//     issue = issue.map(issue => {
//         if (issue.issueId == "ISS-102" ) {
//             return {
//                 ...issue,
//                 dueDate: '2026-10-10',
//             };
//         }

//         return issue;
//     });

//     localStorage.setItem("issuebooks", JSON.stringify(issue));

//     console.log("Due date updated successfully!");
// }
// updateDueDate()

//Return Book Management
function returnBook(id, bookId, issueId) {
  let i = issuebooks.find(issue => issue.issueId == issueId)
  issuebooks = issuebooks.filter((issue) => issue.issueId !== id);
  localStorage.setItem("issuebooks", JSON.stringify(issuebooks));
  loadIssue();
  recentHistory(i);
  updateBook(bookId);



}

function updateBook(id) {
  const updateBook = books.find((book) => book.bookId === id);
  updateBook.bookQuantity = Number(updateBook.bookQuantity) + 1;
  localStorage.setItem("books", JSON.stringify(books));
}

//function recentHistory

function recentHistory(id) {
  const { dueDate, issueDate, issueBook, issueMember } = id;

  let recent = JSON.parse(localStorage.getItem("recenthistory")) || [];
  let recentID;
  if (recent.length == 0) {
    recentID = 101
  } else {
    let rec = recent[recent.length - 1].recentId
    recentID = rec + 1
  }

  let newRecent = {
    recentId: recentID,
    issueMember: issueMember,
    status: "Return",
    issueBook: issueBook,
    issueDate: issueDate,
    dueDate: dueDate

  }
  recent.push(newRecent)
  localStorage.setItem('recenthistory', JSON.stringify(recent))
  // let filterUser=issuebooks.find((f) =>  f.issueId == id)














}
// localStorage.removeItem('recenthistory')
