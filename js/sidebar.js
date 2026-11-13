
fetch("sidebar.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Sidebar request failed with status ${response.status}`);
    }
    return response.text();
  })
  .then((data) => {
    const sidebar = document.querySelector("aside");
    const sidebarContent = new DOMParser()
      .parseFromString(data, "text/html")
      .querySelector(".sidebar-content");

    if (!sidebar || !sidebarContent) {
      throw new Error("Sidebar container or sidebar content was not found");
    }

    sidebar.innerHTML = sidebarContent.innerHTML;
    const currentPage = location.pathname.split("/").pop();
    const menuItems = document.querySelectorAll(".menu li[data-page]");

    menuItems.forEach((item) => {
      if (item.dataset.page === currentPage) {
        item.classList.add("active");
      }
    });

    document.dispatchEvent(new Event("sidebarloaded"));
  })
  .catch((error) => {
    console.error("Unable to load the sidebar:", error);
  });

const issueCount = document.getElementById("issued-books");
if (issueCount) {
  const issues = JSON.parse(localStorage.getItem("issuebooks")) || [];
  issueCount.textContent = issues.length;
}



