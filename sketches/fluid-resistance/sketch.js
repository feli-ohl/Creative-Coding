let movers = [];
let liquid;

function setup() {
  createCanvas(640, 240);
  for (let i = 0; i < 9; i++) {
    let mass = random(0.5, 5);
    movers[i] = new Mover(40 + i * 70, 0, mass);
  }
  
  liquid = new Liquid(0, height / 2, width, height / 2, 0.1);
}

function draw() {
  background(255);
  
  liquid.show();
  
  for (let i = 0; i < movers.length; i++) {
    
    if (liquid.contains(movers[i])) {
      let dragForce = liquid.calculateDrag(movers[i]);
      movers[i].applyForce(dragForce);
    }
    
    let gravity = createVector(0, 0.3 * movers[i].mass);
    movers[i].applyForce(gravity);
    
    movers[i].update();
    movers[i].show();
    movers[i].bounceEdges();
    movers[i].checkEdges();
  }
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
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    } else if (this.position.y < this.radius) {
      this.velocity.y *= -1;
      this.position.y = this.radius;
    }
  }
}

class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
  
  show() {
    noStroke();
    fill(135, 206, 235);
    rect(this.x, this.y, this.w, this.h);
  }
  
  contains(mover) {
    let pos = mover.position;
    return (pos.x > this.x && pos.x < this.x + this.w &&
            pos.y > this.y && pos.y < this.y + this.h);
  }
  
  calculateDrag(mover) {
    let speed = mover.velocity.mag();
    let dragMagnitude = this.c * speed * speed;
    let dragForce = mover.velocity.copy();
    dragForce.mult(-1);
    dragForce.setMag(dragMagnitude);
    return dragForce;
  }
}