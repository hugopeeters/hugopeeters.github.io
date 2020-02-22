class Curve {

  constructor(basePos) {
    this.basePos = basePos;
    this.pos = this.basePos.copy();
    this.curvePoints = [];
  }

  update(x, y) {
    this.pos.x = this.basePos.x + x;
    this.pos.y = this.basePos.y + y;
    this.curvePoints.push(this.pos.copy());
    if (this.curvePoints.length > 250) {
      this.curvePoints.splice(0, 1);
    }
  }

  render() {
    stroke(255, 0, 0);
    noFill();
    beginShape();
    for (let pt of this.curvePoints) {
      vertex(pt.x, pt.y);
    }
    endShape();
  }
}