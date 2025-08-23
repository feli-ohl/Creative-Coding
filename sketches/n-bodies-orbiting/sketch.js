let bodies = [];
let attractor;
let G = 1.0;

function setup() {
  createCanvas(640, 640);
  
  for (let i = 0; i < 100; i++) {
    let pos = p5.Vector.random2D();
    pos.setMag(random(100, 150));
    let vel = pos.copy();
    vel.setMag(random(10, 15));
    vel.rotate(90);
    let mass = random(10, 15);
    bodies[i] = new Body(pos.x, pos.y, vel.x, vel.y, mass);
  } 
  
  attractor = new Body(0, 0, 0, 0, 500);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  
  for (let i = 0; i < bodies.length; i++) {
    let bigForce = attractor.attract(bodies[i]);
    bodies[i].applyForce(bigForce);
    
    for (let j = 0; j < bodies.length; j++) {
      if (i !== j) {
        let force = bodies[j].attract(bodies[i]);
        bodies[i].applyForce(force);
      }
    }
  }
  
  for (let i = 0; i < bodies.length; i++) {
    bodies[i].update();
    bodies[i].show();
  }
}

class Body {
  constructor(x, y, velx, vely, mass) {
    this.mass = mass;
    this.position = createVector(x, y);
    this.velocity = createVector(velx, vely);
    this.acceleration = createVector(0, 0);
    this.r = sqrt(this.mass) * 1;
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
  
  attract(body) {
    let force = p5.Vector.sub(this.position, body.position);
    let dsq = constrain(force.magSq(), 100, 1000);
    let strength = (G * (this.mass * body.mass)) / dsq;
    force.setMag(strength);
    return force;
  }

  show() {
    strokeWeight(2);
    stroke(0);
    fill(175);
    circle(this.position.x, this.position.y, this.r * 2);
  }
}