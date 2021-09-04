class Ball {
	constructor(posX, posY, color) {
		// coord
		this.x = posX;
		this.y = posY;

		// size
		this.r = 30;

		// vectors
		this.v = 0;
		this.a = 0.5;

		// color
		this.color = color;

		// dead
		this.dead = false;
		this.audioDead = false;
	}

	draw() {
		push();

		fill(this.color[0], this.color[1], this.color[2]);
		ellipse(this.x, this.y, this.r);

		pop();
	}

	update() {
		if (this.dead) {
			return;
		}

		// check collision with floor
		if (this.y + this.r / 2 > height) {
			if (abs(this.v) < 0.3) {
				// stop ball
				this.dead = true;
			} else {
				// bounce
				this.y = height - this.r / 2;
				this.v = -abs(this.v) * 0.9;

				// play sound
				if (!this.audioDead) {
					audio.cloneNode(true).play();
				}
			}

			// end audio
			if (abs(this.v) < 2) {
				this.audioDead = true;
			}
		}

		// update ball position
		this.v += this.a;
		this.y += this.v;
	}
}
