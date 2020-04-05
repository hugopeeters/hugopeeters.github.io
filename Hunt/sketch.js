let tileArray = []; //really the array of places on the board, so empty places are tiles with .exist == false
let p, p1;
let idx;
let beginTileIndex, endTileIndex;
let activePlayer = 'Humans'; //Humans start the game
let scoreHumans = 0;
let scoreAnimals = 0;
let finalPhase = false;

function setup() {
    createP().parent('canvas');
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas');
    p = createP().parent('canvas');
    p.addClass('p');
    p1 = createP().parent('canvas');
    p1.addClass('p1');

    //create the blank space in the center of the board
    tileArray.push(new Tile(3, 3, '', 0))
    tileArray[0].exists = false;

    //create all 48 tiles in the game
    tileset.types.forEach(tileType => {
        for (let x = 0; x < tileType.count; x++) {

            //put each tile in a random available position on the board
            let [i, j] = selectRandomFreePosition();
            tileArray.push(new Tile(i, j, tileType.name, tileType.value));
        }
    });

    //sort the tileArray by idx so that we can use it easily
    tileArray.sort((a, b) => a.idx - b.idx);

    console.log(tileArray);
}

function draw() {
    background(51);

    for (tile of tileArray) {
        if (tile != 0) {
            //board grid
            tile.drawBoard();
            //tile itself
            tile.draw();
        }
    }

    //CHECK IF ALL TILES HAVE BEEN REVEALED, THEN START FINAL PHASE
    if (!finalPhase) {
        let allRevealed = true;
        for (t of tileArray) {
            if (t.exists && t.hidden) {
                allRevealed = false;
            }
        }
        if (allRevealed) {
            finalPhase = true;
            console.log("all tiles have been revealed, the final phase has started");
        }
    }

    //determine index of tile pointed at
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        let i = floor(mouseX / (width / 7));
        let j = floor(mouseY / (height / 7));
        idx = 7 * j + i;
    }

    //check if a click or drag has been completed
    if (beginTileIndex && endTileIndex) {
        if (beginTileIndex == endTileIndex) {
            tileClicked(beginTileIndex);
        } else {
            tileDragged(beginTileIndex, endTileIndex);
        }
        //reset indices
        beginTileIndex = null;
        endTileIndex = null;
    }

    //debugging info
    //document.getElementsByClassName('p')[0].innerHTML = idx + " - " + startingTileIdx + " - " + hoverTileIdx;

    //game info
    document.getElementsByClassName('p1')[0].innerHTML = "Active Player: " + activePlayer + "</br>Humans: " + scoreHumans + " - Animals: " + scoreAnimals;

}

function tileClicked(t) {
    //console.log("clicked tile " + t);

    let tile = tileArray[t];

    //open a hidden tile
    if (tile.hidden) {
        console.log(activePlayer + " opened tile " + t + " revealing a " + tile.type);

        tile.hidden = false;
        endTurn();
    }
}

function tileDragged(t1, t2) {
    //console.log("dragged tile " + t1 + " to tile " + t2);

    let tile = tileArray[t1];
    let target = tileArray[t2];

    //make sure the player is allowed to use this tile
    if (
        ((tile.type == "bear" || tile.type == "fox") && activePlayer == "Animals") ||
        ((tile.type == "hunter -->" || tile.type == "lumberjack") && activePlayer == "Humans") ||
        (tile.type == "duck" || tile.type == "feasant")
    ) {
        //handle action
        if (!target.exists) {
            //tried to move to an empty space
            console.log(activePlayer + " tried to move to an empty tile at " + t2 + " using a " + tile.type + " at " + t1);
            if (validateMove(tile, target)) {
                executeMove(tile, target);
            }
            else {
                console.log("move not allowed")
            }
        } else if (target.hidden) {
            //tried to attack a hidden tile
            console.log(activePlayer + " tried to attack a hidden tile at " + t2 + " using a " + tile.type + " at " + t1);
            //this is not a valid move, so do nothing
        } else {
            //tried to attack an open tile
            console.log(activePlayer + " tried to attack a " + target.type + " at " + t2 + " using a " + tile.type + " at " + t1);
            attack(tile, target);
        }
    }
}

function validateMove(t1, t2) {
    let allowed = true;
    //VERTICAL OR HORIZONTAL MOVE?
    if (t1.i == t2.i) {
        //console.log("vertical move");
        //CHECK DISTANCE FOR SLOW TILES
        if (t1.type == "bear" || t1.type == "lumberjack") {
            if (abs(t1.j - t2.j) > 1) {
                allowed = false;
                console.log("step too big");
            }
        }
        //TILES IN BETWEEN EMPTY?
        if (t1.j < t2.j) {
            for (let n = t1.j + 1; n < t2.j; n++) {
                let checkIndex = 7 * n + t1.i;
                if (tileArray[checkIndex].exists) {
                    allowed = false;
                }
            }
        } else {
            for (let n = t2.j + 1; n < t1.j; n++) {
                let checkIndex = 7 * n + t1.i;
                if (tileArray[checkIndex].exists) {
                    allowed = false;
                }
            }
        }
    } else if (t1.j == t2.j) {
        //CHECK DISTANCE FOR SLOW TILES
        if (t1.type == "bear" || t1.type == "lumberjack") {
            if (abs(t1.i - t2.i) > 1) {
                allowed = false;
                console.log("step too big");
            }
        }
        //console.log("horizontal move");
        //TILES IN BETWEEN EMPTY?
        if (t1.i < t2.i) {
            for (let n = t1.i + 1; n < t2.i; n++) {
                let checkIndex = 7 * t1.j + n;
                if (tileArray[checkIndex].exists) {
                    allowed = false;
                }
            }
        } else {
            for (let n = t2.i + 1; n < t1.i; n++) {
                let checkIndex = 7 * t1.j + n;
                if (tileArray[checkIndex].exists) {
                    allowed = false;
                }
            }
        }
    } else {
        console.log("diagonal move");
        allowed = false;
    }
    return allowed;
}

function executeMove(t1, t2) {
    console.log("move allowed; excecuting move");
    //COPY PROPERTIES TO TARGET TILE
    t2.overwriteWith(t1);
    //CLEAR SOURCE TILE
    t1.clear();
    //end the turn
    endTurn();
}

function attack(attacker, prey) {
    //CHECK IF ATTACK IS POSSIBLE
    if (validateMove(attacker, prey)) {
        if (
            (attacker.type == "hunter -->" &&
                (prey.type == "bear" || prey.type == "fox" || prey.type == "feasant" || prey.type == "duck") &&
                (
                    (attacker.orientation == 3 && attacker.i == prey.i && attacker.j > prey.j) ||
                    (attacker.orientation == 2 && attacker.j == prey.j && attacker.i > prey.i) ||
                    (attacker.orientation == 1 && attacker.i == prey.i && attacker.j < prey.j) ||
                    (attacker.orientation == 0 && attacker.j == prey.j && attacker.i < prey.i)
                )
            ) ||
            (attacker.type == "lumberjack" && prey.type == "tree") ||
            (attacker.type == "bear" && (prey.type == "hunter -->" || prey.type == "lumberjack")) ||
            (attacker.type == "fox" && (prey.type == "feasant" || prey.type == "duck"))
        ) {
            //ADD POINTS TO SCORE
            if (activePlayer == "Humans") {
                scoreHumans += prey.value;
            } else {
                scoreAnimals += prey.value;
            }

            //console.log("attacker orientation: " + attacker.orientation);

            //MOVE TILE
            executeMove(attacker, prey);
        } else {
            console.log("attack not allowed");
        }
    }
    else {
        console.log("move not allowed, aborting attack");
    }
}

function mousePressed() {
    if (mouseButton == LEFT && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        //console.log("PRESSED at " + idx);
        beginTileIndex = idx;
    }
    return false;
}

function mouseReleased() {
    //console.log("RELEASED at " + idx);
    endTileIndex = idx;
}

function endTurn() {
    if (activePlayer == 'Humans') {
        activePlayer = 'Animals';
    } else {
        activePlayer = 'Humans';
    }
}

function selectRandomFreePosition() {
    let i = floor(random(7));
    let j = floor(random(7));
    let free = true;
    for (tile of tileArray) {
        if (tile.i == i && tile.j == j) {
            free = false;
        }
    }
    if (!free) {
        return selectRandomFreePosition();
    }
    else {
        return [i, j];
    }
}