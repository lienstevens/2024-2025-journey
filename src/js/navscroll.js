const navScroll = function() {
    const nav = document.querySelector('.js-nav-container');
    const navHeight = nav.clientHeight;

    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        
        if(scrollPosition > navHeight) {
            nav.classList.add("c-nav--active");
        } else {                    
            nav.classList.remove("c-nav--active");
        }
    });
};

const init = function() {
    navScroll();
};

document.addEventListener("DOMContentLoaded", init);
