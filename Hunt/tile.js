class Tile {

    constructor(i, j, type, value, imgx, imgy) {
        this.i = i;
        this.j = j;
        this.idx = 7 * this.j + this.i;
        this.type = type;
        this.orientation = floor(random(4)); //0, 1, 2, 3 = U, R, D, L
        this.hidden = true;
        this.exists = true;
        this.value = value;
        this.margin = 10;
        this.imgx = imgx;
        this.imgy = imgy
        this.redraw = false;
    }

    overwriteWith(target) {

        //this "tile" remains at the same spot in the array, representing the same spot on the board. The properties representing the tile get overwritten.
        this.type = target.type;
        this.orientation = target.orientation;
        this.hidden = target.hidden;
        this.exists = target.exists;
        this.value = target.value;
        this.imgx = target.imgx;
        this.imgy = target.imgy;
    }

    clear() {

        //this "tile" remains at the same spot in the array, representing the same spot on the board. The properties representing the tile get cleared.
        this.type = '';
        this.orientation = null;
        this.hidden = false;
        this.exists = false;
        this.value = 0;
        this.imgx = null;
        this.imgy = null;
    }

    draw() {
        if (this.type != '' && this.idx < 49) {
            push();
            let x = (this.i + 0.5) * width / 7;
            let y = (this.j + 0.5) * height / 7;
            translate(x, y);

            //tile fill
            if (this.hidden) {

                //tile back
                image(tileImg, this.margin - width / 14, this.margin - height / 14, width / 7 - 2 * this.margin, height / 7 - 2 * this.margin, 232, 0, 114, 114);
            }
            else {

                //tile image
                if (
                    mouseIsPressed && this.idx == beginTileIndex &&
                    (
                        ((this.type == "bear" || this.type == "fox") && activePlayer == "Animals") ||
                        ((this.type == "hunter -->" || this.type == "lumberjack") && activePlayer == "Humans") ||
                        (this.type == "duck" || this.type == "feasant")
                    ) && (!this.hidden)
                ) {
                    translate(mouseX - x, mouseY - y);
                    rotate(this.orientation * TWO_PI / 4);
                    image(tileImg, this.margin - width / 14, this.margin - height / 14, width / 7 - 2 * this.margin, height / 7 - 2 * this.margin, this.imgx, this.imgy, 114, 114);
                } else {
                    rotate(this.orientation * TWO_PI / 4);
                    image(tileImg, this.margin - width / 14, this.margin - height / 14, width / 7 - 2 * this.margin, height / 7 - 2 * this.margin, this.imgx, this.imgy, 114, 114);
                }
            }

            //tile edge
            if (
                (finalPhaseCountdown > 0 && this.idx == idx && !mouseIsPressed || mouseIsPressed && this.idx == beginTileIndex) &&
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
                if (activePlayer == "Humans") {
                    stroke(255, 0, 0); //red
                } else {
                    stroke(0, 0, 255); //blue
                }
                strokeWeight(2);
                rect(this.margin - width / 14, this.margin - height / 14, width / 7 - 2 * this.margin, height / 7 - 2 * this.margin);
            } else {
                noFill();
                stroke(200); //light grey
                strokeWeight(2);
                rect(this.margin - width / 14, this.margin - height / 14, width / 7 - 2 * this.margin, height / 7 - 2 * this.margin);
            }
            pop();
        }
    }
}

let tileset =
{
    "types": [
        { "name": "bear", "value": 10, "count": 2, "img-x": 0, "img-y": 0 },
        { "name": "hunter -->", "value": 5, "count": 8, "img-x": 0, "img-y": 114 },
        { "name": "lumberjack", "value": 5, "count": 2, "img-x": 114, "img-y": 114 },
        { "name": "fox", "value": 5, "count": 6, "img-x": 114, "img-y": 0 },
        { "name": "feasant", "value": 3, "count": 8, "img-x": 0, "img-y": 228 },
        { "name": "duck", "value": 2, "count": 7, "img-x": 114, "img-y": 228 },
        { "name": "tree", "value": 2, "count": 7, "img-x": 0, "img-y": 342 },
        { "name": "tree", "value": 2, "count": 8, "img-x": 114, "img-y": 342 }
    ]
};