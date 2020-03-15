let score = 0;
let prevScore = 0;
let level = 0;
let btnLevelUp;
let thresholds = [5, 10, 15, 25, 40, 75, 120];

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(320, 80);
    canvas.parent('canvas');
    createP().parent('canvas');
    let btn = createButton("CLICK ME!");
    btn.class('btn-enabled');
    btn.parent('canvas');
    btn.mouseClicked(buttonClicked);
    btnLevelUp = createButton("LEVEL UP");
    btnLevelUp.class('btn-disabled');
    btnLevelUp.parent('canvas');
    //btnLevelUp.mouseClicked(levelUp);
}

function draw() {
    background(200);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('level', width / 4, height / 4);
    text('score', width * 3 / 4, height / 4);
    text('next level at ' + thresholds[0], width / 4, height * 3 / 4);
    textSize(32);
    text(level, width / 4, height / 2);
    text(score, width * 3 / 4, height / 2);

    if (score >= thresholds[0]) {
        btnLevelUp.class('btn-enabled');
        btnLevelUp.mouseClicked(levelUp);
        thresholds.shift();
        thresholds.push(floor(thresholds[thresholds.length - 1] * 1.3));
        console.log(thresholds);
    }
    
    if (level > 0 && frameCount % floor(120 / level) == 0) {
        score++;
    }
    
    //update prevScore so that any events that happen 
    //when a certain score is reached only get triggered once
    prevScore = score;
}

function buttonClicked() {
    score++;
}

function levelUp() {
    level++;
    console.log(level);
    btnLevelUp.class('btn-disabled');
    btnLevelUp.mouseClicked(doNothing);
}

function doNothing() {

}