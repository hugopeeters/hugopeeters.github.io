class Grid {

    constructor() {
        this.cells = new Array(4 * numBars);
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = new Array(soundNames.length);
            for (let j = 0; j < this.cells[i].length; j++) {
                this.cells[i][j] = false;
            }
        }
        this.cellWidth = (width - leftMargin) / this.cells.length;
        this.cellHeight = height / soundNames.length;
        //console.log(this.cells);
    }

    draw() {

        //draw cells
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                let x = leftMargin + i * this.cellWidth;
                let y = j * this.cellHeight;
                if (this.cells[i][j]) {
                    fill(255, 0, 0);
                } else {
                    noFill();
                }
                stroke(255);
                rect(x, y, this.cellWidth, this.cellHeight);
            }
        }
        //draw labels
        for (let j = 0; j < this.cells[0].length; j++) {
            let x = 10;
            let y = (j + 0.6) * this.cellHeight;
            noStroke();
            fill(255);
            text(soundNames[j], x, y);
        }
    }

    toggle(col, row) {
        this.cells[col][row] = !this.cells[col][row];
    }

    play(_count) {
        let count = _count % (numBars * 4);
        for (let j = 0; j < this.cells[count].length; j++) {
            if (this.cells[count][j]) {
                playSound(soundNames[j]);
                console.log("playing " + soundNames[j]);
                
            }
        }
    }

}