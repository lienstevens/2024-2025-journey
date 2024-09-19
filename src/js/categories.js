const callback = function (entries) {
	for (const el of entries) {
		if (el.isIntersecting) {
			console.log(el.target, "is in beeld");
			el.target.classList.add('c-categories__animate');
		}
	}
}

const inViewport = new IntersectionObserver(callback);

const init = function () {
	const catEl = document.querySelector('.js-category');
	inViewport.observe(catEl);
};

document.addEventListener('DOMContentLoaded', init);
