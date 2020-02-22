function calculateStats() {

    //ages
    for (let i = 0; i < maxAge; i++) {
        ages[i] = 0;
    }
    for (let i = 0; i < vehicles.length; i++) {
        let age;
        if (vehicles[i].age < maxAge - 1) {
            age = vehicles[i].age;
        } else {
            age = maxAge - 1;
        }
        ages[age] += 1;
    }

    //generations
    for (let i = 0; i < maxGens; i++) {
        generations[i] = 0;
    }
    for (let i = 0; i < vehicles.length; i++) {
        let gen;
        if (vehicles[i].generation < maxGens - 1) {
            gen = vehicles[i].generation;
        } else {
            gen = maxGens - 1;
        }
        generations[gen] += 1;
    }

    //ancestors
    let ancestors = new Array(50);
    for (let i = 0; i < 50; i++) {
        ancestors[i] = 0;
    }
    for (let i = 0; i < vehicles.length; i++) {
        let anc;
        if (vehicles[i].ancestor < 50 - 1) {
            anc = vehicles[i].ancestor;
        } else {
            anc = 50 - 1;
        }
        ancestors[anc] += 1;
    }
    ancestorSeries.push(ancestors);

    //determine the best performer
    let highestPerformance = 0;
    let bestV = null;
    for (let v of vehicles) {
        if (v.performance > highestPerformance) {
            highestPerformance = v.performance;
            bestV = v;
        }
    }
    if (bestV != null) {
        bestV.best = true;
    }
}