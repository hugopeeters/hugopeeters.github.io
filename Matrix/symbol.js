class MySymbol {

    constructor(x_, y_, s_, f) {
        this.first = f;
        this.x = x_;
        this.y = y_;
        this.speed = s_;
        this.switchInterval = round(random(5, 20));
        this.value;
    }

    setRandomSymbol() {
        if (frameCount % this.switchInterval == 0) {
            let r = random(1);
            if (r < 0.8) {
                this.value = char(0x0061 + round(random(0, 25)));
            } else {
                this.value = char(0x0030 + round(random(0, 9)));
            }
        }
    }

    rain() {

        //if (this.y >= height) {
        //  this.y = 0;
        //} else {
        //  this.y += this.speed;
        //}

        //shorthand for above
        this.y = (this.y >= height) ? 0 : this.y + this.speed;
    }
}