 // Declare the variable whatever we will use the document
    let memberSelect = document.getElementById('memberSelect')
    let bookSelect = document.getElementById('bookSelect')
    let issueDate = document.getElementById('issueDate')
    let dueDate = document.getElementById('dueDate')
    let issueBtn = document.getElementById('issueBtn')

    //get the member and books list in the local Storage

    

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let books = JSON.parse(localStorage.getItem('books')) || [];
    users.forEach((user) => {
      let element = document.createElement('option')
      element.value = user.username
      element.textContent = user.username;
      memberSelect.appendChild(element)
    })

    //Books Render
    function renderBook() {
      let filteredBooks = books.filter((book) => book.bookQuantity > 0)
      filteredBooks.forEach((book) => {
        let element = document.createElement('option')
        element.value = book.bookId
        element.textContent = book.bookTitle;
        bookSelect.appendChild(element)
      })
    }
    renderBook()

    //Issue Date Validation
    const date = new Date();
    issueDate.value = date.toISOString().split('T')[0]

    //Due Date
    const dDate = new Date();
    dDate.setMonth(dDate.getMonth() + 1)
    dueDate.value = dDate.toISOString().split('T')[0]





    // localStorage.removeItem('books')

    issueBtn.addEventListener('click', function (event) {
      event.preventDefault();
      let issueDate = document.getElementById('issueDate')
      let dueDate = document.getElementById('dueDate')


      if (memberSelect.value == "" || bookSelect.value == "") {
        Swal.fire({
          icon: "warning",
          title: "Please Select all Fields"
        })
        return
      } else if (new Date(dueDate.value) <= new Date(issueDate.value)) {
        Swal.fire({
          icon: "info",
          title: "Invalid Date Choose"
        })


        return


      }
      else {
        let issueBooks = JSON.parse(localStorage.getItem('issuebooks')) || [];
        const selectedBook = books.find(book => book.bookId === bookSelect.value)
        let issueId;
        if(issueBooks.length == 0){
            issueId="ISS-101"

        }else{
            
            let id=(issueBooks[issueBooks.length -1].issueId).split('-')[1];
            
            
            let i=Number(id) + 1
            issueId=`ISS-${i}`

            
           
            

        }
        const newIssue = {
          issueId:issueId,
          bookId: selectedBook.bookId,
          issueMember: memberSelect.value,
          issueBook: selectedBook.bookTitle,
          issueDate: issueDate.value,
          dueDate: dueDate.value
        }
        recentHistory(newIssue);
        issueBooks.push(newIssue)
        localStorage.setItem("issuebooks", JSON.stringify(issueBooks))
        Swal.fire({
          icon: "success",
          title: "Book Issue Successfully"
        })
        updateQuantity(selectedBook.bookId);
        clearBtns()


      }
      function updateQuantity(uid) {
        const updateBook = books.find(book => book.bookId === uid);
        updateBook.bookQuantity = Number(updateBook.bookQuantity) - 1;
        localStorage.setItem('books', JSON.stringify(books))
        renderBook()



      }






    })

    function recentHistory(d){
        let recentHistory=JSON.parse(localStorage.getItem('recenthistory')) || []
        let recentId;
        if(recentHistory.length == 0){
            recentId=101

        }else{
            let id=(recentHistory[recentHistory.length -1].recentId) +1
            recentId=id;

        }
        const {issueMember,issueBook,issueDate,dueDate}=d;
        let n={
            recentId:recentId,
            issueMember:issueMember,
            status:"Issue",
            issueBook:issueBook,
            issueDate:issueDate,
            dueDate:dueDate
            


            

        }
        recentHistory.push(n);
        localStorage.setItem('recenthistory',JSON.stringify(recentHistory))
       
        
        
    }

    //Running Issue
    let move=document.querySelector('.wrapper .card-track');
    let issueRunningData=JSON.parse(localStorage.getItem('issuebooks')) || []
    issueRunningData.forEach((data,index) => {
      move.innerHTML +=`<div class="c c-${index+1}">
      <p style="font-size:20px;font-weight:bold";>Name :${data.issueMember}</p>
      <p>Book:${data.issueBook}</p>
      <p>Issue Date:${data.issueDate}</p>
      <p>Due Date:${data.dueDate}</p>
      
      </div>`

    })

    //clearBtn

    let clearBtn=document.getElementById('clearBtn');
    clearBtn.addEventListener('click',clearBtns)

    function clearBtns(){
     
      document.getElementById('memberSelect').value=""
      document.getElementById('bookSelect').value=""
    }

    //////
    
    
    