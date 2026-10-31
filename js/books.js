let books = JSON.parse(localStorage.getItem("books")) || [];

const link = document.querySelector(".category-link");
console.log(link);

//get Uniq Category Item

// const categorySet = new Set();
// books.forEach((book) => {
//   categorySet.add(book.category);
// });
// let categories = [...categorySet];
// console.log(categories);
let categories = ["Tech", "Science", "History", "Programming", "Physics"];

categories.forEach((book) => {
  link.innerHTML += `<li data-category="${book}">${book}</li>`;
});

//Render Category in addBook

let bookCategory = document.getElementById("bookCategory");
categories.forEach((book) => {
  bookCategory.innerHTML += `<option value=${book}>${book}</option>`;
});

//render all books;

let bookContainer = document.querySelector(".table-container table tbody");
books.forEach((book) => {
  bookContainer.innerHTML += `<tr>
                <td>${book.bookId}</td>
                <td>${book.bookTitle}<br><span class="publisher">${book.bookPublisher}</span></td>
                <td>${book.bookAuthor}</td>
                <td>${book.bookCategory}</td>
                <td>${book.bookQuantity && Number(book.bookQuantity) > 0 ?book.bookQuantity : `<span style="color:red";>Out of Stock</span>`}</td>
                
                <td class="action-col">
                  <button onclick="openEditPopup('${book.bookId}')" class="btn-edit btn"><span class=" edit-icon material-symbols-outlined">
edit
</span>Edit</button>
                  <button onclick="deleteBook('${book.bookId}')" class="btn-delete btn"><span class="delete-icon material-symbols-outlined">
delete
</span>Delete</button>
                  
                </td>
              </tr>`;
});

//display Books
function displayBooks(cat) {
  // let filter=books.filter((book) => book.category.toLowerCase() == cat)
  // console.log(filter);

  if (cat != "all") {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let filteredBooks = books.filter(
      (book) => book.bookCategory.toLowerCase().replace(" ", "") === cat,
    );

    bookContainer.innerHTML = "";

    filteredBooks.map((book) => {
      bookContainer.innerHTML += `<tr>
                <td>${book.bookId}</td>
                <td>${book.bookTitle}</td>
                <td>${book.bookAuthor}</td>
                <td>${book.bookCategory}</td>
                <td>${book.bookQuantity}</td>
                
                <td>
                  <button class="btn-edit btn" onclick="openEditPopup('${book.bookId}')"><span class=" edit-icon material-symbols-outlined">
edit
</span>Edit</button>
                  <button class="btn-delete btn" onclick="deleteBook('${book.bookId}')"><span class="delete-icon material-symbols-outlined">
delete
</span>Delete</button>
                  
                </td>
              </tr>`;
    });
  } else {
    bookContainer.innerHTML = "";
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.map((book) => {
      bookContainer.innerHTML += `<tr>
                <td>${book.bookId}</td>
                <td>${book.bookTitle}<br><span class="publisher">${book.bookPublisher}</span></td>
                <td>${book.bookAuthor}</td>
                <td>${book.bookCategory}</td>
                 <td>${book.bookQuantity && Number(book.bookQuantity) > 0 ?book.bookQuantity : `<span style="color:red";>Out of Stock</span>`}</td>
              
                <td >
                  <button onclick="openEditPopup('${book.bookId}')" class="btn-edit btn"><span class=" edit-icon material-symbols-outlined">
edit
</span>Edit</button>
                  <button onclick="deleteBook('${book.bookId}')" class="btn-delete btn"><span class="delete-icon material-symbols-outlined">
delete
</span>Delete</button>
                  
                </td>
              </tr>`;
    });
  }
}

//  bookContainer.innerHTML += `<div class="book"><img src="${val.imageUrl}"></img><p>Title :${val.title}</p><p>Author:${val.author}</p><p>Category:${val.category}</p></div>`;

//filter all category and add cative

let list = link.querySelectorAll("li");
list.forEach((val) => {
  val.addEventListener("click", () => {
    let c = val.dataset.category.toLowerCase().trim();
    let category = c.replace(" ", "");
    switch (category) {
      case "all":
        setActiveItem(category);
        displayBooks(category);
        break;

      case "physics":
        setActiveItem(category);
        displayBooks(category);
        break;
      case "programming":
        setActiveItem(category);
        displayBooks(category);
        break;
        setActiveItem(category);
      case "history":
        setActiveItem(category);
        displayBooks(category);
        break;
      case "science":
        setActiveItem(category);
        displayBooks(category);
        break;
      case "tech":
        setActiveItem(category);
        displayBooks(category);
        break;
    }
  });
});

function setActiveItem(li) {
  let item = document.querySelectorAll(".category-link li");
  item.forEach((val) => {
    // val.classList.remove("active");
    if (val.dataset.category.toLowerCase().replace(" ", "") == li) {
      val.classList.add("active");
    } else {
      val.classList.remove("active");
    }
  });
}

//open AddBook Popup

function openBookPopup() {
  let b = JSON.parse(localStorage.getItem("books"))
  let overlay = document.querySelector(".overlay");
  overlay.style.display = "flex";
  let id = document.getElementById("bookId");
  if(b != undefined){
    id.value=b.length + 1

  }else{
    id.value=1
  }
 
}

//close popup
function closePopup() {
  let overlay = document.querySelector(".overlay");
  overlay.style.display = "none";
}
function editOverlay() {
  let overlay = document.querySelector(".editOverlay");
  overlay.style.display = "none";
}

//addBook Functionality

function addBook() {
  let bookId = document.getElementById("bookId").value;
  let bookTitle = document.getElementById("bookTitle").value;
  let bookAuthor = document.getElementById("bookAuthor").value;
  let bookCategory = document.getElementById("bookCategory").value;
  let bookQuantity = document.getElementById("bookQuantity").value;
  let bookPublisher = document.getElementById("bookPublisher").value;
  let bookYear = document.getElementById("bookYear").value;

  if (
    bookTitle === "" ||
    bookAuthor === "" ||
    bookCategory === "" ||
    bookQuantity === "" ||
    bookPublisher === "" ||
    bookYear === ""
  ) {
    Swal.fire({
      title: "Required All Fields",
      icon: "warning",
      position: "top-center",
    });
    return;
  } else {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    const newBook = {
      bookId: bookId,
      bookTitle: bookTitle,
      bookAuthor: bookAuthor,
      bookCategory: bookCategory,
      bookQuantity: bookQuantity,
      bookPublisher: bookPublisher,
      bookYear: bookYear,
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    Toastify({
      text: "book Added Successfully !",
      duration: 3000,
      gravity: "top",
      position: "center",
    }).showToast();

    clear();
    document.querySelector(".overlay").style.display = "none";
    displayBooks("all");
  }
}

// clear the input value after insert the book
function clear() {
  let bookId = (document.getElementById("bookId").value = "");
  let bookTitle = (document.getElementById("bookTitle").value = "");
  let bookAuthor = (document.getElementById("bookAuthor").value = "");
  let bookCategory = document.getElementById("bookCategory").value;
  let bookQuantity = (document.getElementById("bookQuantity").value = "");
  let bookPublisher = (document.getElementById("bookPublisher").value = "");
  let bookYear = (document.getElementById("bookYear").value = "");
}

//delete Book

function deleteBook(id) {
  Swal.fire({
    icon: "warning",
    title: "Are you sure to Delete",
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonText: "Delete",
    confirmButtonColor: "red",
  }).then((res) => {
    if (res.isConfirmed) {
      let books = JSON.parse(localStorage.getItem("books")) || [];
      books = books.filter((book) => book.bookId !== id);
      localStorage.setItem("books", JSON.stringify(books));
      Toastify({
      text: "Deleted Successfully !",
      duration: 3000,
      gravity: "top",
      position: "right",
      style:{
        background:"red",
        borderRadius:"10px"
      },
  

    }).showToast();
      displayBooks("all");
    }
  });
}

//Edit Book
let overlay = document.getElementsByClassName("editOverlay")[0];
function openEditPopup(id) {
  overlay.style.display = "flex";
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let book = books.find((book) => book.bookId === id);
  document.getElementById("editBookId").value = book.bookId;
  document.getElementById("editBookTitle").value = book.bookTitle;
  document.getElementById("editBookAuthor").value = book.bookAuthor;
  // document.getElementById("editBookCategory").value = book.bookCategory;
  document.getElementById("editBookQuantity").value = book.bookQuantity;
  document.getElementById("editBookPublisher").value = book.bookPublisher;
  document.getElementById("editBookYear").value = book.bookYear;

  let category = document.getElementById("editBookCategory");

  let selectedCategory = book.bookCategory;

  let options = [...category.options];

  let selectedOption = options.find(
    (option) => option.value === selectedCategory,
  );

  if (selectedOption) {
    category.value = selectedCategory;
  } else {
    let option = document.createElement("option");

    option.value = selectedCategory;
    option.textContent = selectedCategory;

    category.insertBefore(option, category.firstChild);

    category.value = selectedCategory;
  }
}

function editBook() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let id = document.getElementById("editBookId").value;

  let book = books.find((book) => book.bookId === id);
  book.bookId = document.getElementById("editBookId").value;
  book.bookTitle = document.getElementById("editBookTitle").value;
  book.bookAuthor = document.getElementById("editBookAuthor").value;
  book.bookCategory = document.getElementById("editBookCategory").value;
  book.bookQuantity = document.getElementById("editBookQuantity").value;
  book.bookPublisher = document.getElementById("editBookPublisher").value;
  book.bookYear = document.getElementById("editBookYear").value;

  localStorage.setItem("books", JSON.stringify(books));
   Toastify({
      text: "book Edited Successfully !",
      duration: 3000,
      gravity: "top",
      position: "right",
      style:{
        background:"var(--main-color)",
        borderRadius:"10px"
      },
  

    }).showToast();
  displayBooks("all");
  overlay.style.display = "none";
}

//search Functionality
let searchValue = document.getElementById("searchBook");
function bookSearch(data) {
  let bookContainer = document.querySelector(".table-container table tbody");
  bookContainer.innerHTML = "";

  data.map((book) => {
    bookContainer.innerHTML += `<tr>
                <td>${book.bookId}</td>
                <td>${book.bookTitle}<br><span class="publisher">${book.bookPublisher}</span></td>
                <td>${book.bookAuthor}</td>
                <td>${book.bookCategory}</td>
                <td>${book.bookQuantity && Number(book.bookQuantity) > 0 ?book.bookQuantity : `<span style="color:red";>Out of Stock</span>`}</td>
              
                <td>
                  <button onclick="openEditPopup('${book.bookId}')" class="btn-edit btn"><span class="edit-icon material-symbols-outlined">
edit
</span>Edit</button>
                  <button onclick="deleteBook('${book.bookId}')" class="btn-delete btn"><span class="delete-icon material-symbols-outlined">delete</span>Delete</button>
                  
                </td>
              </tr>`;
  });
}

document.getElementById("searchBook").addEventListener("input", function () {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let search = searchValue.value.toLowerCase().trim();

  let filteredBooks = books.filter(
    (book) =>
      book.bookTitle.toLowerCase().includes(search) ||
      book.bookAuthor.toLowerCase().includes(search),
  );
  bookSearch(filteredBooks);
});
