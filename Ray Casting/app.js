let rays;
let walls;
let particle;

function setup() {
	createCanvas(600, 600);

	// wall coords
	let wallPositions = [
		[500, 100, 300, 500],
		[20, 20, 450, 300],
		[50, 60, 70, 380],
		[40, 200, 300, 400],
		[25, 550, 550, 450],
		[0, 0, 0, height],
		[0, 0, width, 0],
		[0, height, width, height],
		[width, 0, width, height],
	];

	// create walls
	walls = new Array();
	for (let i = 0; i < wallPositions.length; i++) {
		console.log(wallPositions[i]);
		walls.push(
			new Boundary(
				wallPositions[i][0],
				wallPositions[i][1],
				wallPositions[i][2],
				wallPositions[i][3]
			)
		);
	}

	// create rays
	rays = new Array();
	for (let angle = 0; angle < 360; angle += 3) {
		rays.push(new Ray(angle));
	}

	// create particle
	particle = new Particle(width / 2, height / 2);
}

function draw() {
	background("black");

	// draw white walls
	stroke(66, 135, 245);
	for (let i = 0; i < walls.length; i++) {
		walls[i].draw();
	}

	// bind light particle to mouse
	particle.setPos(mouseX, mouseY);

	// cast rays
	stroke(255);
	for (let i = 0; i < rays.length; i++) {
		rays[i].draw(walls, particle);
	}

	particle.draw();
}
