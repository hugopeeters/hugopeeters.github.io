class Station {

    constructor() {
        this.x = random(margin - width / 2, width / 2 - margin);
        this.y = random(margin - height / 2, height / 2 - margin);

        let shapeList = ['circle', 'square'];
        this.shapeIndex = floor(random(shapeList.length));
    }

    show() {
        noStroke();
        fill(255);
        if (this.shapeIndex == 0) {
            ellipseMode(CENTER);
            ellipse(this.x, this.y, stationSize, stationSize);
        } else if (this.shapeIndex == 1) {
            rectMode(CENTER);
            rect(this.x, this.y, stationSize, stationSize);
        }
    }

}