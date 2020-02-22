class BarChart {

    constructor(pos, w, h, series, chartLabel) {
        this.topLeftPosition = pos;
        this.chartWidth = w;
        this.chartHeight = h;
        this.series = series;
        this.chartLabel = chartLabel;
    }

    render() {
        noFill();
        stroke(255);
        strokeWeight(1);
        //y-axis
        line(this.topLeftPosition.x, this.topLeftPosition.y, this.topLeftPosition.x, this.topLeftPosition.y + this.chartHeight);
        //x-axis
        line(this.topLeftPosition.x, this.topLeftPosition.y + this.chartHeight, this.topLeftPosition.x + this.chartWidth, this.topLeftPosition.y + this.chartHeight);
        //title
        push();
        translate(this.topLeftPosition.x, this.topLeftPosition.y + this.chartHeight / 2);
        rotate(-PI / 2);
        textAlign(CENTER, BOTTOM);
        noStroke();
        fill(255);
        text(this.chartLabel, 0, 0);
        pop();

        //bars and x-axis labels
        let maxBarWidth = this.chartWidth / this.series.length;
        let gap = 5;
        let highestValue = max(this.series);
        for (let i = 0; i < this.series.length; i++) {
            let x = this.topLeftPosition.x + i * maxBarWidth + gap;
            let y = this.topLeftPosition.y + this.chartHeight - ((this.series[i] / highestValue) * this.chartHeight);
            noStroke();
            fill(200);
            rectMode(CORNERS);
            rect(x, y, x + maxBarWidth - 2 * gap, this.topLeftPosition.y + this.chartHeight);
            //labels
            let textX = this.topLeftPosition.x + (i + 0.5) * maxBarWidth;
            let textY = this.topLeftPosition.y + this.chartHeight;
            textAlign(CENTER, TOP);
            text(i, textX, textY);
        }
        //y-axis label
        text(int(highestValue), this.topLeftPosition.x - 10, this.topLeftPosition.y);
    }

}