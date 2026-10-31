// Get all Data from the localstoreage

let user=JSON.parse(localStorage.getItem('users')) || [];
let issuebooks=JSON.parse(localStorage.getItem('issuebooks')) || [];
let books=JSON.parse(localStorage.getItem('books')) || [];

//Get the element from the document using by Id

let bookTitle=document.getElementById('bookTitle');
let booksStocks=document.getElementById('booksStocks');
let issueBooks=document.getElementById('issueBooks').textContent=issuebooks.length;
let registerMembers=document.getElementById('registerMembers').textContent=user.length;

//get Books Count
let total=books.reduce((sum,book) => sum + Number(book.bookQuantity),0)
booksStocks.textContent=total;

//Distint Title

let categories=new Set(books.map(book => book.bookCategory))
console.log(categories.size);

bookTitle.textContent=categories.size


//




        // STEP 2: Category-wise count

        const categoryCount = books.reduce((acc, book) => {

            acc[book.bookCategory] = (acc[book.bookCategory] || 0) + 1;

            return acc;

        }, {});
        console.log(categoryCount);



        // STEP 3: Total book count

        const totalBooks = books.length;
        console.log(totalBooks);



        // STEP 4: Total category count

        const totalCategories = Object.keys(categoryCount);
        console.log(totalCategories);



        // STEP 5: Update summary cards






        // STEP 6: Category colours

        const colors = [
            "#6366f1",
            "#22c55e",
            "#f97316",
            "#ec4899",
            "#06b6d4",
            "#a855f7"
        ];


        // STEP 7: Generate percentage bars

        const categoryContainer =
            document.getElementById("categoryContainer");

        Object.entries(categoryCount).forEach(
            ([category, count], index) => {
                console.log(category, count);


                const percentage = (count / totalBooks) * 100;

                const categoryElement = document.createElement("div");

                categoryElement.className = "category";

                categoryElement.innerHTML = `

                    <div class="category-info">

                        <span class="category-name">
                            ${category}
                        </span>

                        <span class="category-count">
                            ${count} books
                        </span>

                    </div>

                    <div class="progress">

                        <div
                            class="bar"
                            data-width="${percentage}"
                            style="background-color: ${colors[index % colors.length]}"
                        ></div>

                    </div>

                    <p class="percentage">
                        ${percentage.toFixed(1)}%
                    </p>

                `;

                categoryContainer.appendChild(categoryElement);

            }
        );


        // STEP 8: Animate progress bars



        document.querySelectorAll(".bar").forEach(bar => {

            bar.style.width = bar.dataset.width + "%";

        });




let logHistory=document.querySelector('.table-container table tbody')
issuebooks.forEach((data) => {
    logHistory.innerHTML +=`<tr><td>${data.issueId}</td><td>${data.issueBook}</td><td>${data.issueMember}</td><td>${data.issueDate}</td><td>${data.dueDate}</td></tr>`
})

