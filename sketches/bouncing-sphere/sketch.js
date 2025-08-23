let position;
let velocity;
let boxSize = 400;
let sphereRadius = 24;

function setup() {
  createCanvas(640, 640, WEBGL);
  stroke(0);

  position = createVector(0, 0, 0);
  velocity = createVector(2.5, 2, 1.5);
}

function draw() {
  background(220);
  orbitControl();

  noFill();
  stroke(50);
  box(boxSize);

  position.add(velocity);

  let halfBox = boxSize / 2 - sphereRadius;
  if (position.x > halfBox || position.x < -halfBox) {
    velocity.x *= -1;
  }
  if (position.y > halfBox || position.y < -halfBox) {
    velocity.y *= -1;
  }
  if (position.z > halfBox || position.z < -halfBox) {
    velocity.z *= -1;
  }

  push();
  translate(position.x, position.y, position.z);
  sphere(sphereRadius);
  pop();
}
