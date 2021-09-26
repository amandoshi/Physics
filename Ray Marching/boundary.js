class Boundary {
	constructor(x, y, size) {
		this.position = createVector(x, y);
		this.size = size;
		this.constrain();
	}

	get maxX() {}
	get maxY() {}
	get minX() {}
	get maxY() {}

	constrain() {}
}

class Circle extends Boundary {
	constrain() {
		if (this.position.x + this.size > width) {
			this.position.x = width - this.size;
		} else if (this.position.x - this.size < 0) {
			this.position.x = this.size;
		}

		if (this.position.y + this.size > height) {
			this.position.y = height - this.size;
		} else if (this.position.y - this.size < 0) {
			this.position.y = this.size;
		}
	}

	draw() {
		push();
		stroke(0);
		fill(30);
		ellipse(this.position.x, this.position.y, 2 * this.size);
		pop();
	}
}

class Square extends Boundary {
	get maxX() {
		return this.position.x + this.size;
	}

	get maxY() {
		return this.position.y + this.size;
	}

	get minX() {
		return this.position.x;
	}

	get minY() {
		return this.position.y;
	}

	draw() {
		push();
		stroke(0);
		fill(20);
		rect(this.position.x, this.position.y, this.size);
		pop();
	}

	constrain() {
		// x coordinate
		if (this.position.x + this.size > width) {
			this.position.x = width - this.size;
		} else if (this.position.x < 0) {
			this.position.x = 0;
		}

		// y coordinate
		if (this.position.y + this.size > height) {
			this.position.y = height - this.size;
		} else if (this.position.y < 0) {
			this.position.y = 0;
		}
	}
}
