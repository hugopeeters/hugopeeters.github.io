let target;
let vehicles = [];
let food = [];
let field = [];
let genChart;
let ancChart;
let ancColors = [];
let generations = [];
let ancestorSeries = [];
let maxGens;
let ageChart;
let ages = [];
let maxAge;
let FPS = 10;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(650, 1200);
    canvas.parent('canvas');
    createP().parent('canvas');
    maxGens = 40;
    maxAge = 40;
    field = new Array(2);
    field[0] = createVector(25, 25);
    field[1] = createVector(625, 625);
    generations = new Array(maxGens);
    ancColors = createColorArray(50);
    for (let i = 0; i < maxGens; i++) {
        generations[i] = 0;
    }
    genChart = new BarChart(createVector(25, 900), 600, 125, generations, "GENERATION");
    ancChart = new StackedAreaChart(createVector(25, 650), 600, 225, ancestorSeries, "ANCESTORS");
    ages = new Array(maxAge);
    for (let i = 0; i < maxAge; i++) {
        ages[i] = 0;
    }
    ageChart = new BarChart(createVector(25, 1050), 600, 125, ages, "AGE");

    frameRate(FPS);
    target = createVector(0, 0);
    for (let i = 0; i < 50; i++) {
        vehicles.push(new Vehicle(createVector(random(field[0].x, field[1].x), random(field[0].y, field[1].y)), i));
    }
    addPoison();
    addFood();
}

function draw() {
    background(26);
    //food
    for (let i = food.length - 1; i >= 0; i--) {
        food[i].render();
    }

    //vehicles
    for (let i = vehicles.length - 1; i >= 0; i--) {
        let v = vehicles[i];
        v.render();
        v.avoidEdges();
        v.seekList(food);
        v.seekOthers();
        v.update();
        //clone
        if (random(1) < 0.007 * v.health) {
            let newV = new Vehicle(createVector(random(field[0].x, field[1].x), random(field[0].y, field[1].y)), v.ancestor, v.dna.copy(), v.generation + 1);
            vehicles.push(newV);
        }
        //death
        if (v.health <= 0) {
            food.push(new Food(v.pos.copy(), true, food.length));
            vehicles.splice(i, 1);
        }
    }

    //keep adding food
    if (food.length < 100 + vehicles.length) {
        addPoison();
        addFood();
    }

    //playing field
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CORNERS);
    rect(field[0].x, field[0].y, field[1].x, field[1].y);

    //stats
    calculateStats();
    genChart.render();
    ancChart.render();
    ageChart.render();
}