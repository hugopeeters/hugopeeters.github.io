let soundNames = ["cl_hihat", "claves", "conga1", "cowbell", "crashcym", "handclap", "hi_conga", "hightom", "kick1", "kick2", "maracas", "open_hh", "rimshot", "snare", "tom1"];

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas');
    createP().parent('canvas');
    for (let soundName of soundNames) {
        loadSound(soundName);
    }
}

function draw() {
    background(51);
}

function mouseClicked() {
    //playSound(random(soundNames));
}

function loadSound(soundID) {
    createjs.Sound.registerSound("sounds/" + soundID + ".mp3", soundID);
    console.log("sound " + soundID + " registered");

}

function playSound(soundID) {
    createjs.Sound.play(soundID);
    console.log("sound " + soundID + " played?");

}