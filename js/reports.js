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

const distinctTitles = new Set(books.map(book => book.bookTitle)).size;
bookTitle.textContent = distinctTitles;


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

document.getElementById("exportReport").addEventListener("click", () => {
    const escapeCsvCell = (value) => {
        let text = String(value ?? "");
        if (/^[\t\r ]*[=+\-@]/.test(text)) {
            text = `'${text}`;
        }
        return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = [
        ["Library Management System - Report"],
        ["Generated on", new Date().toLocaleString()],
        [],
        ["Summary"],
        ["Metric", "Value"],
        ["Distinct Book Titles", distinctTitles],
        ["Available Copies in Stock", total],
        ["Active Issued Books", issuebooks.length],
        ["Registered Members", user.length],
        [],
        ["Category-wise Count"],
        ["Category", "Book Records", "Percentage"]
    ];

    Object.entries(categoryCount).forEach(([category, count]) => {
        rows.push([category, count, `${((count / totalBooks) * 100).toFixed(1)}%`]);
    });

    rows.push(
        [],
        ["Full Lending History"],
        ["Issue ID", "Book Title", "Member", "Issue Date", "Due Date"]
    );
    issuebooks.forEach((issue) => {
        rows.push([
            issue.issueId,
            issue.issueBook,
            issue.issueMember,
            issue.issueDate,
            issue.dueDate
        ]);
    });

    const csv = "\uFEFF" + rows.map(row => row.map(escapeCsvCell).join(",")).join("\r\n");
    const downloadUrl = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = "library-report.csv";
    downloadLink.click();
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
});

document.getElementById("viewPdfReport").addEventListener("click", () => {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) {
        console.error("Unable to create the report PDF because jsPDF did not load.");
        window.alert("The PDF could not be created. Please check your internet connection and try again.");
        return;
    }

    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 14;
    const bottomLimit = pageHeight - 18;
    let y = 18;

    const addSectionTitle = (title) => {
        if (y + 12 > bottomLimit) {
            pdf.addPage();
            y = 18;
        }
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(13);
        pdf.text(title, margin, y);
        y += 7;
    };

    const addTable = (headers, rows, columnWidths) => {
        const rowHeight = (values) => {
            const lineCount = values.reduce((max, value, index) => {
                const lines = pdf.splitTextToSize(
                    String(value ?? "-"),
                    columnWidths[index] - 4
                );
                return Math.max(max, lines.length);
            }, 1);
            return Math.max(8, lineCount * 4.5 + 3);
        };

        const drawHeader = () => {
            const height = 9;
            pdf.setFillColor(30, 64, 99);
            pdf.rect(margin, y, columnWidths.reduce((sum, width) => sum + width, 0), height, "F");
            pdf.setTextColor(255, 255, 255);
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(8);
            let x = margin;
            headers.forEach((header, index) => {
                pdf.text(String(header), x + 2, y + 6);
                x += columnWidths[index];
            });
            pdf.setTextColor(31, 41, 55);
            y += height;
        };

        drawHeader();
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        rows.forEach((row) => {
            const height = rowHeight(row);
            if (y + height > bottomLimit) {
                pdf.addPage();
                y = 18;
                drawHeader();
            }

            let x = margin;
            row.forEach((value, index) => {
                pdf.rect(x, y, columnWidths[index], height);
                const lines = pdf.splitTextToSize(
                    String(value ?? "-"),
                    columnWidths[index] - 4
                );
                pdf.text(lines, x + 2, y + 4.5);
                x += columnWidths[index];
            });
            y += height;
        });
        y += 7;
    };

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Library Management System - Report", margin, y);
    y += 8;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text(`Generated on ${new Date().toLocaleString()}`, margin, y);
    y += 10;

    addSectionTitle("Summary");
    addTable(
        ["Metric", "Value"],
        [
            ["Distinct Book Titles", distinctTitles],
            ["Available Copies in Stock", total],
            ["Active Issued Books", issuebooks.length],
            ["Registered Members", user.length],
        ],
        [100, 82]
    );

    addSectionTitle("Category-wise Count");
    const categoryRows = Object.entries(categoryCount).map(([category, count]) => [
        category,
        count,
        `${((count / totalBooks) * 100).toFixed(1)}%`,
    ]);
    addTable(["Category", "Book Records", "Percentage"], categoryRows, [76, 56, 50]);

    addSectionTitle("Full Lending History");
    const historyRows = issuebooks.map((issue) => [
        issue.issueId,
        issue.issueBook,
        issue.issueMember,
        issue.issueDate,
        issue.dueDate,
    ]);
    addTable(
        ["Issue ID", "Book Title", "Member", "Issue Date", "Due Date"],
        historyRows,
        [24, 48, 42, 34, 34]
    );

    const pageCount = pdf.internal.getNumberOfPages();
    for (let page = 1; page <= pageCount; page += 1) {
        pdf.setPage(page);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Page ${page} of ${pageCount}`, pageWidth - margin, pageHeight - 8, {
            align: "right",
        });
    }

    const pdfUrl = URL.createObjectURL(pdf.output("blob"));
    window.open(pdfUrl, "_blank");

    const downloadLink = document.createElement("a");
    downloadLink.href = pdfUrl;
    downloadLink.download = "library-report.pdf";
    downloadLink.click();
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000);
});
