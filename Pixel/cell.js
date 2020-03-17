class Cell {

  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.c = 0;
  }

  toggle() {
    if (this.c != 0) {
      this.c = 0;
    } else {
      this.c = selectedColor;
    }
  }

  paint(){
    this.c = selectedColor;
  }

  render() {
    fill(this.c);
    rect(1+this.i * sz, 1+this.j * sz, sz - 2, sz - 2);
  }
}