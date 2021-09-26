class Ray {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.angle = 0;
	}

	march(shapes) {
		let currentPosition = this.position.copy();

		while (true) {
			let minDistance = Infinity;
			for (const shape of shapes) {
				let distance;
				if (shape instanceof Circle) {
					distance = signedDistanceToCircle(
						currentPosition,
						shape.position,
						shape.size
					);
				} else if (shape instanceof Square) {
					distance = signedDistanceToSquare(currentPosition, shape);
				}

				if (distance < minDistance) {
					minDistance = distance;
				}
			}

			if (minDistance < 0.01) {
				push();
				fill(255, 0, 0);
				stroke(0);
				ellipse(currentPosition.x, currentPosition.y, 5);
				pop();

				let direction = p5.Vector.fromAngle(this.angle);
				direction.mult(minDistance);
				currentPosition.add(direction);

				graphics.push();
				graphics.noFill();
				graphics.stroke(255);
				graphics.strokeWeight(1);
				graphics.ellipse(currentPosition.x, currentPosition.y, 0.1);
				graphics.pop();
				break;
			} else if (
				currentPosition.x < 0 ||
				currentPosition.x > width ||
				currentPosition.y < 0 ||
				currentPosition.y > height
			) {
				break;
			}

			// draw circle
			push();
			noFill();
			fill(255, 40);
			stroke(255, 120);
			ellipse(currentPosition.x, currentPosition.y, 2 * minDistance);
			pop();

			// translate to next position
			let direction = p5.Vector.fromAngle(this.angle);
			direction.mult(minDistance);

			push();
			stroke(255);
			line(
				currentPosition.x,
				currentPosition.y,
				currentPosition.x + direction.x,
				currentPosition.y + direction.y
			);
			pop();

			currentPosition.add(direction);
		}
	}

	rotate(angle) {
		this.angle += angle;
	}

	setPosition(x, y) {
		this.position.set(x, y);
	}
}
