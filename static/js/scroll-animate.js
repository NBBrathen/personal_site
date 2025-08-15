(() => {
	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				entry.target.classList.add('reveal');
				observer.unobserve(entry.target);
			}
		}
	}, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

	document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
})();

