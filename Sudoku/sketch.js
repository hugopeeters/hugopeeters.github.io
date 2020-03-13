let cellSize;
let sudoku;
let btn, cbMistakes, cbHighlight;
let selectedValue = 0;
let revealMistakes = false;
let highlight = false;
let sudokuSize = 9;

function setup() {

    // create canvas
    createP().parent('canvas');
    let canvas = createCanvas(450, 450);
    canvas.parent('canvas');
    createP().parent('canvas');

    // create buttons
    for (let i = 0; i <= sudokuSize; i++) {
        btn = createButton(`${i}`, `${i}`);
        btn.parent('canvas');
        btn.class('btn-unselected');
        btn.mousePressed(setVal);
    }

    cbHighlight = createCheckbox("highlight helper");
    cbHighlight.parent('canvas');

    cbMistakes = createCheckbox("reveal mistakes");
    cbMistakes.parent('canvas');

    cellSize = width / sudokuSize;

    sudoku = new Sudoku();
}

function draw() {
    background(255);
    revealMistakes = cbMistakes.checked();
    highlight = cbHighlight.checked();
    sudoku.render();
}

function setVal() {
    selectedValue = this.value();
    let a = document.getElementsByClassName('btn-selected');
    for (let b of a) {
        b.className = 'btn-unselected';
    }

    this.class('btn-selected');
    return selectedValue;
}

function mouseClicked() {
    let _x = floor(mouseX / cellSize);
    let _y = floor(mouseY / cellSize);
    if (_x >= 0 && _x < sudokuSize && _y >= 0 && _y < sudokuSize) {
        sudoku.setCell(_y, _x, selectedValue);
    }
}