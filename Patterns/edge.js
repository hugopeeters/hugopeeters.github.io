class Edge {

    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.offset1;
        this.offset2;
        this.h1;
        this.h2;
    }

    show() {
        stroke(255, 10);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
        this.h1.show();
        this.h2.show();
    }

    hankin() {
        let mid = this.a.copy().add(this.b.copy()).mult(0.5);
        let v1 = this.a.copy().sub(mid);
        let v2 = this.b.copy().sub(mid);
        if (delta > 0) {
            v1.setMag(delta);
            v2.setMag(delta);
            this.offset1 = mid.copy().add(v2);
            this.offset2 = mid.copy().add(v1);
        } else {
            this.offset1 = mid;
            this.offset2 = mid;
        }
        v1.normalize();
        v2.normalize();
        v1.rotate(radians(-angle));
        v2.rotate(radians(angle));
        this.h1 = new Hankin(this.offset1, v1);
        this.h2 = new Hankin(this.offset2, v2);
    }

    findEnds(edge) {
        this.h1.findEnd(edge.h1);
        this.h1.findEnd(edge.h2);
        this.h2.findEnd(edge.h1);
        this.h2.findEnd(edge.h2);
    }
}