let ball;
const gravity = 10;
let timeStep = 0.05;
let anchor;

function setup() {
	createCanvas(400, 600);
	ball = new Ball(width / 2, 100, width / 2, 50, 5, 10);
}

function draw() {
	// --------------------LOGIC--------------------
	ball.update(timeStep);

	// --------------------DRAW--------------------
	background(0);

	// spring
	push();
	stroke(255);
	line(ball.anchor.x, ball.anchor.y, ball.position.x, ball.position.y);
	pop();

	// anchor
	push();
	fill(255, 0, 0);
	stroke(0);
	ellipse(width / 2, 50, 10);
	pop();

	// ball
	ball.draw();
}
