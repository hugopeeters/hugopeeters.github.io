class Driver {

    constructor(pos, type, speed, diameter) {
        this.pos = pos;
        this.type = type;
        this.speed = speed;
        this.diameter = diameter;
        this.r = this.diameter / 2;
        this.angle = -PI / 2;
        this.dotPos = createVector(0, 0);
    }

    render() {
        //circle
        stroke(255);
        strokeWeight(1);
        noFill();
        ellipseMode(CENTER);
        ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
        //dot
        noStroke();
        fill(255);
        ellipse(this.dotPos.x, this.dotPos.y, 8, 8);
        //line
        stroke(255, 100);
        strokeWeight(1);
        noFill();
        if (this.type == "left") {
            line(0, this.dotPos.y, width, this.dotPos.y);
        } else {
            line(this.dotPos.x, 0, this.dotPos.x, height);
        }
    }

    update() {
        this.angle -= baseSpeed * this.speed;
        this.dotPos.x = this.pos.x + this.r * cos(this.angle);
        this.dotPos.y = this.pos.y + this.r * sin(this.angle);
    }
}