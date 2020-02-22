class Particle {

    constructor() {
        this.pos = createVector(200, 200);
        this.rays = [];
        for (let i = 0; i < 360; i += 3) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    render() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4, 4);
        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].render();
        }
    }

    look(walls) {
        for (let ray of this.rays) {
            let closest = null;
            let record = height + width;
            for (let wall of walls) {
                let pt = ray.cast(wall);
                if (null != pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (null != closest) {
                stroke(255, 10);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }

    update(x, y) {
        this.pos.set(x, y);
    }
}