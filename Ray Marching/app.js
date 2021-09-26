let balls = new Array();
let graphics;
const iterations = 5;
let ray;
let rotation = 0.001;
let shapes = new Array();

function setup() {
	createCanvas(800, 600);

	// secondary canvas
	graphics = createGraphics(800, 600);
	graphics.clear();

	// circles
	shapes.push(new Circle(150, 450, 80));
	shapes.push(new Circle(700, 500, 60));
	shapes.push(new Circle(580, 120, 80));

	// squares
	shapes.push(new Square(350, 450, 80));
	shapes.push(new Square(550, 250, 120));

	// ray
	ray = new Ray(50, 50);

	// normalise rotation rate
	rotation /= iterations;
}

function draw() {
	for (let i = 0; i < iterations; i++) {
		background(0);

		// -----------------------LOGIC-----------------------
		ray.rotate(rotation);
		if (ray.angle > PI / 2 || ray.angle < 0) {
			rotation *= -1;
			noLoop();
		}
		ellipse(ray.position.x, ray.position.y, 10);

		// -----------------------DRAW-----------------------
		for (const shape of shapes) {
			shape.draw();
		}
		ray.march(shapes);

		image(graphics, 0, 0);
	}
}

function signedDistanceToCircle(point, centre, radius) {
	return p5.Vector.dist(point, centre) - radius;
}

function signedDistanceToSquare(p, square) {
	const dx = Math.max(square.minX - p.x, 0, p.x - square.maxX);
	const dy = Math.max(square.minY - p.y, 0, p.y - square.maxY);

	return Math.sqrt(dx * dx + dy * dy);
}
