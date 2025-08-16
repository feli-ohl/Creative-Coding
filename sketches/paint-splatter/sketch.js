let slider;
let sd;

function setup() {
  createCanvas(640, 240);
  background(255);
  slider = createSlider(0, 100, 50);
  slider.position(20, height - 50);
}

function draw() {
  sd = slider.value();
  let x = randomGaussian(320, sd);
  let y = randomGaussian(120, sd);
  let r = randomGaussian(128, sd);
  let g = randomGaussian(128, sd);
  let b = randomGaussian(128, sd);
  noStroke();
  fill(r, g, b);
  circle(x, y, 5);
}