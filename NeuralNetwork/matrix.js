class Matrix {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = new Array(rows);
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = new Array(cols);
        }
    }

    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                //this.data[i][j] = floor(random(10)); //random integers between 0 and 10
                this.data[i][j] = random(2) - 1; //random values between -1 and +1
            }
        }
    }

    printMatrix() {
        println(this.rows + "x" + this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                print(this.data[i][j]);
                print(", ");
            }
            println();
        }
        println();
    }

    //element-wise operations

    multiply(n) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] *= n;
            }
        }
    }

    add(n) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] += n;
            }
        }
    }

    subtract(n) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] -= n;
            }
        }
    }
}


//matrix-wise operations (static functions)

function dotProduct(A, B) {
    //println(A.rows + " " + A.cols + " " + B.rows + " " + B.cols);
    let AB = new Matrix(A.rows, B.cols);
    for (let i = 0; i < AB.rows; i++) {
        for (let j = 0; j < AB.cols; j++) {
            AB.data[i][j] = 0;
            for (let x = 0; x < A.cols; x++) {
                AB.data[i][j] += A.data[i][x] * B.data[x][j];
            }
        }
    }
    return AB;
}

function transpose(M) {
    let T = new Matrix(M.cols, M.rows);
    for (let i = 0; i < M.rows; i++) {
        for (let j = 0; j < M.cols; j++) {
            T.data[j][i] = M.data[i][j];
        }
    }
    return T;
}

function multiplyMatrices(A, B) {
    let S = new Matrix(A.rows, A.cols);
    for (let i = 0; i < A.rows; i++) {
        for (let j = 0; j < A.cols; j++) {
            S.data[i][j] = A.data[i][j] * B.data[i][j];
        }
    }
    return S;
}

function addMatrices(A, B) {
    let S = new Matrix(A.rows, A.cols);
    for (let i = 0; i < A.rows; i++) {
        for (let j = 0; j < A.cols; j++) {
            S.data[i][j] = A.data[i][j] + B.data[i][j];
        }
    }
    return S;
}

function subtractMatrices(A, B) {
    let S = new Matrix(A.rows, A.cols);
    for (let i = 0; i < A.rows; i++) {
        for (let j = 0; j < A.cols; j++) {
            S.data[i][j] = A.data[i][j] - B.data[i][j];
        }
    }
    return S;
}