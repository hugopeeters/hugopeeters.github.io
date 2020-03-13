class Cell {

    constructor(value, x, y) {
        this.value = value;
        this.x = x;
        this.y = y;
    }

    renderCell() {

        noFill();
        if (highlight &&
            selectedValue != 0 &&
            (
                this.isPresentHorizontal(selectedValue) || 
                this.isPresentVertical(selectedValue) || 
                this.isPresent9(selectedValue) ||
                this.value != 0
            )
        ) {
            //highlight columns, rows, already filled cells and 3x3's
            fill(100, 0, 0, 50);
        }
        if (highlight &&
            selectedValue != 0 &&
            selectedValue == this.value
        ) {
            //highlight cells themselves
            fill(255, 0, 0);
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

    isPresentHorizontal(val) {
        let found = false;
        for (let i = 0; i < sudokuSize; i++) {
            if (sudoku.cells[this.y][i].value == val) {
                found = true;
            }
        }
        return found;
    }

    isPresentVertical(val) {
        let found = false;
        for (let i = 0; i < sudokuSize; i++) {
            if (sudoku.cells[i][this.x].value == val) {
                found = true;
            }
        }
        return found;
    }

    isPresent9(val) {
        let found = false;
        let x9 = floor(this.x / 3);
        let y9 = floor(this.y / 3);
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                if (sudoku.cells[3 * y9 + j][3 * x9 + i].value == val) {
                    found = true;
                }
            }
        }
        return found;
    }
}