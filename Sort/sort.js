const s = (sketch) => {

    //BUBBLE SORT
    let srcArr = [];
    let myList = new Array(200);
    let i = 0;
    let index;

    sketch.setup = function () {
        for (let i = 0; i < myList.length; i++) {
            srcArr[i] = i + 1;
        }
        for (let i = 0; i < myList.length; i++) {
            myList[i] = srcArr.splice(Math.floor(Math.random() * srcArr.length), 1)[0];
        }
        let repeat = false;
        sketch.createCanvas(800, 400);
        sketch.frameRate(10);
        console.log(myList);
        visualizeArray(myList, null);
        index = myList.length - 1;
    };

    sketch.draw = function () {

        //loop through the array (skip the last item) bubble high values up
        for (let i = 0; i < index; i++) {
            if (myList[i] > myList[i + 1]) {

                //swap
                let temp = myList[i];
                myList[i] = myList[i + 1];
                myList[i + 1] = temp;

                //make sure we repeat
                repeat = true;
            }
        }
        visualizeArray(myList, index);
        if (!repeat) {
            sketch.noLoop();
        }
        index--;
    };

    function visualizeArray(arr, highlight) {
        sketch.background(200);
        let margin = 10;
        let barWidth = (sketch.width - 2 * margin) / arr.length;
        let barHeightUnit = (sketch.height - 2 * margin) / arr.length;
        sketch.stroke(255);
        for (let i = 0; i < arr.length; i++) {
            if (highlight != null && highlight == i) {
                sketch.fill(255, 0, 0);
            } else {
                sketch.fill(52);
            }
            sketch.rect(margin + i * barWidth, sketch.height - margin - arr[i] * barHeightUnit, barWidth, arr[i] * barHeightUnit);
        }
    }
};

const z = (sketch2) => {

    //SELECTION SORT
    let srcArr = [];
    let myList = new Array(200);
    let i = 0;

    sketch2.setup = function () {
        sketch2.createCanvas(800, 400);
        sketch2.frameRate(10);
        for (let i = 0; i < myList.length; i++) {
            srcArr[i] = i + 1;
        }
        for (let i = 0; i < myList.length; i++) {
            myList[i] = srcArr.splice(sketch2.random(0, srcArr.length), 1)[0];
        }
        console.log(myList);
        visualizeArray(myList, null);
    };

    sketch2.draw = function () {

        //find smallest
        let smallest = myList[i];
        let index = i;
        for (let j = i; j < myList.length; j++) {
            if (myList[j] < smallest) {
                smallest = myList[j];
                index = j;
            }
        }

        //swap
        let temp = myList[i];
        myList[i] = myList[index];
        myList[index] = temp;
        visualizeArray(myList, i);

        i++;
        if (i >= myList.length) {
            sketch2.noLoop();
        }
    };

    function visualizeArray(arr, highlight) {
        sketch2.background(200);
        let margin = 10;
        let barWidth = (sketch2.width - 2 * margin) / arr.length;
        let barHeightUnit = (sketch2.height - 2 * margin) / arr.length;
        sketch2.stroke(255);
        for (let i = 0; i < arr.length; i++) {
            if (highlight != null && highlight == i) {
                sketch2.fill(255, 0, 0);
            } else {
                sketch2.fill(52);
            }
            sketch2.rect(margin + i * barWidth, sketch2.height - margin - arr[i] * barHeightUnit, barWidth, arr[i] * barHeightUnit);
        }
    }
};

let p51 = new p5(z, 'canvas1');
let p52 = new p5(s, 'canvas2');