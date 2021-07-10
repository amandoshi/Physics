class Ray {
  constructor(angle) {
    this.direction = p5.Vector.fromAngle(radians(angle), 1);
  }

  draw(walls, particle) {
    // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

    let minDistanceSquared = Infinity;
    let drawCoords;

    for (let i = 0; i < walls.length; i++) {
      // calculate intersection coords
      let wall = walls[i];

      const x1 = wall.start.x;
      const y1 = wall.start.y;
      const x2 = wall.end.x;
      const y2 = wall.end.y;

      const x3 = particle.x;
      const y3 = particle.y;
      const x4 = particle.x + this.direction.x;
      const y4 = particle.y + this.direction.y;

      const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (denominator == 0) {
        continue;
      }

      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
      const u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

      // check if ray collides with wall line segment
      if (t >= 0 && t <= 1 && u > 0) {
        stroke(255);
        let ptX = x1 + t * (x2 - x1);
        let ptY = y1 + t * (y2 - y1);

        // find shortest distance of ray to wall
        let distanceSquared = (x3 - ptX) ** 2 + (y3 - ptY) ** 2;
        if (distanceSquared < minDistanceSquared) {
          minDistanceSquared = distanceSquared;
          drawCoords = [x3, y3, ptX, ptY];
        }
      }
    }

    // draw ray
    if (minDistanceSquared < Infinity) {
      line(drawCoords[0], drawCoords[1], drawCoords[2], drawCoords[3]);
    }
  }
}
