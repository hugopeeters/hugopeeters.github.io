class Particle {

    constructor(pos) {
        this.pos = pos;
        this.ppos = pos.copy();
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.radius = 2;
    }

    render() {
        let x = floor(this.pos.x);
        let y = floor(this.pos.y);
        if (x >= 0 && x < width && y >= 0 && y < height) {
            if (pxl[x][y] == 255) {
                strokeWeight(1);
                stroke(frameCount / 10 % 255, 255, 255, lineOpacity);
                line(this.ppos.x, this.ppos.y, this.pos.x, this.pos.y);
            }
        }
    }

    update() {
        let force = flowfield[round(this.pos.x / fieldResolution)][round(this.pos.y / fieldResolution)];
        force.setMag(fieldForce);
        this.acc.add(force);
        this.vel.add(this.acc);
        this.vel.limit(maxVel);
        this.ppos = this.pos.copy();
        this.pos.add(this.vel);
        if (this.pos.x <= -10) {
            this.pos.x += width + 20;
            this.ppos.x += width + 20;
        }
        if (this.pos.x >= width + 10) {
            this.pos.x -= width + 20;
            this.ppos.x -= width + 20;
        }
        if (this.pos.y <= -10) {
            this.pos.y += height + 20;
            this.ppos.y += height + 20;
        }
        if (this.pos.y >= height + 10) {
            this.pos.y -= height + 20;
            this.ppos.y -= height + 20;
        }
        this.acc.setMag(0);
    }
}