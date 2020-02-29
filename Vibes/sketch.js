let logo;
let y = 0;
let red;

function preload() {
    logo = loadImage('logo/logo.png');
}

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');
    red = floor(random(0, 255));
    console.log(red);
    
}

function draw() {
    background(51);
    logo.loadPixels();
    let d = pixelDensity();
    for (let x = 0; x < width; x++) {
        let off = (y * width + x) * d * 4;
        
        if (logo.pixels[off + 3] == 255) {
            for (let i = 0; i < d; i++) {
                logo.pixels[off + i] = red;
                logo.pixels[off + i + 1] = 0;
                logo.pixels[off + i + 2] = 0;
                logo.pixels[off + i + 3] = red;
            }
        }
    }
    logo.updatePixels();

    //draw the image
    image(logo, 0, 0);

    y++;
    if (y >= height) {
        y = 0;
        red = floor(random(0, 255));
        console.log(red);
        preload();
    }
}