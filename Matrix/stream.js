class Stream {

    constructor(x_) {
        this.x = x_;
        this.y;
        this.z = round(random(-2, 2));
        this.size = myTextSize + 2 * this.z;
        this.n = round(random(5, 20));
        this.speed = 7 - this.z / 2 + random(-2, 2);
        this.symbols = [];
        this.generateSymbols();
    }

    generateSymbols() {
        this.y = random(0, height);
        let first = random(1) < 0.3;
        for (let i = 0; i < this.n; i++) {
            let mySymbol = new MySymbol(this.x, this.y, this.speed, first);
            mySymbol.setRandomSymbol();
            this.symbols.push(mySymbol);
            this.y -= this.size;
            first = false;
        }
    }

    render() {
        for (let s of this.symbols) {
            let alpha = floor(map(this.z, -2, 2, 50, 150));
            if (s.first) {
                fill(200, 255, 200, alpha + 100);
            } else {
                fill(90, 255, 90, alpha);
            }
            text(s.value, s.x, s.y);
            s.rain();
            s.setRandomSymbol();
        }
    }
}