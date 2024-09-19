let body, toggle;

const saveToLocalStorage = function () {
    const colorScheme = toggle.checked ? "dark" : "light";
    localStorage.setItem("darkmode", colorScheme);
}

const toggleDarkmode = function () {
    body.classList.toggle("o-darkmode");
    saveToLocalStorage();
}

const listenToggle = function () {
    toggle.addEventListener('change', toggleDarkmode);
}
const init = function () {
    body = document.body;
    toggle = document.querySelector(".js-toggle");
    
    if (localStorage.getItem("darkmode")) {
        if (localStorage.getItem("darkmode") == "dark") {
            toggle.checked = true;
            toggleDarkmode();
        }
    } else if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
        toggle.checked = true;
        toggleDarkmode();
    }

    listenToggle();
};

document.addEventListener("DOMContentLoaded", init);