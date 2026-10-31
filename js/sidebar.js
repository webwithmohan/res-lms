
fetch("sidebar.html")
.then((response) => response.text())
.then((data) =>{
    let sidebar=document.getElementsByTagName("aside")[0]
    sidebar.innerHTML=data;
    const event=new Event("sidebarloaded");
    let cuttentPage=location.pathname.split("/").pop();
    let menuItems=document.querySelectorAll(".menu li");
    menuItems.forEach(item => {
       
       
        if(item.dataset.page==cuttentPage){
            item.classList.add('active')
        }
    })
    
    
    document.dispatchEvent(event)
}).catch((err) => {
    console.log(err)
})
let issue=JSON.parse(localStorage.getItem("issuebooks")) || []
  document.getElementById('issued-books').textContent=issue.length;



