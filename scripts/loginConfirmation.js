document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("loggedIn") != "true") {

        window.location.href = "../index.html";
    }
});