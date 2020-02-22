let player1, player2;
let ball;
let scoreP1, scoreP2;
let mono;

function preload() {
    mono = loadFont('font.ttf');
}

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(600, 600);
    canvas.parent('canvas');
    createP().parent('canvas');
    player1 = new Paddle(50);
    player2 = new Paddle(width - 60);
    ball = new Ball();
    scoreP1 = 0;
    scoreP2 = 0;
}

function draw() {
    background(51);
    noCursor();

    //scoreboard
    textSize(64);
    textAlign(CENTER);
    textFont(mono);
    fill(255);
    noStroke();
    text(scoreP1, width / 2 - 50, 75);
    text(":", width / 2, 75);
    text(scoreP2, width / 2 + 50, 75);

    player1.update(mouseY);
    player1.show();
    player2.move();
    player2.show();
    ball.update();
    ball.show();

    //hit top or bottom
    if (ball.ypos <= 0 || ball.ypos + ball.s >= height) {
        ball.hitY();
    }
    //hit player1
    if (ball.xpos <= player1.xpos + player1.w) {
        if (ball.ypos >= player1.ypos && ball.ypos <= player1.ypos + player1.h) {
            let angle = map(((ball.ypos + ball.s / 2) - (player1.ypos + player1.h / 2)), -player1.h / 2, player1.h / 2, -0.5, 0.5);
            ball.hitX(angle);
        }
    }
    //hit player2
    if (ball.xpos + ball.s >= player2.xpos) {
        if (ball.ypos >= player2.ypos && ball.ypos <= player2.ypos + player1.h) {
            let angle = map(((ball.ypos + ball.s / 2) - (player2.ypos + player2.h / 2)), -player2.h / 2, player2.h / 2, -0.5, 0.5);
            ball.hitX(angle);
        }
    }
    //score player 1
    if (ball.xpos + ball.s >= width) {
        scoreP1 += 1;
        ball = new Ball();
        //help player2 by increasing speed
        player2.speed += 0.75;
    }
    //score player 2
    if (ball.xpos <= 0) {
        scoreP2 += 1;
        ball = new Ball();
        //help player1 by making paddle longer
        player1.h += 10;
    }
}