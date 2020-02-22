function sigmoid(x) {
    return 1 / (1 + exp(-x));
}

function dsigmoid(x) {
    return x * (1 - x);
}

class NN {

    constructor(input_count, hidden1_count, hidden2_count, output_count) {
        this.input_count = input_count;
        this.hidden1_count = hidden1_count;
        this.hidden2_count = hidden2_count;
        this.output_count = output_count;
        this.hidden1;
        this.hidden2;
        this.outputs;
        this.inputs = new Matrix(input_count, 1);
        this.weights_ih = new Matrix(this.hidden1_count, this.input_count);
        this.weights_ih.randomize();
        this.bias_ih = new Matrix(this.hidden1_count, 1);
        this.bias_ih.randomize();
        this.weights_hh = new Matrix(this.hidden2_count, this.hidden1_count);
        this.weights_hh.randomize();
        this.bias_hh = new Matrix(this.hidden2_count, 1);
        this.bias_hh.randomize();
        this.weights_ho = new Matrix(this.output_count, this.hidden2_count);
        this.weights_ho.randomize();
        this.bias_ho = new Matrix(this.output_count, 1);
        this.bias_ho.randomize();
        let cellWidth = width / 18;
        let comp = [this.input_count, this.hidden1_count, this.hidden2_count, this.output_count];
        let numCellsHigh = max(comp);
        let cellHeight = height / numCellsHigh;
        this.cellSize = min(cellWidth, cellHeight);
        this.inputNodes = new Array(this.input_count);
        for (let i = 0; i < this.input_count; i++) {
            this.inputNodes[i] = new Node(1.5 * this.cellSize, (0.5 + i) * this.cellSize, 0.5 * this.cellSize);
        }
        this.hidden1Nodes = new Array(hidden1_count);
        for (let i = 0; i < this.hidden1_count; i++) {
            this.hidden1Nodes[i] = new Node(3.5 * this.cellSize, (0.5 + i) * this.cellSize, 0.5 * this.cellSize);
        }
        this.hidden2Nodes = new Array(hidden2_count);
        for (let i = 0; i < this.hidden2_count; i++) {
            this.hidden2Nodes[i] = new Node(5.5 * this.cellSize, (0.5 + i) * this.cellSize, 0.5 * this.cellSize);
        }
        this.outputNodes = new Array(output_count);
        for (let i = 0; i < this.output_count; i++) {
            this.outputNodes[i] = new Node(7.5 * this.cellSize, (0.5 + i) * this.cellSize, 0.5 * this.cellSize);
        }
    }

    predict(input_array) {
        //fill input matrix
        for (let i = 0; i < input_array.length; i++) {
            this.inputs.data[i][0] = input_array[i];
        }
        //inputs.printMatrix();
        //weights_ih.printMatrix();

        //calculate hidden layer values
        this.hidden1 = dotProduct(this.weights_ih, this.inputs);
        //hidden1.printMatrix();
        for (let i = 0; i < this.hidden1_count; i++) {
            this.hidden1.data[i][0] += this.bias_ih.data[i][0];
            this.hidden1.data[i][0] = sigmoid(this.hidden1.data[i][0]);
        }
        this.hidden2 = dotProduct(this.weights_hh, this.hidden1);
        //hidden2.printMatrix();
        for (let i = 0; i < this.hidden2_count; i++) {
            this.hidden2.data[i][0] += this.bias_hh.data[i][0];
            this.hidden2.data[i][0] = sigmoid(this.hidden2.data[i][0]);
        }

        //weights_ho.printMatrix();
        //calculate output layer values
        this.outputs = dotProduct(this.weights_ho, this.hidden2);
        for (let i = 0; i < this.output_count; i++) {
            this.outputs.data[i][0] += this.bias_ho.data[i][0];
            this.outputs.data[i][0] = sigmoid(this.outputs.data[i][0]);
        }
        //outputs.printMatrix();

        //output as array
        let output = new Array(this.output_count);
        for (let i = 0; i < this.output_count; i++) {
            output[i] = this.outputs.data[i][0];
        }
        return output;
    }

    //TRAINING

    train(training_data, target) {
        for (let i = 0; i < training_data.length; i++) {
            this.inputs.data[i][0] = training_data[i];
        }

        //calculate hidden layer values
        this.hidden1 = dotProduct(this.weights_ih, this.inputs);
        for (let i = 0; i < this.hidden1_count; i++) {
            this.hidden1.data[i][0] += this.bias_ih.data[i][0];
            this.hidden1.data[i][0] = sigmoid(this.hidden1.data[i][0]);
        }
        this.hidden2 = dotProduct(this.weights_hh, this.hidden1);
        for (let i = 0; i < this.hidden2_count; i++) {
            this.hidden2.data[i][0] += this.bias_hh.data[i][0];
            this.hidden2.data[i][0] = sigmoid(this.hidden2.data[i][0]);
        }

        //calculate output layer values
        this.outputs = dotProduct(this.weights_ho, this.hidden2);
        for (let i = 0; i < this.output_count; i++) {
            this.outputs.data[i][0] += this.bias_ho.data[i][0];
            this.outputs.data[i][0] = sigmoid(this.outputs.data[i][0]);
        }

        //turn targets array into a matrix
        let T = new Matrix(target.length, 1);
        for (let i = 0; i < target.length; i++) {
            T.data[i][0] = target[i];
        }



        //calculate output errors
        let errors_output = subtractMatrices(T, this.outputs);

        //calculate output gradient
        let gradients = new Matrix(this.outputs.rows, this.outputs.cols);
        for (let i = 0; i < gradients.rows; i++) {
            for (let j = 0; j < gradients.cols; j++) {
                gradients.data[i][j] = dsigmoid(this.outputs.data[i][j]);
            }
        }
        gradients = multiplyMatrices(gradients, errors_output);
        gradients.multiply(lr);

        //calculate deltas
        let hidden_t = transpose(this.hidden2);
        let weights_ho_deltas = dotProduct(gradients, hidden_t);

        //Apply deltas to the weights
        this.weights_ho = addMatrices(this.weights_ho, weights_ho_deltas);

        //Adjust bias
        this.bias_ho = addMatrices(this.bias_ho, gradients);



        //Calculate the hidden2 layer errors
        let who_t = transpose(this.weights_ho);
        let hidden2_errors = dotProduct(who_t, errors_output);

        //calculate hidden gradient
        let hidden2_gradients = new Matrix(this.hidden2.rows, this.hidden2.cols);
        for (let i = 0; i < hidden2_gradients.rows; i++) {
            for (let j = 0; j < hidden2_gradients.cols; j++) {
                hidden2_gradients.data[i][j] = dsigmoid(this.hidden2.data[i][j]);
            }
        }
        hidden2_gradients = multiplyMatrices(hidden2_gradients, hidden2_errors);
        hidden2_gradients.multiply(lr);

        //calculate deltas
        let hidden1_t = transpose(this.hidden1);
        let weights_hh_deltas = dotProduct(hidden2_gradients, hidden1_t);

        //Apply deltas to the weights
        this.weights_hh = addMatrices(this.weights_hh, weights_hh_deltas);

        //Adjust bias
        this.bias_hh = addMatrices(this.bias_hh, hidden2_gradients);



        //Calculate the hidden1 layer errors
        let whh_t = transpose(this.weights_hh);
        let hidden1_errors = dotProduct(whh_t, hidden2_errors);

        //calculate hidden gradient
        let hidden1_gradients = new Matrix(this.hidden1.rows, this.hidden1.cols);
        for (let i = 0; i < hidden1_gradients.rows; i++) {
            for (let j = 0; j < hidden1_gradients.cols; j++) {
                hidden1_gradients.data[i][j] = dsigmoid(this.hidden1.data[i][j]);
            }
        }
        hidden1_gradients = multiplyMatrices(hidden1_gradients, hidden1_errors);
        hidden1_gradients.multiply(lr);

        //calculate deltas
        let inputs_t = transpose(this.inputs);
        let weights_ih_deltas = dotProduct(hidden1_gradients, inputs_t);

        //Apply deltas to the weights
        this.weights_ih = addMatrices(this.weights_ih, weights_ih_deltas);

        //Adjust bias
        this.bias_ih = addMatrices(this.bias_ih, hidden1_gradients);
    }

    //VISUALIZATION
    render() {
        //Lines
        //IH
        for (let i = 0; i < this.hidden1_count; i++) {
            for (let j = 0; j < this.input_count; j++) {
                strokeWeight(round(this.cellSize / 20));
                stroke(map(this.weights_ih.data[i][j], -5, 5, 100, 200), 128, 0);
                line(this.hidden1Nodes[i].pos.x, this.hidden1Nodes[i].pos.y, this.inputNodes[j].pos.x, this.inputNodes[j].pos.y);
            }
        }
        //HH
        for (let i = 0; i < this.hidden2_count; i++) {
            for (let j = 0; j < this.hidden1_count; j++) {
                strokeWeight(round(this.cellSize / 20));
                stroke(map(this.weights_hh.data[i][j], -5, 5, 100, 200), 128, 0);
                line(this.hidden2Nodes[i].pos.x, this.hidden2Nodes[i].pos.y, this.hidden1Nodes[j].pos.x, this.hidden1Nodes[j].pos.y);
            }
        }
        //HO
        for (let i = 0; i < this.output_count; i++) {
            for (let j = 0; j < this.hidden2_count; j++) {
                strokeWeight(round(this.cellSize / 20));
                stroke(map(this.weights_ho.data[i][j], -5, 5, 100, 200), 128, 0);
                line(this.outputNodes[i].pos.x, this.outputNodes[i].pos.y, this.hidden2Nodes[j].pos.x, this.hidden2Nodes[j].pos.y);
            }
        }
        //Nodes
        for (let n of this.inputNodes) {
            n.render();
        }
        for (let n of this.hidden1Nodes) {
            n.render();
        }
        for (let n of this.hidden2Nodes) {
            n.render();
        }
        for (let n of this.outputNodes) {
            n.render();
        }
        //Numbers
    }
}