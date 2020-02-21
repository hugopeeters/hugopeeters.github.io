let srcArr = [];
let myList = new Array(100);
let i = 0;
let repeat = false;

function setup() {
    createCanvas(800, 400);
    frameRate(10);
    for (let i = 0; i < myList.length; i++) {
        srcArr[i] = i + 1;
    }
    for (let i = 0; i < myList.length; i++) {
        myList[i] = srcArr.splice(random(0, srcArr.length), 1)[0];
    }
    console.log(myList);
    visualizeArray(myList, null);
}

function draw() {

    //loop through the array (skip the last item) bubble high values up
    for (let i = 0; i < myList.length - 1; i++) {
        if (myList[i] > myList[i + 1]) {

            //swap
            let temp = myList[i];
            myList[i] = myList[i + 1];
            myList[i + 1] = temp;

            //make sure we repeat
            repeat = true;
        }
    }
    visualizeArray(myList, null);
    if (!repeat) {
        noLoop();
    }
}

function visualizeArray(arr, highlight) {
    background(200);
    let margin = 10;
    let barWidth = (width - 2 * margin) / arr.length;
    let barHeightUnit = (height - 2 * margin) / arr.length;
    stroke(255);
    for (let i = 0; i < arr.length; i++) {
        if (highlight != null && highlight == i) {
            fill(255, 0, 0);
        } else {
            fill(52);
        }
        rect(margin + i * barWidth, height - margin - arr[i] * barHeightUnit, barWidth, arr[i] * barHeightUnit);
    }
}