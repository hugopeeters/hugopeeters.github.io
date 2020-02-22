class Paddle {

    constructor(x) {
        this.w = 10;
        this.h = 50;
        this.xpos = x;
        this.ypos = height / 2;
        this.speed = 3;
    }

    update(y) {
        this.ypos = constrain(y, 0, height - this.h);
    }

    move() {
        let ballcenter = ball.ypos + ball.s / 2;
        let paddlecenter = this.ypos + this.h / 2;
        let offset = ballcenter - paddlecenter;
        let step = constrain(offset, -this.speed, this.speed);
        this.ypos += step;
        this.ypos = constrain(this.ypos, 0, height - this.h);
    }

    show() {
        fill(255);
        noStroke();
        rect(this.xpos, this.ypos, this.w, this.h);
    }
}