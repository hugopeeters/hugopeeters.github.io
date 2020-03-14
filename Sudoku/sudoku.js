class Sudoku {

    constructor() {
   
        this.solution = this.newSolution();
        this.data = this.createPuzzle();
        console.log(this.solution);     

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
        if (this.data[y][x] == 0) {
            this.cells[y][x].set(val);
        }
    }

    newSolution() {
        let newSudoku = new Array(sudokuSize);

        //fill first row randomly
        newSudoku[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        newSudoku[0] = shuffleArray(newSudoku[0]);

        //shift 3, 3, 1, 3, 3, 1, 3, 3
        newSudoku[1] = shiftArray(Array.from(newSudoku[0]), 3);
        newSudoku[2] = shiftArray(Array.from(newSudoku[1]), 3);
        newSudoku[3] = shiftArray(Array.from(newSudoku[2]), 1);
        newSudoku[4] = shiftArray(Array.from(newSudoku[3]), 3);
        newSudoku[5] = shiftArray(Array.from(newSudoku[4]), 3);
        newSudoku[6] = shiftArray(Array.from(newSudoku[5]), 1);
        newSudoku[7] = shiftArray(Array.from(newSudoku[6]), 3);
        newSudoku[8] = shiftArray(Array.from(newSudoku[7]), 3);
        return newSudoku;
    }

    createPuzzle() {
        let newPuzzle = new Array(sudokuSize);
        for (let y = 0; y < sudokuSize; y++) {
            newPuzzle[y] = Array.from(this.solution[y]);
            for (let x = 0; x < sudokuSize; x++) {
                if (random(1) < 0.55) {
                    newPuzzle[y][x] = 0;
                }
            }
        }
        return newPuzzle;
    }
}

// helper functions
function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function shiftArray(arr, p) {
    for (let n = 0; n < p; n++) {
        arr.push(arr.shift());
    }
    return arr;
}