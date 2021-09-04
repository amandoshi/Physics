// let ball;
let balls = new Array();

function setup() {
	createCanvas(400, 600);

	// define ball
	balls.push(new Ball(width / 2, height / 2, [255, 255, 255]));
	balls.push(new Ball(width / 2 - 90, height / 2 - 100, [255, 0, 0]));
	balls.push(new Ball(width / 2 + 90, height / 2 - 250, [0, 255, 0]));
	balls.push(new Ball(width / 2 + 170, height / 2 + 30, [0, 0, 255]));
	balls.push(new Ball(width / 2 - 170, height / 2 - 200, [0, 255, 255]));
}

function draw() {
	background(0);

	for (const ball of balls) {
		//draw
		ball.draw();

		// update
		ball.update();
	}
}
