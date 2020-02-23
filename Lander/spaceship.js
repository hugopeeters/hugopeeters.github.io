class Spaceship {

    constructor() {
        this.pos = createVector(width / 2, 50);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.thrust = createVector(0, 0);
        this.heading = 0;
        this.dir = 0;
        this.boosting = false;
        this.landed = false;
        this.crashed = false;
        this.sz = 10;
        this.fuel = 100;
    }

    update() {
        if (!this.crashed) {
            this.boost();
            if (!this.landed) {
                this.turn();
                this.acc.add(G);
                this.vel.add(this.acc);
                this.pos.add(this.vel);
                this.acc.mult(0);
            }
            if (this.landed && this.boosting) {
                this.boost();
                this.vel.add(this.acc);
                this.pos.add(this.vel);
                this.acc.mult(0);
                this.landed = false;
            }
        }
        this.checkCollision();
    }


    render() {
        noFill();
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading);
        beginShape();
        vertex(0, -this.sz / 2);
        vertex(-this.sz / 2, this.sz / 2);
        vertex(this.sz / 2, this.sz / 2);
        endShape(CLOSE);
        if (this.boosting && this.fuel > 0 && !this.crashed) {
            beginShape();
            vertex(-this.sz / 4, this.sz / 2);
            vertex(0, this.sz);
            vertex(this.sz / 4, this.sz / 2);
            endShape(CLOSE);
        }
        pop();
    }

    turn() {
        if (this.dir == 1) {
            this.heading += 0.1;
        } else if (this.dir == -1) {
            this.heading -= 0.1;
        } else if (this.dir == 0) {
            //don't turn
        }
    }

    boost() {
        if (this.boosting && this.fuel > 0 && !this.crashed) {
            this.thrust = p5.Vector.fromAngle(this.heading - radians(90));
            this.thrust.setMag(G.mag() * 15);
            this.fuel -= 0.2;
            this.acc.add(this.thrust);
        } else {
            this.thrust.mult(0);
        }
    }

    checkCollision() {
        for (let i = 1; i < ground.vertices.length; i++) {
            let prev = ground.vertices[i - 1];
            let cur = ground.vertices[i];
            if (ship.pos.x >= prev.x && ship.pos.x <= cur.x) {
                let colY = cur.y - ((cur.x - ship.pos.x) * (cur.y - prev.y) / (cur.x - prev.x));
                if (ship.pos.y + this.sz > colY) {
                    if (this.vel.y >= 0.5) {
                        this.crashed = true;
                    } else {
                        this.landed = true;
                    }
                }
            }
        }
        if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;
        }
    }
}