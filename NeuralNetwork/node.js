class Node {

    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.r = r;
    }

    render() {
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

}