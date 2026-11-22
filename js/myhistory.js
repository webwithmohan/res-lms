const historyUser = window.currentSessionUser || {};
const currentBooksBody = document.getElementById("current-books");
const bookHistoryBody = document.getElementById("book-history");
const issuedBooks = JSON.parse(localStorage.getItem("issuebooks") || "[]");
const recentHistory = JSON.parse(localStorage.getItem("recenthistory") || "[]");

function isCurrentUserRecord(record) {
  if (!window.isAuthenticatedUser || !historyUser.memberId) return false;
  if (record.issueMemberId && historyUser.memberId) {
    return record.issueMemberId === historyUser.memberId;
  }
  return record.issueMember === historyUser.username;
}

function appendHistoryRow(body, values) {
  const row = document.createElement("tr");
  values.forEach((value) => {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
  });
  body.appendChild(row);
}

function showEmptyMessage(body, columnCount, message) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = columnCount;
  cell.className = "history-empty";
  cell.textContent = message;
  row.appendChild(cell);
  body.appendChild(row);
}

const myActiveBooks = issuedBooks.filter(isCurrentUserRecord);
if (myActiveBooks.length) {
  myActiveBooks.forEach((issue) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(issue.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    const status = dueDate < today ? "Overdue" : "Borrowed";
    appendHistoryRow(currentBooksBody, [
      issue.issueBook,
      issue.issueDate,
      issue.dueDate,
      status,
    ]);
  });
} else {
  showEmptyMessage(currentBooksBody, 4, "You have no books borrowed right now.");
}

const myHistory = recentHistory.filter(isCurrentUserRecord).slice().reverse();
if (myHistory.length) {
  myHistory.forEach((activity) => {
    appendHistoryRow(bookHistoryBody, [
      activity.issueBook,
      activity.issueDate,
      activity.dueDate,
      activity.status,
    ]);
  });
} else {
  showEmptyMessage(bookHistoryBody, 4, "No borrowing history yet.");
}
