class GUI {

    constructor() {
        this.c1 = color(255);
        this.c2 = color(255);
        this.c3 = color(255);
    }

    render() {
        //fuel level
        if (ship.fuel <= 25) {
            this.c1 = color(255, 150, 0);
        }
        if (ship.fuel <= 10) {
            this.c1 = color(255, 0, 0);
        }
        noFill();
        stroke(this.c1);
        rect(width - 75, 50, 25, 100);
        noStroke();
        fill(this.c1);
        rect(width - 75, 50, 25, 100 - ship.fuel);

        //vx
        if (ship.vel.x >= 1 || ship.vel.x <= -1) {
            this.c2 = color(255, 0, 0);
        } else if (ship.vel.x >= 0.5 || ship.vel.x <= -0.5) {
            this.c2 = color(255, 150, 0);
        } else {
            this.c2 = color(255);
        }
        noFill();
        stroke(this.c2);
        rect(75, 50, 100, 10);
        noStroke();
        fill(this.c2);
        let vxbar = ship.vel.x * 40;
        if (vxbar > 50) {
            vxbar = 50;
        } else if (vxbar < -50) {
            vxbar = -50;
        }
        rect(125, 50, vxbar, 10);

        //vy
        if (ship.vel.y >= 1 || ship.vel.y <= -1) {
            this.c3 = color(255, 0, 0);
        } else if (ship.vel.y >= 0.5 || ship.vel.y <= -0.5) {
            this.c3 = color(255, 150, 0);
        } else {
            this.c3 = color(255);
        }
        noFill();
        stroke(this.c3);
        rect(50, 75, 10, 100);
        noStroke();
        fill(this.c3);
        let vybar = ship.vel.y * 40;
        if (vybar > 50) {
            vybar = 50;
        } else if (vybar < -50) {
            vybar = -50;
        }
        rect(50, 125, 10, vybar);

        //crash
        if (ship.crashed) {
            fill(255, 0, 0, 100);
            textSize(128);
            textAlign(CENTER);
            text("GAME OVER", width / 2, height / 2);
        }
    }
}