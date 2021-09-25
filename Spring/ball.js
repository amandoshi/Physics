class Ball {
	constructor(x, y, anchorX, anchorY, mass, radius) {
		this.anchor = createVector(anchorX, anchorY);
		this.force = createVector();
		this.mass = mass;
		this.position = createVector(x, y);
		this.radius = radius;
		this.velocity = createVector();
		this.weight = createVector(0, this.mass * gravity);
	}

	draw() {
		push();
		stroke(0);
		fill(255, 100);
		ellipse(this.position.x, this.position.y, 2 * this.radius);
		pop();
	}

	update(timeStep) {
		// tension
		const tension = p5.Vector.sub(this.anchor, this.position);
		const k = 0.25;
		const l = 50;
		const x = tension.mag() - l;
		tension.setMag(k * x);

		// resultant force
		this.force.mult(0);
		this.force.add(tension);
		this.force.add(this.weight);

		// acceleration
		const acceleration = this.force.copy();
		acceleration.div(this.mass);

		// velocity
		this.velocity.add(acceleration);
		const tempVelocity = this.velocity.copy();
		tempVelocity.setMag(this.velocity.mag() * timeStep);

		// position
		this.position.add(tempVelocity);
	}
}
