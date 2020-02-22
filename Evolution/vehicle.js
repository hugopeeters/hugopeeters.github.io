class Vehicle {

    constructor(pos, ancestor, dna, gen) {

        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxForce = 1;
        this.maxVel = 5;
        this.r = 12;
        this.health = 1;
        this.ancestor = ancestor;
        this.performance = 100;
        this.best = false;
        this.age = 0;
        
        if (arguments.length == 2) {
            this.dna = new DNA();
            this.birthDate = 0;
            this.generation = 0;
        } else {
            this.dna = dna;
            this.dna.mutate();
            this.birthDate = frameCount;
            this.generation = gen;
        }
    }

    update() {
        if (this.acc.mag() == 0 && this.vel.mag() == 0) {
            this.acc = p5.Vector.random2D().setMag(this.maxForce);
        }
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.health -= 0.01;
        this.age = floor((frameCount - this.birthDate) / FPS);
        this.performance = this.health + this.age * 100;
        this.best = false;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    seekList(list) {
        let smallestDistance = 99999;
        let closest = null;
        for (let i = list.length - 1; i >= 0; i--) {
            let dist;
            dist = sqrt(pow(this.pos.x - list[i].pos.x, 2) + pow(this.pos.y - list[i].pos.y, 2));
            //console.log(dist);
            if (dist < 5) {
                //eat the food
                if (list[i].good) {
                    this.health += 0.2;
                } else {
                    this.health -= 0.75;
                }
                list.splice(i, 1);
            } else if (((list[i].good && dist <= this.dna.goodRange) || (!list[i].good && dist <= this.dna.badRange)) && dist < smallestDistance) {
                smallestDistance = dist;
                closest = list[i];
            }
        }
        if (closest != null) {
            this.seek(closest);
        }
    }

    seek(target) {
        let desiredVel = target.pos.copy().sub(this.pos);
        let steeringForce = desiredVel.sub(this.vel);
        if (target.good) {
            steeringForce.mult(this.dna.goodVel);
        } else {
            steeringForce.mult(this.dna.badVel);
        }
        steeringForce.limit(this.maxForce);
        applyForce(steeringForce);
    }

    seekOthers() {
        let smallestDistance = 99999;
        let target = null;
        if (vehicles.length > 2) {
            for (let i = 0; i < vehicles.length; i++) {
                let dist = vehicles[i].pos.dist(this.pos);
                if (dist != 0 && dist < smallestDistance && dist < this.dna.otherRange) {
                    smallestDistance = dist;
                    target = vehicles[i];
                }
            }
            if (target != null) {
                this.seek(target);
            }
        }
    }

    seek(target) {
        let desiredVel = target.pos.copy().sub(this.pos);
        let steeringForce = desiredVel.sub(this.vel);
        steeringForce.mult(this.dna.otherVel);
        steeringForce.mult(target.health / this.dna.otherHealth);
        steeringForce.limit(this.maxForce);
        this.applyForce(steeringForce);
    }

    avoidEdges() {
        if (this.pos.x < field[0].x + 5) {
            this.applyForce(createVector(2, 0));
        }
        if (this.pos.x > field[1].x - 5) {
            this.applyForce(createVector(-2, 0));
        }
        if (this.pos.y < field[0].y + 5) {
            this.applyForce(createVector(0, 2));
        }
        if (this.pos.y > field[1].y - 5) {
            this.applyForce(createVector(0, -2));
        }
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() + PI / 2);
        beginShape();
        let c = lerpColor(color(255, 0, 0), color(0, 255, 0), this.health);
        if (this.best) {
            fill(255);
        } else {
            noFill();
        }
        stroke(c);
        vertex(0, 0 - this.r);
        vertex(0 - this.r / 3, 0);
        vertex(0 + this.r / 3, 0);
        endShape(CLOSE);
        //debugging visuals
        if (this.best) {
            noFill();
            ellipseMode(RADIUS);
            stroke(0, 255, 0, 200);
            line(0, 0, 0, -this.dna.goodVel * 20);
            ellipse(0, 0, this.dna.goodRange, this.dna.goodRange);
            stroke(255, 0, 0, 200);
            line(1, 0, 1, -this.dna.badVel * 20);
            ellipse(0, 0, this.dna.badRange, this.dna.badRange);
            stroke(141, 141, 255, 200);
            line(-1, 0, -1, -this.dna.otherVel * 20);
            ellipse(0, 0, this.dna.otherRange, this.dna.otherRange);
        }
        pop();
    }
}