const dimx = 800;
const dimy = 800;
const bitsize = 40;
const gamespeed = 20;
let snakey = dimy / 2;
let snakex = dimx / 2;
let artail = [[snakex, snakey]];
let applex = Math.floor((Math.random() * dimx) / bitsize) * bitsize;
let appley = Math.floor((Math.random() * dimy) / bitsize) * bitsize;
let dir = "up";
let score = 0;

function setup() {
  createCanvas(dimx, dimy);
}

function draw() {
  background(0);
  textSize(20);
  text("SCORE: " + score, 30, 30);
  if (frameCount % gamespeed === 0) {
    console.log(artail);
    console.log("         ");
    console.log([snakex, snakey]);
    updated = 0;
    if (dir == "up") {
      snakey -= bitsize;
    }
    if (dir == "down") {
      snakey += bitsize;
    }
    if (dir == "left") {
      snakex -= bitsize;
    }
    if (dir == "right") {
      snakex += bitsize;
    }

    if (
      includ(artail, [snakex, snakey]) ||
      snakex > dimx ||
      snakex < 0 ||
      snakey > dimy ||
      snakey < 0
    ) {
      console.log("I DIED");
      snakey = dimy / 2;
      snakex = dimx / 2;
      artail = [[snakex, snakey]];
      applex = Math.floor((Math.random() * dimx) / bitsize) * bitsize;
      appley = Math.floor((Math.random() * dimy) / bitsize) * bitsize;
      dir = "up";
      score = 0;
    }

    if (snakex === applex && snakey === appley) {
      score += 1;
      artail.push([snakex, snakey]);
      applex = Math.floor((Math.random() * dimx) / bitsize) * bitsize;
      appley = Math.floor((Math.random() * dimy) / bitsize) * bitsize;
    } else {
      artail = artail.slice(1);
      artail.push([snakex, snakey]);
    }
  }
  stroke(0);
  strokeWeight(1);
  fill(1, 255, 1);
  for (let i = 0; i < artail.length; i++) {
    square(artail[i][0], artail[i][1], bitsize);
  }
  strokeWeight(0);
  stroke(255, 1, 1);
  fill(255, 1, 1);
  square(applex, appley, bitsize);
}

function keyPressed() {
  if (updated === 0) {
    if (keyCode === LEFT_ARROW && dir !== "right") {
      dir = "left";
    }
    if (keyCode === RIGHT_ARROW && dir !== "left") {
      dir = "right";
    }
    if (keyCode === UP_ARROW && dir !== "down") {
      dir = "up";
    }
    if (keyCode === DOWN_ARROW && dir !== "up") {
      dir = "down";
    }
    updated = 1;
  }
}

function includ(array, element) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === element[0] && array[i][1] === element[1]) {
      return true;
    }
  }
  return false;
}
