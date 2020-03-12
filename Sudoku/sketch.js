let cellWidth, cellHeight;
let sudoku;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(450, 450);
    canvas.parent('canvas');
    createP().parent('canvas');

    cellWidth = width / 9;
    cellHeight = height / 9;

    sudoku = new Sudoku();
}

function draw() {
    background(255);
    sudoku.render();
}