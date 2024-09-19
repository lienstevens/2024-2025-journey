import { setCookie, getCookie } from './cookies.js';

const listenToFormInput = function () {
    document.querySelector('form').addEventListener('input', function (e) {
        const mijnFormData = new FormData(e.target.form);
        const data = Object.fromEntries(mijnFormData.entries());
        console.log(data);
        setCookie('contactForm', JSON.stringify(data), 1); // Cookie 1 dag geldig
    });
}


const init = function () {
    listenToFormInput();
    const savedData = getCookie('contactForm');
    if (savedData) {
        const data = JSON.parse(savedData);
        console.log(data);
        for (let key in data) {
            const input = document.querySelector(`[name=${key}]`);
            if (input) {
                // Alleen als het invoerveld bestaat, gaan we verder
                input.value = data[key];
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', init);