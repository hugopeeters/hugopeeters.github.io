let score = 0;
let prevScore = 0;
let level = 0;
let btnLevelUp;

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
    btnLevelUp.mouseClicked(levelUp);
}

function draw() {
    background(200);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(score, width / 2, height / 2);

    if (score == 10 && prevScore != score) {
        btnLevelUp.class('btn-enabled');
    }

    if (level == 1 && frameCount % 60 == 0) {
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
}