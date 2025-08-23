let mover

function setup() {
  createCanvas(640, 240);
  mover = new Mover(width / 2, height / 2, 5);
}

function draw() {
  background(220);
  
  let gravity = createVector(0, 1);
  mover.applyForce(gravity);
  
  if (mouseIsPressed) {
    let mouse = createVector(mouseX, mouseY);
    mouse.sub(mover.position);
    mouse.mult(0.001);
    mover.applyForce(mouse);
  }
  
  if (mover.contactEdge()) {
    let c = 0.1;
    let friction = mover.velocity.copy();
    friction.mult(-1);
    friction.setMag(c);
    mover.applyForce(friction);
  }
  
  mover.bounceEdges();
  mover.checkEdges();
  mover.update();
  mover.show();
}
class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = (this.mass * 16) / 2;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    fill(175);
    circle(this.position.x, this.position.y, this.radius * 2);
  }
  
  contactEdge() {
    return (this.position.y > height - this.radius - 1);
  }
  
  bounceEdges() {
    let bounce = -0.9;
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= bounce;
    }
  }
  
  checkEdges() {
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x < this.radius) {
      this.velocity.x *= -1;
      this.position.x = this.radius;
    }
  }
}