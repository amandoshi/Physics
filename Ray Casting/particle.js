class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	setPos(x, y) {
		this.x = x;
		this.y = y;
	}

	draw() {
		fill(237, 231, 194);
		ellipse(this.x, this.y, 10, 10);
	}
}
