// calculation variables
const r1 = 200;
const r2 = 200;
const m1 = 20;
const m2 = 20;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let a1_a = 0;
let a2_a = 0;
const g = 1;

// trail arrays
let prevPoints1 = new Array();
let prevPoints2 = new Array();

function setup() {
	createCanvas(1000, 700);
	stroke(255);

	a1 = PI / 2;
	a2 = PI / 2;
}

function draw() {
	background(0);
	translate(width / 2, 250);

	// https://www.myphysicslab.com/pendulum/double-pendulum-en.html
	// calculate angular acceleration 1
	const numerator1 =
		-g * (2 * m1 + m2) * sin(a1) -
		m2 * g * sin(a1 - 2 * a2) -
		2 * sin(a1 - a2) * m2 * (a2_v ** 2 * r2 + a1_v ** 2 * r1 * cos(a1 - a2));
	const denominator1 = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
	a1_a = numerator1 / denominator1;

	// calculate angular acceleration 2
	const numerator2 =
		2 *
		sin(a1 - a2) *
		(a1_v ** 2 * r1 * (m1 + m2) +
			g * (m1 + m2) * cos(a1) +
			a2_v ** 2 * r2 * m2 * cos(a1 - a2));
	const denominator2 = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
	a2_a = numerator2 / denominator2;

	// calculate new angles
	a1_v += a1_a;
	a2_v += a2_a;

	a1 += a1_v;
	a2 += a2_v;

	// calculate pendulum 1 co-ordinates
	let x1 = r1 * sin(a1);
	let y1 = r1 * cos(a1);

	// calculate pendulum 2 co-ordinates
	let x2 = r2 * sin(a2);
	let y2 = r2 * cos(a2);

	// draw trail 1
	prevPoints1.unshift(createVector(x1, y1));
	if (prevPoints1.length > 40) {
		prevPoints1.pop();
	}

	push();
	for (
		let i = prevPoints1.length - 1, r = 240 - prevPoints1.length * 4;
		i > 1;
		i--, r += 4
	) {
		stroke(r, 0, 0);
		line(
			prevPoints1[i].x,
			prevPoints1[i].y,
			prevPoints1[i - 1].x,
			prevPoints1[i - 1].y
		);
	}

	// draw trail 2
	prevPoints2.unshift(createVector(x1 + x2, y1 + y2));
	if (prevPoints2.length > 450) {
		prevPoints2.pop();
	}
	pop();

	push();
	for (
		let i = prevPoints2.length - 1, gb = 240 - prevPoints2.length * 0.5;
		i > 1;
		i--, gb += 0.5
	) {
		stroke(0, gb, gb);
		line(
			prevPoints2[i].x,
			prevPoints2[i].y,
			prevPoints2[i - 1].x,
			prevPoints2[i - 1].y
		);
	}
	pop();

	// draw pendulum 1
	line(0, 0, x1, y1);
	ellipse(x1, y1, 25, 25);

	// draw pendulum 2
	line(x1, y1, x1 + x2, y1 + y2);
	ellipse(x1 + x2, y1 + y2, 25, 25);

	// draw circle at (translated) origin
	ellipse(0, 0, 8, 8);
}
