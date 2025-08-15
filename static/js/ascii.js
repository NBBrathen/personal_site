(function () {
	const canvas = document.getElementById('ascii-canvas');
	if (!canvas) return;
	const ctx = canvas.getContext('2d');

	let width = 0;
	let height = 0;
	let cols = 0;
	let rows = 0;
	let cell = 16; // px cell size
	const chars = ['.', ':', '-', '+', '*', '#', '%', '@'];
	let t = 0;
	let last = 0;
	const SPEED = 100.8; // lower = slower

	function resize() {
		const ratio = window.devicePixelRatio || 1;
		width = canvas.clientWidth;
		height = canvas.clientHeight;
		canvas.width = Math.floor(width * ratio);
		canvas.height = Math.floor(height * ratio);
		ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
		ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace';
		ctx.textBaseline = 'top';
		cols = Math.ceil(width / cell);
		rows = Math.ceil(height / cell);
	}

	function noise(x, y, z) {
		// simple pseudo-noise based on sine blends
		const z1 = z * 0.006;
		const z2 = z * 0.004;
		const z3 = z * 0.008;
		return (
			Math.sin(x * 0.3 + z1) +
			Math.sin(y * 0.25 + z2) +
			Math.sin((x + y) * 0.12 + z3)
		) / 3;
	}

	function step(now) {
		if (!last) last = now;
		const dt = Math.min(0.1, (now - last) / 1000); // cap large jumps
		last = now;
		ctx.clearRect(0, 0, width, height);
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				const n = noise(x, y, t);
				const idx = Math.floor(((n + 1) / 2) * (chars.length - 1));
				const ch = chars[idx];
				const alpha = 0.15 + 0.35 * ((idx + 1) / chars.length);
				ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
				ctx.fillText(ch, x * cell, y * cell);
			}
		}
		// very slow flow
		t += dt * SPEED;
		requestAnimationFrame(step);
	}

	window.addEventListener('resize', resize);
	resize();
	requestAnimationFrame(step);
})();

