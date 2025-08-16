let mover;

function setup() {
  createCanvas(640, 240);
  mover = new Mover();
}

function draw() {
  background(255);
  mover.update();
  mover.checkEdges();
  mover.show();
}

class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0.01, 0.01);
    this.topSpeed = 10;
    this.accRate = 0.1;
  }
  
  update() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.position);
    this.accRate = 1 / dir.mag();
    dir.normalize();
    dir.mult(this.accRate * 40);
    dir.limit(20);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
  }
  
  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, 48);
  }
  
  checkEdges() {
    if (this.position.x > width - 24 || this.position.x < 24) {
      this.velocity.x *= -1;
      this.acceleration.x *= -1;
    }
    if (this.position.y > height - 24 || this.position.y < 24) {
      this.velocity.y *= -1;
      this.acceleration.y *= -1;
    }
  }
}
