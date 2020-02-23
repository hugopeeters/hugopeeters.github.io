class Ground {

    constructor() {
        this.w = 12000;
        this.resolution = 60;
        this.vertices = [];
        let x1 = 0;
        let y1 = height - 300 * noise(0);
        this.vertices.push(createVector(x1, y1));
        let prev = 0;
        for (let i = 1; i < this.resolution + 2; i++) {
            let x = prev + (width / this.resolution);
            let y = height - 300 * noise(i * 0.15);
            this.vertices.push(createVector(x, y));
            prev = x;
        }
    }

    render() {
        stroke(255);
        for (let i = 1; i < this.vertices.length - 1; i++) {
            line(this.vertices[i - 1].x, this.vertices[i - 1].y, this.vertices[i].x, this.vertices[i].y);
        }
    }
}