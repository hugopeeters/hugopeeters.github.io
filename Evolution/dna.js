class DNA {
    
    constructor() {
        this.goodVel = random(-2, 2);
        this.badVel = random(-2, 2);
        this.otherVel = random(-2, 2);
        this.otherHealth = random(-100, 100);
        this.goodRange = random(10, 200);
        this.badRange = random(10, 200);
        this.otherRange = random(10, 200);
        this.maxRange = 200;
        this.minRange = -this.maxRange;
    }
  
    copy(){
      let copiedDNA = new DNA();
      copiedDNA.goodVel = this.goodVel;
      copiedDNA.badVel = this.badVel;
      copiedDNA.otherVel = this.otherVel;
      copiedDNA.goodRange = this.goodRange;
      copiedDNA.badRange = this.badRange;
      copiedDNA.otherRange = this.otherRange;
      return copiedDNA;
    }
  
    mutate() {
      let x = floor(random(6));
      switch(x) {
      case 0:
        this.goodVel += random(-0.1, 0.1);
        if (this.goodVel >= 2) {
          this.goodVel = 2;
        } else if (this.goodVel < -2) {
          this.goodVel = -2;
        }
        break;
      case 1:
        this.badVel += random(-0.1, 0.1);
        if (this.badVel >= 2) {
          this.badVel = 2;
        } else if (this.badVel < -2) {
          this.badVel = -2;
        }
        break;
      case 2:
        this.otherVel += random(-0.1, 0.1);
        if (this.otherVel >= 2) {
            this.otherVel = 2;
        } else if (this.otherVel < -2) {
            this.otherVel = -2;
        }
        break;
      case 3:
        this.otherHealth += random(-5, 5);
        if (this.otherHealth >= 100) {
          this.otherHealth = 100;
        } else if (this.otherHealth < -100) {
          this.otherHealth = -100;
        }
        break;
      case 4:
        this.goodRange += random(-10, 10);
        if (this.goodRange >= this.maxRange) {
          this.goodRange = this.maxRange;
        } else if (this.goodRange < this.minRange) {
          this.goodRange = this.minRange;
        }
        break;
      case 5:
        this.badRange += random(-10, 10);
        if (this.badRange >= this.maxRange) {
          this.badRange = this.maxRange;
        } else if (this.badRange < this.minRange) {
          this.badRange = this.minRange;
        }
        break;
      case 6:
        this.otherRange += random(-10, 10);
        if (this.otherRange >= this.maxRange) {
          this.otherRange = this.maxRange;
        } else if (this.otherRange < this.minRange) {
          this.otherRange = this.minRange;
        }
        break;
      }
    }
  }