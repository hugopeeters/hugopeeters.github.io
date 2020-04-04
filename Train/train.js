class Train {

    constructor(route) {
        this.route = route;
        this.stationIndex = 0;
        this.previousStation = this.route.stations[this.stationIndex];
        this.nextStation = this.route.stations[this.stationIndex + 1];
        this.pos = createVector(this.previousStation.x, this.previousStation.y)
        this.direction = createVector(this.nextStation.x, this.nextStation.y).sub(this.pos);
        this.step = this.direction.copy().setMag(speed);
    }

    show() {
        noStroke();
        fill(255, 0, 0);
        rect(this.pos.x, this.pos.y, 18, 18);
    }

    update() {
        let d = dist(this.pos.x, this.pos.y, this.nextStation.x, this.nextStation.y);

        if (d >= this.step.mag()) {
            this.pos.add(this.step);
        } else {
            if (this.stationIndex < this.route.stations.length - 2) {
                this.stationIndex++;
                this.previousStation = this.route.stations[this.stationIndex];
                this.nextStation = this.route.stations[this.stationIndex + 1];
            } else if (this.stationIndex == this.route.stations.length - 2) {
                this.stationIndex++;
                this.previousStation = this.route.stations[this.stationIndex];
                this.nextStation = this.route.stations[0];
            } else {
                this.stationIndex = 0;
                this.previousStation = this.route.stations[this.stationIndex];
                this.nextStation = this.route.stations[this.stationIndex + 1];
            }

            this.direction = createVector(this.nextStation.x, this.nextStation.y).sub(this.pos);
            this.step = this.direction.copy().setMag(speed);
        }
    }
}