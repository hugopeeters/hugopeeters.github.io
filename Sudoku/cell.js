class Cell {

    constructor (value, x, y) {
        this.value = value;
        this.pos = createVector(x, y);
    }

    render() {
        // draw known cell values
        fill(0);
        noStroke();
        textSize(cellHeight / 2);
        textAlign(CENTER, CENTER);
        if (this.value != 0) {
            text(this.value, this.pos.x, this.pos.y);
        }
    }

    set(_val) {
        this.value = _val;
    }
}