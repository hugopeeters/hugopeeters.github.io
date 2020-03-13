class Cell {

    constructor(value, x, y) {
        this.value = value;
        this.x = x;
        this.y = y;
    }

    renderCell() {

        if (highlight && selectedValue == this.value) {
            fill(100, 0, 0, 100);
        } else {
            noFill();
        }
        stroke(0);
        strokeWeight(1);
        rect(cellSize * this.x, cellSize * this.y, cellSize, cellSize);
    }

    renderValue() {
        let c = color(0, 0, 0);
        if (this.value != sudoku.solution[this.y][this.x] && revealMistakes) {
            c = color(255, 0, 0);
        }
        // draw known cell values
        fill(c);
        noStroke();
        textSize(cellSize / 2);
        textAlign(CENTER, CENTER);
        if (this.value != 0) {
            text(this.value, (0.5 + this.x) * cellSize, (0.5 + this.y) * cellSize);
        }
    }

    set(_val) {
        this.value = _val;
    }
}