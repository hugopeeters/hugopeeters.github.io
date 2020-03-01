class Particle {

    constructor(x_, y_, f_, c_) {
        this.color = c_;
        this.firework = f_;
        this.lifespan = 255;
        this.pos = createVector(x_, y_);
        if (this.firework) {
            this.vel = createVector(0, random(-18, -10));
        } else {
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(4, 16));
        }
        this.acc = createVector(0, 0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        if (!this.firework) {
            this.vel.mult(0.9);
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        let x = floor(this.pos.x);
        let y = floor(this.pos.y);
        if (x >= 0 && x < width && y >= 0 && y < height) {
            if (this.firework) {
                stroke(255, this.lifespan);
                strokeWeight(2);
            } else if (pxl[x][y] != 255) {
                strokeWeight(4);
                stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], 100);

            } else {
                stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
                strokeWeight(24);
            }
            point(this.pos.x, this.pos.y);
        }
    }

    done() {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }
}