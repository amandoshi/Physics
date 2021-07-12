let length = 400;
let sliderAngle;
let angle;
let angle_v;
let angle_a;
let g = 1;
let prevPoints = new Array();

function setup() {
	createCanvas(900, 500);

	stroke(255);
	strokeWeight(2);
	fill(255);
	textAlign(CENTER);
	textSize(16);

	slider = createSlider(PI / 16, PI / 2, PI / 4, 0.01);
}

function draw() {
	background(0);
	translate(width / 2, 50);

	ellipse(0, 0, 8, 8);

	// get angle
	if (sliderAngle != slider.value()) {
		angle = slider.value();
		sliderAngle = angle;
		angle_v = 0;
	}

	// display angle
	push();
	strokeWeight(0);
	text(`Angle: ${Math.round((sliderAngle / PI) * 180)} Degrees`, 0, -15);
	pop();

	// calculate angular acceleration
	angle_a = -(g / length) * sin(angle);

	// calculate new co-ordiantes
	angle_v += angle_a;
	angle += angle_v;

	let x = length * sin(angle);
	let y = length * cos(angle);

	prevPoints.unshift(createVector(x, y));
	if (prevPoints.length > 40) {
		prevPoints.pop();
	}

	// draw pendulum trail
	push();
	for (let i = 0, n = 240; i < prevPoints.length - 1; i++, n -= 4) {
		stroke(n);
		line(
			prevPoints[i].x,
			prevPoints[i].y,
			prevPoints[i + 1].x,
			prevPoints[i + 1].y
		);
	}
	pop();

	// draw pendulum
	line(0, 0, x, y);
	ellipse(x, y, 25, 25);
}
