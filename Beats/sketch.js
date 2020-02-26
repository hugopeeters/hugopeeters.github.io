let soundNames = ["cl_hihat", "claves", "conga1", "cowbell", "crashcym", "handclap", "hi_conga", "hightom", "kick1", "kick2", "maracas", "open_hh", "rimshot", "snare", "tom1"];
let numBars = 4;
let grid;
let leftMargin = 75;
let playLoop = false;
let speed = 10; //one count is this many frames
let startFrame;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');
    for (let soundName of soundNames) {
        loadSound(soundName);
    }
    grid = new Grid();
    frameRate(100);
}

function draw() {
    background(51);
    grid.draw();
    if (playLoop) {
        if ((frameCount - startFrame) % speed == 0) {
            console.log("tick");
            grid.play(floor((frameCount - startFrame) / speed));
        }
        noFill();
        stroke(0, 0, 255);
        strokeWeight(2);
        let x = leftMargin + ((frameCount - startFrame) * grid.cellWidth / speed) % (width - leftMargin);
        line(x, 0, x, height);
    }
}

function mouseClicked() {
    if (mouseX > leftMargin && mouseX < width && mouseY > 0 && mouseY < height) {
        let col = floor((mouseX - leftMargin) / grid.cellWidth);
        let row = floor(mouseY / grid.cellHeight);
        if (!playLoop) {
            playSound(soundNames[row]);
        }
        grid.toggle(col, row);
    }
}

function keyPressed() {
    playLoop = !playLoop;
    startFrame = frameCount;
    console.log("Playing: " + playLoop);
}

function loadSound(soundID) {
    createjs.Sound.registerSound("sounds/" + soundID + ".mp3", soundID);
    //console.log("sound " + soundID + " registered");
}

function playSound(soundID) {
    createjs.Sound.play(soundID);
    //console.log("sound " + soundID + " played");
}