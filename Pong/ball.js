class Ball {

    constructor() {
        this.s = 10;
        this.xpos = width / 2;
        this.ypos = height / 2;
        this.speed = 3;
        this.dir = createVector(-1, random(-1, 1));
    }

    update() {
        this.xpos = this.xpos + this.dir.x * this.speed;
        this.ypos = this.ypos + this.dir.y * this.speed;
    }

    hitX(angle) {
        this.dir.x = -this.dir.x;
        this.speed += 0.25;
        this.dir.y += angle;
    }

    hitY() {
        this.dir.y = -this.dir.y;
    }

    show() {
        fill(255);
        noStroke();
        rect(this.xpos, this.ypos, this.s, this.s);
    }
}