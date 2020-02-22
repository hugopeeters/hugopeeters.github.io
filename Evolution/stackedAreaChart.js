class StackedAreaChart {
  
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
      rotate(-PI/2);
      textAlign(CENTER, BOTTOM);
      noStroke();
      fill(255);
      text(this.chartLabel, 0, 0);
      pop();
  
      //data
      let maxBarWidth = this.chartWidth / this.series.length;
      for (let i = 0; i < this.series.length; i++) {
        let dataset = this.series[i];
        let sum = this.sum(dataset);
        let x = this.topLeftPosition.x + i * maxBarWidth;
        let y1 = this.topLeftPosition.y;
        let y2 = y1;
        for (let j = 0; j < dataset.length; j++) {
          y2 += this.chartHeight * (dataset[j] / sum);
          rectMode(CORNERS);
          noStroke();
          fill(ancColors[j]);
          rect(x, y1, x + maxBarWidth, y2);
          y1 = y2;
        }
        //labels x-axis
        //let textX = this.topLeftPosition.x + (i + 0.5) * maxBarWidth;
        //let textY = this.topLeftPosition.y + this.chartHeight;
        //textAlign(CENTER, TOP);
        //text(i, textX, textY);
      }
      //labels y-axis
    }
    
    sum(arr) {
        let total = 0;
        for (let i of arr) {
          total += i;
        }
        return total;
      }

  }
  
  
  //global functions
  
  function createColorArray(sz){
    let colArr = new Array(sz);
    for (let i = 0; i < sz; i++) {
      let r = round(random(255));
      let g = round(random(255));
      let b = round(random(255));
      colArr[i] = color(r, g, b);
    }
    return colArr;
  }