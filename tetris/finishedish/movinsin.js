const dimx = 1600;
const dimy = 800;
const height = 300;
const period = 100;
const movespeed = 5;
let lastx = 0;
let lasty = 0;
let ctr = 0;

function setup() {
  createCanvas(dimx, dimy);
}

function draw() {
  translate(0, dimy / 2);
  background(0);
  stroke(255);
  strokeWeight(2);

  for (let i = 0; i < dimx; i++) {
    x = i;
    y = sin((i - movespeed * ctr) / period) * height;
    line(x, y, lastx, lasty);
    lastx = x;
    lasty = y;
  }
  lastx = 0;
  lasty = sin((0 - movespeed * ctr) / period) * height;
  ctr++;
}
