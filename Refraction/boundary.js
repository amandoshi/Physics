class Boundary {
	constructor(x1, y1, x2, y2, n1, n2) {
		// coordinates
		this.start = createVector(x1, y1);
		this.end = createVector(x2, y2);

		// refractive index (from, to)
		this.n1 = n1;
		this.n2 = n2;
	}

	draw() {
		push();
		strokeWeight(1);

		// draw boundary
		line(this.start.x, this.start.y, this.end.x, this.end.y);

		pop();
	}
}
