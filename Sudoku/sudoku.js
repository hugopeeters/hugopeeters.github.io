class Sudoku {

    constructor() {
        this.solution = [
            [1, 3, 6, 2, 5, 4, 8, 9, 7],
            [7, 4, 2, 8, 6, 9, 5, 1, 3],
            [8, 5, 9, 3, 1, 7, 6, 4, 2],
            [6, 2, 7, 4, 9, 3, 1, 8, 5],
            [5, 1, 3, 6, 2, 8, 4, 7, 9],
            [9, 8, 4, 5, 7, 1, 2, 3, 6],
            [4, 6, 1, 7, 3, 5, 9, 2, 8],
            [3, 9, 5, 1, 8, 2, 7, 6, 4],
            [2, 7, 8, 9, 4, 6, 3, 5, 1]
        ];
        this.data = [
            [0, 3, 6, 2, 5, 4, 0, 0, 7],
            [7, 4, 0, 8, 0, 0, 0, 1, 0],
            [0, 0, 9, 3, 0, 0, 0, 0, 2],
            [6, 0, 0, 4, 9, 0, 1, 8, 5],
            [5, 0, 0, 6, 0, 0, 4, 7, 9],
            [9, 8, 4, 0, 0, 0, 2, 3, 0],
            [0, 6, 1, 0, 3, 0, 0, 0, 0],
            [0, 0, 5, 0, 0, 2, 7, 6, 0],
            [0, 0, 0, 0, 4, 0, 3, 5, 0]
        ];

        this.cells = new Array(sudokuSize);
        for (let y = 0; y < sudokuSize; y++) {
            this.cells[y] = new Array(sudokuSize);
            for (let x = 0; x < sudokuSize; x++) {
                this.cells[y][x] = new Cell(this.data[y][x], x, y);
            }
        }
    }

    render() {

        // draw 9x9 cells
        for (let y = 0; y < sudokuSize; y++) {
            for (let x = 0; x < sudokuSize; x++) {
                
                // draw the cells
                this.cells[y][x].renderCell();

                // draw the cell values
                this.cells[y][x].renderValue();
            }
        }

        // draw 3x3 squares with thicker lines 
        noFill();
        stroke(0);
        strokeWeight(3);
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                rect(cellSize * 3 * x, cellSize * 3 * y, 3 * cellSize, 3 * cellSize);
            }
        }
    }

    setCell(y, x, val) {

        // make sure you cannot change the values that are already filled in
        if(this.data[y][x] == 0) {
            this.cells[y][x].set(val);
        }
    }
}