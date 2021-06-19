var interval = null;
var width = 100;
var step = 1;

function startAnimation(durationSec) {
	ani = document.getElementById("animation")
	ani.innerHTML = '- follow -'
	ani.style.cursor = 'auto';
	width = 100;
	interval = setInterval(animate, 10, ani);
	setTimeout(stopAnimation, durationSec * 1000, ani);
}

function animate(ani) {
	if ((step > 0) && (width >= 300)) {
		step = -1;
	}
	if ((step < 0) && (width <= 100)) {
		step = 1;
	}
	width += step;
	console.log("W: "+width);
	ani.style.width = ""+width+"px";
}

function stopAnimation(ani) {
	clearInterval(interval);
	ani.innerHTML = 'START'
	ani.style.cursor = 'pointer';
}
