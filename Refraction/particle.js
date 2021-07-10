class Particle {
	constructor(x1, y1, size) {
		this.point = createVector(x1, y1);
		this.size = size;
	}

	draw() {
		// draw light source
		push();
		strokeWeight(3);
		ellipse(this.point.x, this.point.y, this.size, this.size);
		pop();
	}

	drawLight(boundary) {
		let { angle, direction } = this.getDirection();

		// https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
		const x1 = boundary.start.x;
		const y1 = boundary.start.y;
		const x2 = boundary.end.x;
		const y2 = boundary.end.y;

		const x3 = this.point.x;
		const y3 = this.point.y;
		const x4 = this.point.x + direction.x;
		const y4 = this.point.y + direction.y;

		const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (denominator == 0) {
			return;
		}

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
		const u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

		// check if ray intersects boundary line segment
		if (t >= 0 && t <= 1 && u > 0) {
			let ptX = x1 + t * (x2 - x1);
			let ptY = y1 + t * (y2 - y1);

			// draw incidence ray
			push();
			strokeWeight(3);
			line(this.point.x, this.point.y, ptX, ptY);
			pop();

			// draw refractive ray
			this.drawRefraction(boundary, angle, ptX, ptY);

			// draw circle at boundary
			push();
			stroke(235, 52, 140);
			ellipse(ptX, ptY, 5, 5);
			pop();
		}
	}

	getDirection() {
		// calculate direction to cusor from light source (using angles)
		let v0 = createVector(1, 0);
		let v1 = createVector(mouseX - this.point.x, mouseY - this.point.y);

		const angle = v0.angleBetween(v1);
		let direction = p5.Vector.fromAngle(angle, 1);

		return { angle, direction };
	}

	drawRefraction(boundary, angle, ptX, ptY) {
		angle = PI / 2 - angle;

		const n1 = boundary.n1;
		const n2 = boundary.n2;
		const angle1 = angle;

		// angle of refraction (Snell's Law)
		const angle2 = PI / 2 - Math.asin((n1 / n2) * Math.sin(angle1));

		// check for TIR (total internal reflection)
		if (!angle2) {
			// draw reflected ray
			push();
			stroke(52, 158, 235);
			strokeWeight(3);
			this.drawReflection(angle, ptX, ptY);
			pop();
		} else {
			// draw refracted ray
			push();
			stroke(52, 158, 235);
			strokeWeight(3);
			const refractedDirection = p5.Vector.fromAngle(angle2, width);
			line(ptX, ptY, ptX + refractedDirection.x, ptY + refractedDirection.y);
			pop();

			// draw reflected ray (partial)
			push();
			strokeWeight(1);
			this.drawReflection(angle, ptX, ptY);
			pop();
		}
	}

	drawReflection(angle, ptX, ptY) {
		const reflectedAngle = -(PI / 2 - angle);
		const reflectedDirection = p5.Vector.fromAngle(reflectedAngle, width);
		line(ptX, ptY, ptX + reflectedDirection.x, ptY + reflectedDirection.y);
	}
}
