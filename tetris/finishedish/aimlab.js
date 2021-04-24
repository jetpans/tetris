let dimx = 1600;
let dimy = 800;
let targetX = dimx / 2;
let targetY = dimy / 2;
let targetsize = 100;
let score = 0;
let totalclicks = 0;
function setup() {
  createCanvas(dimx, dimy);
  // text("string", 0, 0, 100, 50);
  // background(220, 200, 220);
  // textSize(40);
}

function draw() {
  background(0);
  textSize(40);
  stroke(255);
  strokeWeight(1);
  fill(255);
  circle(targetX, targetY, 2 * targetsize);
  let string = "HITS:  " + score + "     MISSES:  " + (totalclicks - score);
  text(string, 30, 50);
  fill(255);
}

function mousePressed() {
  if (
    mouseX < targetX + targetsize &&
    mouseX > targetX - targetsize &&
    mouseY < targetY + targetsize &&
    mouseY > targetY - targetsize
  ) {
    clear();
    setup();
    score += 1;
    targetX = targetsize + Math.ceil(Math.random() * (dimx - 2 * targetsize));
    targetY = targetsize + Math.ceil(Math.random() * (dimy - 2 * targetsize));
  }
  totalclicks += 1;
}
