const callback = function (entries) {
	for (const el of entries) {
		if (el.isIntersecting) {
			el.target.classList.add('c-photos--animate');
		}
	}
}

const inViewport = new IntersectionObserver(callback);

const init = function () {
	const photosEl = document.querySelector('.js-photos');
	inViewport.observe(photosEl);
};

document.addEventListener('DOMContentLoaded', init);
