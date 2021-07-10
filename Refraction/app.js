function setup() {
	createCanvas(600, 600);
	stroke(255);
	fill(255);

	mediaBoundary = new Boundary(0, height / 2, width, height / 2, 1.5, 1);
	lightSource = new Particle(width / 2, height / 8, 8);
}

function draw() {
	background(0);

	mediaBoundary.draw();

	lightSource.draw();
	lightSource.drawLight(mediaBoundary);
}
