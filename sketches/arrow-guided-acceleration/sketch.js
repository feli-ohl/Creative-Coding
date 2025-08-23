let car;
let change;

function setup() {
  createCanvas(640, 240);
  car = new Car();
  change = createVector(0.005, -0.003);
}

function draw() {
  background(220);
  car.update();
  car.checkEdges();
  car.show();
  
  if (keyIsDown(UP_ARROW)) {
    car.acceleration.add(change);
  } else if (keyIsDown(DOWN_ARROW)) {
    car.acceleration.sub(change);
  } else {
    car.acceleration.sub(car.acceleration);
  }
}

class Car {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector (0, 0);
    this.topSpeed = 10;
  }
  
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
  }
  
  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, 48);
    translate(this.position.x, this.position.y);
    line(0, 0, this.velocity.x * 10, this.velocity.y * 10);
  }
  
  checkEdges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}
