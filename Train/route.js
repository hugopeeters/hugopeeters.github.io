class Route {

    constructor() {
        this.stations = [];
    }

    addStation(s) {
        this.stations.push(s);
    }

    show() {
        if (this.stations.length > 1) {
            for (let i = 1; i < this.stations.length; i++) {
                stroke(255);
                strokeWeight(4);
                line(this.stations[i-1].x, this.stations[i-1].y, this.stations[i].x, this.stations[i].y);
            }
        }
    }
}