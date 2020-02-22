class Polygon {

    constructor() {
        this.edges = [];
        this.vertices = [];
    }

    addVertex(x, y) {
        let a = createVector(x, y);
        let total = this.vertices.length;
        if (total > 0) {
            let prev = this.vertices[total - 1];
            let edge = new Edge(prev, a);
            this.edges.push(edge);
        }
        this.vertices.push(a);
    }

    close() {
        let total = this.vertices.length;
        let last = this.vertices[total - 1];
        let first = this.vertices[0];
        let edge = new Edge(last, first);
        this.edges.push(edge);
    }

    hankin() {
        for (let i = 0; i < this.edges.length; i++) {
            this.edges[i].hankin();
        }
        for (let i = 0; i < this.edges.length; i++) {
            for (let j = 0; j < this.edges.length; j++) {
                if (j != i) {
                    this.edges[j].findEnds(this.edges[i]);
                }
            }
        }
    }

    show() {
        for (let i = 0; i < this.edges.length; i++) {
            this.edges[i].show();
        }
    }
}