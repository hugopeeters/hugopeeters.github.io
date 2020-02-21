class Star {
  
  constructor(){
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(0, width);
    this.px = this.x;
    this.py = this.y;
    this.sx = 0.0;
    this.sy = 0.0;
  }
  
  update() {
     this.z = this.z - speed ;
     if (this.z < 1) {
       this.z = width;
       this.x = random(-width, width);
       this.y = random(-height, height);
       this.px = this.x;
       this.py = this.y;
     } else {
       this.px = this.sx;
       this.py = this.sy;
     }
     this.sx = map(this.x/this.z, 0, 1, 0, width);
     this.sy = map(this.y/this.z, 0, 1, 0, height);
  }
   
  show() {
      stroke(255);
      strokeWeight(map(this.z, 0, width, 8, 1));
      line(this.px, this.py, this.sx, this.sy);
  }
}