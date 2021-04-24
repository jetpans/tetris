let dimx = 600;
let dimy = 600;
let visina = 20;
let height = 40;
let speed = 20;
speed = speed;

function setup() {
  createCanvas(dimx, dimy);
  background(50, 50, 50);
}

function draw() {
  strokeWeight(3);
  stroke(130, 130, 225);
  noFill();
  loop();
  line(path, row, path, row + height);
}

let path = 0;
let row = 0;

function mousePressed() {
  path += speed;
  if (path > dimx) {
    path = 0;
    row += height;
  }
}
