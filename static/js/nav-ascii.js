(function () {
	const CHARS = '!<>-_\/[]{}—=+*^?#________0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	function scramble(element, finalText, duration = 800) {
		const start = performance.now();
		const from = element.textContent;
		const length = Math.max(from.length, finalText.length);
		function frame(now) {
			const t = Math.min(1, (now - start) / duration);
			let out = '';
			for (let i = 0; i < length; i++) {
				if (i < Math.floor(t * length)) {
					out += finalText[i] || ' ';
				} else {
					out += CHARS[Math.floor(Math.random() * CHARS.length)];
				}
			}
			element.textContent = out;
			if (t < 1) requestAnimationFrame(frame);
		}
		requestAnimationFrame(frame);
	}

	function idleTicker(links) {
		let idx = 0;
		function tick() {
			const el = links[idx % links.length];
			const text = el.getAttribute('data-text') || el.textContent;
			scramble(el, text, 900);
			idx++;
			setTimeout(tick, 1700);
		}
		setTimeout(tick, 1200);
	}

	document.addEventListener('DOMContentLoaded', () => {
		const links = Array.from(document.querySelectorAll('.ascii-link'));
		links.forEach((el) => {
			el.setAttribute('data-text', el.textContent);
			el.addEventListener('mouseenter', () => scramble(el, el.getAttribute('data-text'), 500));
			el.addEventListener('focus', () => scramble(el, el.getAttribute('data-text'), 500));
		});
		idleTicker(links);
	});
})();


