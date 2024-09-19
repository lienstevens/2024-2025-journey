import { eraseCookie } from './cookies.js';
import animationData from './submitanimation.json';
import * as lottie from 'lottie-web';

const validateForm = function () {
    const form = document.querySelector('.js-validate');
    const submitBtn = document.querySelector('.js-submit-btn');
    const submitAnimation = document.querySelector('.js-submit-animation');
    let animation = lottie.loadAnimation({
        container: submitAnimation,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: animationData
    });

    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (form.checkValidity()) {
            eraseCookie('contactForm');
            submitAnimation.classList.remove('u-hide');
            form.classList.add('u-hide');
            animation.play();
        }

        form.classList.add('was-validated');
    });
}
const init = function () {
    validateForm();
};

document.addEventListener("DOMContentLoaded", init);
