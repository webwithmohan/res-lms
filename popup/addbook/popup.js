function loadPopup(){
    fetch("/popup/addbook/popup.html")
    .then(response => response.text())
    .then(data => {
        document.getElementsByClassName('overlay')[0].innerHTML=data
    })}

loadPopup()