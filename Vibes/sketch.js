///FLOW
const s1 = (sketch) => {
    let logo;
    let pxl;
    let fieldResolution = 20;
    let fieldScale = 0.05;
    let changeRate = 0.000055;
    let numP = 5000;
    let lineOpacity = 0.075;
    let fieldForce = 1;
    let maxVel = 5;
    let showVectors = false;
    let flowfield = [];

    let xoff, yoff;
    let zoff = 0;
    let cols, rows, particles;

    sketch.preload = function () {
        logo = sketch.loadImage('logo/logo.png');
    }

    sketch.setup = function () {
        sketch.createCanvas(800, 800);
        cols = sketch.floor(sketch.width / fieldResolution + 2);
        rows = sketch.floor(sketch.height / fieldResolution + 2);
        sketch.colorMode(sketch.HSB, 255, 255, 255);
        sketch.rectMode(sketch.CENTER);
        sketch.ellipseMode(sketch.CENTER);
        particles = new Array(numP);
        for (let i = 0; i < numP; i++) {
            let pos = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
            particles[i] = new Particle(pos);
        }

        pxl = new Array(sketch.width);
        logo.loadPixels();
        let d = sketch.pixelDensity();
        for (let x = 0; x < sketch.width; x++) {
            pxl[x] = new Array(sketch.height);
            for (let y = 0; y < sketch.height; y++) {
                let off = (y * sketch.width + x) * 4;
                if (logo.pixels[off + 3] == 255) {
                    pxl[x][y] = 255;
                }
            }
        }
        sketch.background(0);
    }

    sketch.draw = function () {
        //background(0);

        for (let x = 0; x < cols + 1; x += 1) {
            flowfield[x] = [];
            for (let y = 0; y < rows + 1; y += 1) {
                xoff = x * fieldScale;
                yoff = y * fieldScale;
                flowfield[x][y] = p5.Vector.fromAngle(sketch.noise(xoff, yoff, zoff) * sketch.TWO_PI);

                if (showVectors) {
                    //DRAW VECTORS
                    sketch.push();
                    sketch.translate(x * fieldResolution, y * fieldResolution);
                    sketch.rotate(flowfield[x][y].heading());
                    sketch.stroke(255, 0.01);
                    sketch.line(0, 0, fieldResolution * 0.75, 0);
                    sketch.pop();
                }
            }
        }
        zoff += changeRate;

        for (let i = 0; i < particles.length; i++) {
            particles[i].render();
            particles[i].update();
        }
    }

    class Particle {

        constructor(pos) {
            this.pos = pos;
            this.ppos = pos.copy();
            this.vel = sketch.createVector(0, 0);
            this.acc = sketch.createVector(0, 0);
            this.radius = 2;
        }

        render() {
            let x = sketch.floor(this.pos.x);
            let y = sketch.floor(this.pos.y);
            if (x >= 0 && x < sketch.width && y >= 0 && y < sketch.height) {
                if (pxl[x][y] == 255) {
                    sketch.strokeWeight(1);
                    sketch.stroke(sketch.frameCount / 10 % 255, 255, 255, lineOpacity);
                    sketch.line(this.ppos.x, this.ppos.y, this.pos.x, this.pos.y);
                }
            }
        }

        update() {
            let force = flowfield[sketch.round(this.pos.x / fieldResolution)][sketch.round(this.pos.y / fieldResolution)];
            force.setMag(fieldForce);
            this.acc.add(force);
            this.vel.add(this.acc);
            this.vel.limit(maxVel);
            this.ppos = this.pos.copy();
            this.pos.add(this.vel);
            if (this.pos.x <= -10) {
                this.pos.x += sketch.width + 20;
                this.ppos.x += sketch.width + 20;
            }
            if (this.pos.x >= sketch.width + 10) {
                this.pos.x -= sketch.width + 20;
                this.ppos.x -= sketch.width + 20;
            }
            if (this.pos.y <= -10) {
                this.pos.y += sketch.height + 20;
                this.ppos.y += sketch.height + 20;
            }
            if (this.pos.y >= sketch.height + 10) {
                this.pos.y -= sketch.height + 20;
                this.ppos.y -= sketch.height + 20;
            }
            this.acc.setMag(0);
        }
    }
};

///FIREWORKS
const s2 = (sketch) => {
    let logo;
    let pxl;
    let x = 0;
    let fireworks = [];
    let gravity;

    sketch.preload = function () {
        logo = sketch.loadImage('logo/logo.png');
    }

    sketch.setup = function () {
        sketch.createCanvas(800, 800);
        pxl = new Array(sketch.width);
        logo.loadPixels();
        let d = sketch.pixelDensity();
        for (let x = 0; x < sketch.width; x++) {
            pxl[x] = new Array(sketch.height);
            for (let y = 0; y < sketch.height; y++) {
                let off = (y * sketch.width + x) * 4;
                if (logo.pixels[off + 3] == 255) {
                    pxl[x][y] = 255;
                }
            }
        }

        sketch.background(52);
        sketch.stroke(255);
        sketch.strokeWeight(4);
        gravity = sketch.createVector(0, 0.2);
    }

    sketch.draw = function () {
        sketch.background(0);

        if (sketch.random(1) < 0.3) {
            fireworks.push(new Firework());
        }
        for (let i = fireworks.length - 1; i >= 0; i--) {
            let f = fireworks[i];
            f.update();
            f.show();
            if (f.done()) {
                fireworks.splice(i, 1);
            }
        }
    }
    class Firework {

        constructor() {
            this.color = sketch.color(sketch.floor(sketch.random(200, 255)), sketch.floor(sketch.random(0, 30)), sketch.floor(sketch.random(0, 30)));
            this.firework = new Particle(sketch.random(sketch.width), sketch.height, true, this.color);
            this.exploded = false;
            this.particles = [];
        }

        update() {
            if (!this.exploded) {
                this.firework.applyForce(gravity);
                this.firework.update();
                if (this.firework.vel.y >= 0) {
                    this.exploded = true;
                    this.explode();
                }
            }
            for (let i = this.particles.length - 1; i >= 0; i--) {
                let p = this.particles[i];
                p.applyForce(gravity);
                p.update();
                if (p.done()) {
                    this.particles.splice(i, 1);
                }
            }
        }

        show() {
            if (!this.exploded) {
                this.firework.show();
            }
            for (let p of this.particles) {
                p.show();
            }
        }

        explode() {
            for (let i = 0; i < 200; i++) {
                let p = new Particle(this.firework.pos.x, this.firework.pos.y, false, this.color);
                this.particles.push(p);
            }
        }

        done() {
            if (this.exploded && this.particles.length == 0) {
                return true;
            } else {
                return false;
            }
        }

    }

    class Particle {

        constructor(x_, y_, f_, c_) {
            this.color = c_;
            this.firework = f_;
            this.lifespan = 255;
            this.pos = sketch.createVector(x_, y_);
            if (this.firework) {
                this.vel = sketch.createVector(0, sketch.random(-18, -8));
            } else {
                this.vel = p5.Vector.random2D();
                this.vel.mult(sketch.random(4, 16));
            }
            this.acc = sketch.createVector(0, 0);
        }

        applyForce(force) {
            this.acc.add(force);
        }

        update() {
            if (!this.firework) {
                this.vel.mult(0.9);
                this.lifespan -= 4;
            }
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }

        show() {
            let x = sketch.floor(this.pos.x);
            let y = sketch.floor(this.pos.y);
            if (x >= 0 && x < sketch.width && y >= 0 && y < sketch.height) {
                if (this.firework) {
                    sketch.stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
                    sketch.strokeWeight(2);
                } else if (pxl[x][y] != 255) {
                    sketch.strokeWeight(4);
                    sketch.stroke(this.color.levels[0] - 60, this.color.levels[1] + 40, this.color.levels[2] + 40, 100);

                } else {
                    sketch.stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
                    sketch.strokeWeight(24);
                }
                sketch.point(this.pos.x, this.pos.y);
            }
        }

        done() {
            if (this.lifespan < 0) {
                return true;
            } else {
                return false;
            }
        }
    }
};

///BLINK
const s3 = (sketch) => {
    let logoData;
    let scl = 1;

    sketch.preload = function () {
        logoData = sketch.loadJSON('logo/vibes.json');
    }

    sketch.setup = function () {
        sketch.createCanvas(scl * 800, scl * 800);
        sketch.colorMode(sketch.HSB, 360, 255, 255, 255);
    }

    sketch.draw = function () {
        sketch.background(5);
        if (sketch.random(1) < 0.1) {
            sketch.changeColors();
        }
        for (let v of logoData.vibes) {
            sketch.beginShape();
            for (let p of v.points) {
                sketch.vertex(scl * p.x, scl * p.y);
            }
            sketch.endShape(sketch.CLOSE);
        }
    }

    sketch.changeColors = function () {
        sketch.fill(sketch.floor(sketch.random(0, 360)), 255, 255, 255);
    }
};

///RAIN
const s4 = (sketch) => {
    let logo;
    let pxl;
    let gravity;
    let rain;
    let wind;
    let w;
    let wOff;


    sketch.preload = function () {
        logo = sketch.loadImage('logo/logo.png');
    }

    sketch.setup = function () {
        sketch.createCanvas(800, 800);
        pxl = new Array(sketch.width);
        logo.loadPixels();
        let d = sketch.pixelDensity();
        for (let x = 0; x < sketch.width; x++) {
            pxl[x] = new Array(sketch.height);
            for (let y = 0; y < sketch.height; y++) {
                let off = (y * sketch.width + x) * 4;
                if (logo.pixels[off + 3] == 255) {
                    pxl[x][y] = 255;
                }
            }
        }

        gravity = sketch.createVector(0, 1);
        w = sketch.createVector(0, 0);
        wOff = 0;
        rain = new Array(0);
        for (let i = 0; i < 4500; i++) {
            let d = new Drop();
            d.randomize();
            rain.push(d);
        }
    }

    sketch.draw = function () {
        sketch.background(5);
        for (let i = 0; i < rain.length; i++) {
            rain[i].update();
            rain[i].render();
        }
    }

    class Drop {

        constructor() {
            this.ppos = sketch.createVector(0, 0);
            this.pos = sketch.createVector(0, 0);
            this.vel = sketch.createVector(0, 0);
            this.acc = sketch.createVector(0, 0);
            this.terminalvelocity = 10;
            this.z = 0;
        }

        randomize() {
            this.pos = sketch.createVector(sketch.random(0, sketch.width), sketch.random(-2 * sketch.height, -100));
            this.ppos = this.pos.copy();
            this.vel = sketch.createVector(0, 0);
            this.acc = sketch.createVector(0, 0);
            this.z = 3 * sketch.pow(sketch.random(0.5, 1), 3);
        }

        update() {
            this.ppos = this.pos.copy();
            this.acc.add(gravity);
            let xOff = this.pos.x / sketch.width;
            let yOff = this.z;
            wind = w.copy();
            wind.x += 0.9 * (sketch.noise(xOff, yOff, wOff) - 0.2);
            wOff += 0.5;

            this.acc.add(wind);

            this.vel.add(this.acc);
            this.vel.limit(this.terminalvelocity * this.z);
            this.pos.add(this.vel);
            if (this.pos.y > sketch.height && this.ppos.y > sketch.height) {
                this.randomize();
            }
            if (this.pos.x < 0 && this.ppos.x < 0) {
                this.pos.x = sketch.width;
                this.ppos.x = sketch.width;
            }
            if (this.pos.x > sketch.width && this.ppos.x > sketch.width) {
                this.pos.x = 0;
                this.ppos.x = 0;
            }
        }

        render() {
            sketch.noFill();
            let x = sketch.floor(this.pos.x);
            let y = sketch.floor(this.pos.y);
            if (x >= 0 && x < sketch.width && y >= 0 && y < sketch.height) {
                if (pxl[x][y]) {
                    sketch.stroke(sketch.floor(sketch.random(200, 255)), sketch.floor(sketch.random(0, 50)), sketch.floor(sketch.random(0, 50)), 150);
                } else {
                    sketch.stroke(220, 220, 255, 150);
                }
                sketch.strokeWeight(1 * this.z);
                sketch.line(this.ppos.x, this.ppos.y, this.pos.x, this.pos.y);
            }
        }
    }
};

///NEW
const s5 = (sketch) => {

    let logoData;
    let particles;

    sketch.preload = function () {
        logoData = sketch.loadJSON('logo/vibes.json');
    }

    sketch.setup = function () {
        sketch.createCanvas(800, 800);
        particles = new Array(3);
        for (let i = 0; i < particles.length; i++) {
            particles[i] = new Particle(i);
        }
    }

    sketch.draw = function () {
        sketch.background(52);
        sketch.noStroke();
        for (let v of logoData.vibes) {
            sketch.beginShape();
            for (let p of v.points) {
                sketch.vertex(p.x, p.y);
            }
            sketch.endShape(sketch.CLOSE);
        }
        for (let p of particles) {
            p.show();
            p.update();
        }
    }

    class Particle {

        constructor(v) {
            this.vibeIndex = v;
            this.speed = 1;
            this.index = 0;
            this.pos = sketch.createVector(logoData.vibes[this.vibeIndex].points[this.index].x, logoData.vibes[this.vibeIndex].points[this.index].y);
            this.nextIndex = (this.index + 1) % logoData.vibes[this.vibeIndex].points.length;
            this.posNext = sketch.createVector(logoData.vibes[this.vibeIndex].points[this.nextIndex].x, logoData.vibes[this.vibeIndex].points[this.nextIndex].y);
            this.path = p5.Vector.sub(this.posNext, this.pos);
            this.distance = this.path.mag();
            this.direction = this.path.normalize();
        }

        update() {
            this.pos.add(this.direction.mult(this.speed));
            this.path = p5.Vector.sub(this.posNext, this.pos);
            this.distance = this.path.mag();
            if (this.distance < this.speed) {
                this.index++;
                this.nextIndex = (this.index + 1) % logoData.vibes[this.vibeIndex].points.length;
                this.posNext = sketch.createVector(logoData.vibes[this.vibeIndex].points[this.nextIndex].x, logoData.vibes[this.vibeIndex].points[this.nextIndex].y);
                this.path = p5.Vector.sub(this.posNext, this.pos);
                this.distance = this.path.mag();
            }
            this.direction = this.path.normalize();
        }

        show() {
            sketch.stroke(255, 0, 0);
            sketch.strokeWeight(4);
            sketch.point(this.pos.x, this.pos.y);
        }
    }
};

// Assign p5 instances to DIVs
let p51 = new p5(s1, 'canvas1');
let p52 = new p5(s2, 'canvas2');
let p53 = new p5(s3, 'canvas3');
let p54 = new p5(s4, 'canvas4');
let p55 = new p5(s5, 'canvas5');