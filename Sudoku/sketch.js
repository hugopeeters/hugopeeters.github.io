let cellWidth, cellHeight;
let sudoku;
let btn, cb;
let selectedValue = 0;
let revealMistakes = false;

function setup() {

    // create canvas
    createP().parent('canvas');
    let canvas = createCanvas(450, 450);
    canvas.parent('canvas');
    createP().parent('canvas');

    // create buttons
    for (let i = 0; i < 10; i++) {
        btn = createButton(`${i}`, `${i}`);
        btn.parent('canvas');
        btn.class('btn-unselected');
        btn.mousePressed(setVal);
    }

    cb = createCheckbox("reveal mistakes");
    cb.parent('canvas');


    cellWidth = width / 9;
    cellHeight = height / 9;

    sudoku = new Sudoku();
}

function draw() {
    background(255);
    revealMistakes = cb.checked();
    sudoku.render();
}

function setVal() {
    selectedValue = this.value();
    let a = document.getElementsByClassName('btn-selected'); //[0].class('btn-unselected');
    for (let b of a) {
        b.className = 'btn-unselected';
    }
    
    this.class('btn-selected');
    return selectedValue;
}

function mouseClicked() {
    let _x = floor(mouseX / cellWidth);
    let _y = floor(mouseY / cellHeight);
    if (_x >= 0 && _x <= 8 && _y >= 0 && _y <= 8) {
        sudoku.setCell(_y, _x, selectedValue);
    } 
}