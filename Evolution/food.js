class Food {

    constructor(pos, good, index) {
      this.pos = pos;
      this.good = good;
      this.index = index;
      if (this.good) {
        this.c = color(0, 255, 0);
      } else {
        this.c = color(255, 0, 0);
      }
    }
  
    render() {
      noStroke();
      fill(this.c);
      ellipseMode(CENTER);
      ellipse(this.pos.x, this.pos.y, 4, 4);
    }
  }
  
  
  //GLOBAL FUNCTIONS
  function addPoison() {
    while (countPoison() < vehicles.length / 4) {
      food.push(new Food(createVector(random(field[0].x + 5, field[1].x - 5), random(field[0].y + 5, field[1].y - 5)), false, food.length));
    }
  }
  
  function addFood() {
    while (food.length < 100) {
      food.push(new Food(createVector(random(field[0].x + 5, field[1].x - 5), random(field[0].y + 5, field[1].y - 5)), true, food.length));
    }
  }
  
  function countPoison() {
    let poisonCount = 0;
    for (let i = 0; i < food.length; i++) {
      if (food[i].good != true) {
        poisonCount++;
      }
    }
    return poisonCount;
  }