const s1 = (sketch) => {
    let logoData;
    let scl = 0.6666667;

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

let p51 = new p5(s1, 'canvas1');