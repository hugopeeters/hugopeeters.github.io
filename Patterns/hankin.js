class Hankin {

    constructor(a, v) {
        this.a = a;
        this.v = v;
        this.b = this.a.copy().add(this.v);
        this.end;
        this.angle;
        this.prevD;
    }

    show() {
        stroke(255, 0, 0);
        line(this.a.x, this.a.y, this.end.x, this.end.y);
    }

    findEnd(other) {
        let den = (other.v.y * this.v.x) - (other.v.x * this.v.y);
        let numa = (other.v.x * (this.a.y - other.a.y)) - (other.v.y * (this.a.x - other.a.x));
        let numb = (this.v.x * (this.a.y - other.a.y)) - (this.v.y * (this.a.x - other.a.x));
        let ua = numa / den;
        let ub = numb / den;
        let x = this.a.x + ua * this.v.x;
        let y = this.a.y + ua * this.v.y;

        if (ua > 0 && ub > 0) {
            let candidate = createVector(x, y);
            let d1 = candidate.dist(this.a);
            let d2 = candidate.dist(other.a);
            let d = d1 + d2;
            let diff = abs(d1 - d2);
            if (diff < 0.001) {
                if (this.end == null) {
                    this.end = candidate;
                    this.prevD = d;
                } else if (d < this.prevD) {
                    this.end = candidate;
                    this.prevD = d;
                }
            }
        }
    }
}