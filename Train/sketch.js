let stations = [];
let stationSize = 16;
let margin;
let route;
let train;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    createP().parent('canvas');

    margin = 0.1 * width;

    stations.push(new Station);
    stations.push(new Station);
    stations.push(new Station);

    route = new Route();
    route.addStation(stations[0]);
    route.addStation(stations[1]);
    route.addStation(stations[2]);

    train = new Train(route);
}

function draw() {
    background(52);
    translate(width / 2, height / 2);

    // if (frameCount % 240 == 0) {
    //     stations.push(new Station);
    // }

    for (let s of stations) {
        s.show();
    }
    route.show();
    train.show();
    train.update();
}