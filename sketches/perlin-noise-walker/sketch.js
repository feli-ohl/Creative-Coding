let walker;

function setup() {
  createCanvas(640, 240);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.time = createVector(0, 10000);
    this.position = createVector(width / 2, height / 2);
  }
  
  show() {
    stroke(0);
    point(this.position.x, this.position.y);
  }
  
  step() {
    this.position.x = map(noise(this.time.x), 0, 1, 0, width);
    this.position.y = map(noise(this.time.y), 0, 1, 0, height);
    this.time.x += 0.01;
    this.time.y += 0.01;
  }
}