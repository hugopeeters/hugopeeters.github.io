class Boid {


    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(random(1, 2));
        this.acc = createVector(0, 0);
        this.alpha = PI / 8;
        this.d1 = 12;
        this.d2 = 0.8 * this.d1;
        this.maxForce = 0.03;
        this.maxVel = 3;
    }

    render() {
        noFill();
        stroke(255);
        let x1 = 0;
        let y1 = 0;
        let x2 = x1 - this.d1 * cos(this.alpha);
        let y2 = y1 - this.d1 * sin(this.alpha);
        let x3 = x1 - this.d2;
        let y3 = y1;
        let x4 = x1 - this.d1 * cos(this.alpha);
        let y4 = y1 + this.d1 * sin(this.alpha);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        quad(x1, y1, x2, y2, x3, y3, x4, y4);
        pop();
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {

        //separation
        let separationForce = this.steerAwayFromCloseBoids(boids);
        this.applyForce(separationForce.mult(1.5));
        //alignment
        let alignmentForce = this.alignWithCloseBoids(boids);
        this.applyForce(alignmentForce);
        //cohesion
        let cohesionForce = this.steerTowardsLocalCenterOfMass(boids);
        this.applyForce(cohesionForce);

        //calculate new velocity and position
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);
        this.pos.add(this.vel);

        // loop around the edges
        if (this.pos.x > width + this.d1) {
            this.pos.x = 0 - this.d1;
        }
        if (this.pos.x < 0 - this.d1) {
            this.pos.x = width + this.d1;
        }
        if (this.pos.y > height + this.d1) {
            this.pos.y = 0 - this.d1;
        }
        if (this.pos.y < 0 - this.d1) {
            this.pos.y = height + this.d1;
        }

        //reset acceleration
        this.acc.setMag(0);
    }

    steerAwayFromCloseBoids(others) {
        let combinedForce = createVector();
        let range = 25;
        let closeBoids = 0;
        for (let other of others) {
            let d = p5.Vector.dist(this.pos, other.pos);
            if (d > 0 && d < range) {
                closeBoids++;
                let force = p5.Vector.sub(this.pos, other.pos);
                force.normalize();
                force.div(d);
                combinedForce.add(force);
            }
        }
        if (closeBoids > 0) {
            combinedForce.div(closeBoids);
        }
        if (combinedForce.mag() > 0) {
            combinedForce.setMag(this.maxVel);
            combinedForce.sub(this.vel);
            combinedForce.limit(this.maxForce);
        }
        return combinedForce;
    }

    alignWithCloseBoids(others) {
        let combinedForce = createVector();
        let range = 50;
        let closeBoids = 0;
        for (let other of others) {
            let d = p5.Vector.dist(this.pos, other.pos);
            if (d > 0 && d < range) {
                closeBoids++;
                combinedForce.add(other.vel);
            }
        }
        if (closeBoids > 0) {
            combinedForce.div(closeBoids);
        }
        if (combinedForce.mag() > 0) {
            combinedForce.setMag(this.maxVel);
            combinedForce.sub(this.vel);
            combinedForce.limit(this.maxForce);
        }
        return combinedForce;
    }

    steerTowardsLocalCenterOfMass(others) {
        let CoM = createVector();
        let range = 50;
        let closeBoids = 0;
        let force;
        for (let other of others) {
            let d = p5.Vector.dist(this.pos, other.pos);
            if (d > 0 && d < range) {
                closeBoids++;
                CoM.add(other.pos);
            }
        }
        if (closeBoids > 0) {
            CoM.div(closeBoids);
        }
        if (CoM.mag() > 0) {
            force = p5.Vector.sub(CoM, this.pos);
            force.setMag(this.maxVel);
            force.sub(this.vel);
            force.limit(this.maxForce);
        } else {
            force = createVector();
        }
        return force;
    }

}