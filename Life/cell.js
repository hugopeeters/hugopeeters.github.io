class Cell {

  constructor(i, j) {
    this.alive = false;
    this.i = i;
    this.j = j;
    this.count;
  }

  toggle() {
    this.alive = !this.alive;
  }

  next() {
    let nextCell = this;
    if (this.alive && this.count < 2 || this.alive && this.count > 3) {
      nextCell.alive = false;
    } else if (!this.alive && this.count == 3) {
      nextCell.alive = true;
    }
    return nextCell;
  }

  countNeighbors() {
    let count = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (this.i + x >= 0 && this.i + x < (width / sz) && this.j + y >= 0 && this.j + y < (height / sz)) {
          if (grid[this.i + x][this.j + y].alive) {
            count++;
          }
        }
      }
    }
    if (this.alive) {
      count--;
    }
    return count;
  }

  render() {
    this.count = this.countNeighbors();
    noStroke();
    if (this.alive) {
      fill(255);
    } else {
      fill(0);
    }
    rect(this.i * sz, this.j * sz, sz - 1, sz - 1);
    //fill(255, 0, 0);
    //text(count, i*sz + sz/3, j*sz + sz/2);
  }
}