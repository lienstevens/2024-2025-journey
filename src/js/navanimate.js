
let pos, wid, elActive, elLine, elNav;

const options = {
    threshold: 0.3
};

const callback = function (entries) {
    for (const el of entries) {
        if (el.isIntersecting) {
            const sectionId = el.target.dataset.navsection;
            const sectionNavItem = document.querySelector(".c-nav__link[href*=" + sectionId + "]").parentElement;
            animateLine(sectionNavItem);
        }
    }
}

const inViewport = new IntersectionObserver(callback, options);

const navHighlighter = function () {
    const sections = document.querySelectorAll(".js-section");

    for (const section of sections) {
        inViewport.observe(section);
    }
}

const showLine = function () {
    if (elActive) {
        pos = elActive.offsetLeft;
        wid = elActive.offsetWidth;
        elLine.style.left = pos + 'px';
        elLine.style.width = wid + 'px';
    }
}

const activeLink = function (elNav, el) {
    elNav.classList.remove('animate');
    el.classList.add('js-active');
    el.classList.add("c-nav__item--active");
}

const deactiveLink = function (elNav, el) {
    elNav.classList.add('animate');
    el.classList.remove('js-active');
    el.classList.remove('c-nav__item--active');
}

const animateLine = function (el) {
    const elNowActive = document.querySelector('.js-active');

    if (!el.classList.contains('js-active') && !elNav.classList.contains('animate')) {
        deactiveLink(elNav, elNowActive);

        const newPos = el.offsetLeft;
        const newWid = el.offsetWidth;
        const animateOptions = {
            duration: 300,
            iterations: 1,
            fill: 'forwards'
        };


        // naar rechts
        if (newPos >= pos) {
            // breedte aanpassen naar breedte van huidige item + einde van nieuwe item
            const keyframes = [
                {
                    width: ((newPos - pos) + newWid) + 'px'
                }
            ];
            elLine.animate(
                keyframes,
                animateOptions
                // nadat de breedte is aangepast, de positie aanpassen en breedte terugzetten
            ).addEventListener('finish', function () {
                const keyframes = [{
                    width: newWid + 'px',
                    left: newPos + 'px'
                }];

                elLine.animate(
                    keyframes,
                    animateOptions
                    // nadat de positie is aangepast, de actieve link aanpassen
                ).addEventListener('finish', function () {
                    activeLink(elNav, el);
                })
            });

            // naar links
        } else {
            const keyframes = [
                {
                    left: newPos + 'px',
                    width: ((pos - newPos) + wid) + 'px'
                }
            ];
            elLine.animate(
                keyframes,
                animateOptions
                // nadat de breedte en positie is aangepast, de breedte terugzetten
            ).addEventListener('finish', function () {
                const keyframes = [{
                    width: newWid + 'px'
                }];
                elLine.animate(
                    keyframes,
                    animateOptions
                    // nadat de breedte is aangepast, de actieve link aanpassen
                ).addEventListener('finish', function () {
                    activeLink(elNav, el);
                })
            });
        }
        // als de link al actief is, de positie en breedte aanpassen naar de nieuwe positie en breedte
        pos = newPos;
        wid = newWid;
    }
}

const listenToClick = function () {
    const elLinks = document.querySelectorAll('.js-link');

    if (elLinks) {
        for (const link of elLinks) {
            link.addEventListener('click', function () {
                animateLine(this);
            });
        }
    }
}

const init = function () {
    elNav = document.querySelector('.js-nav');
    elActive = document.querySelector('.js-active');
    elLine = document.querySelector('.js-line');
    showLine();
    listenToClick();
    navHighlighter();
}

document.addEventListener('DOMContentLoaded', init);

