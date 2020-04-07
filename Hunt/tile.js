class Tile {

    constructor(i, j, type, value) {
        this.i = i;
        this.j = j;
        this.idx = 7 * this.j + this.i;
        this.type = type;
        this.orientation = floor(random(4)); //0, 1, 2, 3 = U, R, D, L
        this.hidden = true;
        this.exists = true;
        this.value = value;
    }

    overwriteWith(target) {
        //this "tile" remains at the same spot in the array, representing the same spot on the board. The properties representing the tile get overwritten.
        this.type = target.type;
        this.orientation = target.orientation;
        this.hidden = target.hidden;
        this.exists = target.exists;
        this.value = target.value;
    }

    clear() {
        //this "tile" remains at the same spot in the array, representing the same spot on the board. The properties representing the tile get cleared.
        this.type = '';
        this.orientation = null;
        this.hidden = false;
        this.exists = false;
        this.value = 0;
    }

    drawBoard() {
        if (this.idx < 49) {
            push();
            let x = (this.i + 0.5) * width / 7;
            let y = (this.j + 0.5) * height / 7;
            translate(x, y);
            noFill();
            stroke(100);
            strokeWeight(1);
            rect(-width / 14, -height / 14, width / 7, height / 7);
            pop();
        }
    }

    draw() {
        if (this.type != '' && this.idx < 49) {
            push();
            let x = (this.i + 0.5) * width / 7;
            let y = (this.j + 0.5) * height / 7;
            translate(x, y);
            //tile edge
            if (
                (this.idx == idx && !mouseIsPressed || mouseIsPressed && this.idx == beginTileIndex) &&
                (
                    (
                        (
                            ((this.type == "bear" || this.type == "fox") && activePlayer == "Animals") ||
                            ((this.type == "hunter -->" || this.type == "lumberjack") && activePlayer == "Humans") ||
                            (this.type == "duck" || this.type == "feasant")
                        ) && (!this.hidden)
                    ) ||
                    (this.hidden)
                )
            ) {
                noFill();
                stroke(255, 0, 0); //red
                strokeWeight(2);
                rect(4 - width / 14, 4 - height / 14, width / 7 - 8, height / 7 - 8);
            } else {
                noFill();
                stroke(200); //light grey
                strokeWeight(2);
                rect(4 - width / 14, 4 - height / 14, width / 7 - 8, height / 7 - 8);
            }
            //tile fill
            if (this.hidden) {
                noStroke();
                fill(73, 128, 28); //dark green
                rect(5 - width / 14, 5 - height / 14, width / 7 - 10, height / 7 - 10);
            }
            else {
                //tile background
                if (this.type == "bear" || this.type == "fox") {
                    fill(96, 99, 158); //subdued blue
                } else if (this.type == "hunter -->" || this.type == "lumberjack") {
                    fill(228, 202, 123); //light brown/yellow
                } else if (this.type == "feasant" || this.type == "duck") {
                    fill(152, 203, 110); //light green
                } else {

                    fill(109, 166, 63); //medium green
                }
                noStroke();
                rect(5 - width / 14, 5 - height / 14, width / 7 - 10, height / 7 - 10);
                //tile text
                rotate(this.orientation * TWO_PI / 4);
                noStroke();
                fill(0);
                textSize(18);
                textAlign(CENTER, CENTER);
                text(this.type, 0, 0);
            }
            pop();
        }
    }
}

let tileset =
{
    "types": [
        { "name": "bear", "value": 10, "count": 2 },
        { "name": "hunter -->", "value": 5, "count": 8 },
        { "name": "lumberjack", "value": 5, "count": 2 },
        { "name": "fox", "value": 5, "count": 6 },
        { "name": "feasant", "value": 3, "count": 8 },
        { "name": "duck", "value": 2, "count": 7 },
        { "name": "tree", "value": 2, "count": 15 }
    ]
};