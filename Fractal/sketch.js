let angle;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(400, 400);
    canvas.parent('canvas');
    createP().parent('canvas');
    angle = PI / 4;
}

function draw() {
    angle = map(mouseY, 0, height, 0, PI);
    background(51);
    stroke(255);
    translate(200, height);
    branch(100);
}

function branch(len) {
    strokeWeight(len / 16);
    line(0, 0, 0, -len);
    translate(0, -len);
    if (len > 4) {
        push();
        rotate(angle);
        branch(len * 0.67);
        pop();
        push();
        rotate(-angle);
        branch(len * 0.67);
        pop();
    }

}