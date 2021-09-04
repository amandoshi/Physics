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
	}

	draw() {
		push();

		fill(this.color[0], this.color[1], this.color[2]);
		// fill(255);
		ellipse(this.x, this.y, this.r);

		pop();
	}

	update() {
		console.log(this.y - this.r);

		if (this.y + this.r / 2 > height) {
			this.y = height - this.r / 2;
			this.v = -abs(this.v) * 0.9;
		}
		this.v += this.a;
		this.y += this.v;
	}
}
