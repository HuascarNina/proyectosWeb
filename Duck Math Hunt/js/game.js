
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var n, m, o, res, perm;
var xc, yc, cr;
var calculado = 0;
var score = parseInt(localStorage.getItem("score") || 0);
const CIRCLE_RADIUS = 10;
var operation = localStorage.getItem('operation')|| "a";
var timeLeft = 10;
var fondo = document.getElementById("back");

setInterval(function () {
	timeLeft--;
}, 1000);

setTimeout(function () {
	final();
}, 10900);

// Definir la clase Circle
class Circle {
	constructor(x, y, radius) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.dx = Math.random() < 0.5 ? -0.2 : 0.2;
		this.dx += score * 0.001;
		this.dy = 0.2 + score * 0.001;
	}
	draw(ctx, color) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = color;
		ctx.fill();
	}

	update() {
		// Actualizar la posición del círculo en diagonal
		this.x += this.dx;
		this.y += this.dy;
		// Cambiar la dirección si el círculo choca con los bordes del canvas
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > canvas.height * 0.85 || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
	}
}

// Definir la clase Number
class Number {
	constructor(circle) {
		this.circle = circle;
		this.value = Math.floor(Math.random() * 9) + 1;
		this.x = circle.x;
		this.y = circle.y;
		this.radius = circle.radius / 2;
		this.dx = circle.dx;
		this.dy = circle.dy;
	}

	draw(ctx) {
		ctx.font = 'bold 14px sans-serif';
		ctx.fillStyle = '#002422';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(this.value, this.x, this.y);
	}

	update() {
		// Actualizar la posición del número junto con el círculo
		this.x = this.circle.x;
		this.y = this.circle.y;
	}
}
function updateScore() {
	score += 100;
	localStorage.setItem("score", score);
	console.log(localStorage.getItem("score"));
}
function clearScore() {
	localStorage.removeItem("score");
}
function getRandomX(range) {
	const minX = CIRCLE_RADIUS;
	const maxX = canvas.width - CIRCLE_RADIUS * 2;
	let x;
	if (range === 1) {
		x = Math.floor(Math.random() * ((maxX / 3) - minX + 1)) + minX;
	} else if (range === 2) {
		x = Math.floor(Math.random() * (((maxX / 3) * 2) - (maxX / 3) + 1)) + (maxX / 3);
	} else if (range === 3) {
		x = Math.floor(Math.random() * (maxX - ((maxX / 3) * 2) + 1)) + ((maxX / 3) * 2);
	} else {
		return null;
	}

	return x;
}
function getMousePos(canvas, event) {
	const rect = canvas.getBoundingClientRect();
	const scaleX = canvas.width / rect.width;
	const scaleY = canvas.height / rect.height;
	const x = (event.clientX - rect.left) * scaleX;
	const y = (event.clientY - rect.top) * scaleY;
	return { x, y };
}
function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Actualizar y dibujar los círculos y los números
	drawCircle();
	requestAnimationFrame(loop);
}
function drawCircle() {
	drawRes(timeLeft, 30, canvas.height - 15);
	drawRes(res, 30, 20);
	drawRes(score, canvas.width - 50, canvas.height - 15);
	for (i = circles.length - 1; i >= 0; i--) {
		circles[i].update();
		circles[i].draw(ctx, colors[i]);
		numbers[i].update();
		numbers[i].draw(ctx);
	}
}
function drawRes(v, x, y) {
	ctx.font = 'bold 33px sans-serif';
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(v, x, y);
}

function start() {
	perm = Math.floor(Math.random() * 3);
	if (perm == 0) {
		n = numbers[0].value;
		m = numbers[1].value;
		o = numbers[2];
	} else {
		if (perm == 1) {
			n = numbers[0].value;
			m = numbers[2].value;
			o = numbers[1];
		} else {
			n = numbers[2].value;
			m = numbers[1].value;
			o = numbers[0];
		}
	}
	if (operation == 'a') {
		operation = operaciones[Math.floor(Math.random() * 3)];
	}
	if (operation == 's') {
		res = n + m;
		fondo.src = "../imagenes/mas.jpeg";
	} else {
		if (operation == 'r') {
			if (n > m) {
				res = n - m;
				if(o.value-n==res){o.value--;}else{if(m-o.value==res){o.value++;}}
			} else {
				res = m - n;
				if(o.value-m==res){o.value--;}else{if(n-o.value==res){o.value++;}}
			}
			fondo.src = "../imagenes/menos1.jpg";
		} else {
			if (operation == 'm') {
				res = n * m;
				fondo.src = "../imagenes/por.jpg";
			}
		}
	}
}
//Game Over
function final() {
	window.location.href='../paginas/final.html';
}
// Crear los círculos
var circles = [
	new Circle(getRandomX(1), canvas.height * 0.85 - CIRCLE_RADIUS, CIRCLE_RADIUS),
	new Circle(getRandomX(2), canvas.height * 0.85 - CIRCLE_RADIUS, CIRCLE_RADIUS),
	new Circle(getRandomX(3), canvas.height * 0.85 - CIRCLE_RADIUS, CIRCLE_RADIUS),
];

var colors = ['#F41E1E', '#F4F41E', '#24F41E'];

var operaciones = ['s', 'r', 'm'];

var numbers = [];
circles.forEach(circle => {
	numbers.push(new Number(circle));
});

canvas.addEventListener('click', function (event) {
	const mousePos = getMousePos(canvas, event);

	for (let i = 0; i < circles.length; i++) {
		const circle = circles[i];
		const number = numbers[i];
		const dx = circle.x + score * 0.001 - mousePos.x;
		const dy = circle.y + score * 0.001 - mousePos.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < circle.radius) {
			if (number.value == n) {
				n = 0;
			} else {
				if (number.value == m) {
					m = 0;
				}
			}
			// Eliminar el círculo y su número correspondiente
			circles.splice(i, 1);
			numbers.splice(i, 1);
			colors.splice(i, 1);
			if (n == 0 && m == 0) {
				location.reload();
				updateScore();
			} else {
				if (circles.length == 1 || circles.length == 0) {
					final();
				}
			}
		}
	}
});

// Empezar la animación
start();
loop();