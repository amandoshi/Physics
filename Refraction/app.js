function setup() {
	createCanvas(600, 600);

	stroke(255);
	fill(255);
	textAlign(CENTER);
	textSize(16);

	mediaBoundary = new Boundary(0, height / 2, width, height / 2, 1.5, 1);
	lightSource = new Particle(width / 2, height / 8, 8);

	// refractive index slider
	n1Slider = createSlider(1, 3, 1, 0.05);
	n2Slider = createSlider(1, 3, 1.5, 0.05);
}

function draw() {
	background(0);

	// update refractive index
	mediaBoundary.n1 = n1Slider.value();
	mediaBoundary.n2 = n2Slider.value();

	// display refractive index [from/to]
	push();
	strokeWeight(0);
	let nFrom = `Refractive Index [from]: ${mediaBoundary.n1.toFixed(2)}`;
	let nTo = `Refractive Index [to]: ${mediaBoundary.n2.toFixed(2)}`;
	text(`${nFrom}\n${nTo}`, width / 2, 30);
	pop();

	mediaBoundary.draw();

	lightSource.draw();
	lightSource.drawLight(mediaBoundary);
}
