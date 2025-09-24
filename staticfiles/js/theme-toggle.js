(function(){
	function getStoredTheme(){
		try { return localStorage.getItem('theme'); } catch(e) { return null; }
	}
	function storeTheme(value){
		try { localStorage.setItem('theme', value); } catch(e) {}
	}
	function getCurrentTheme(){
		var t = document.documentElement.dataset.theme;
		return t === 'light' ? 'light' : 'dark';
	}
	function applyTheme(next){
		document.documentElement.dataset.theme = next;
		storeTheme(next);
	}

	function toggleTheme(){
		var current = getCurrentTheme();
		var next = current === 'dark' ? 'light' : 'dark';
		var btn = document.getElementById('theme-toggle');
		if (btn) {
			btn.classList.add('theme-animating');
			setTimeout(function(){ btn.classList.remove('theme-animating'); }, 350);
		}
		applyTheme(next);
	}

	document.addEventListener('DOMContentLoaded', function(){
		var initial = getStoredTheme();
		if (initial === 'light' || initial === 'dark') {
			applyTheme(initial);
		}
		var btn = document.getElementById('theme-toggle');
		if (btn) btn.addEventListener('click', toggleTheme);
	});
})();


