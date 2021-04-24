const horizontalB = 10;
const verticalB = 20;
const blocksize = 50;
const dimx = blocksize * horizontalB;
const dimy = blocksize * verticalB;
const dropspeed = 80;
let landed = [];
let collision = [];
let score = 0;
let count = 0;
const shapelist = [
  [
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    [132, 209, 242],
  ],
  [
    [
      [1, 1],
      [1, 1],
    ],
    [242, 132, 238],
  ],
  [[[1, 1, 1, 1]], [233, 65, 115]],
  [
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    [212, 243, 55],
  ],
  [
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    [162, 123, 229],
  ],
  [
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    [232, 162, 91],
  ],
  [
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [56, 240, 234],
  ],
  [
    [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    [56, 20, 234],
  ],
];
shape = newShape();

function setup() {
  createCanvas(dimx, dimy);
}

function draw() {
  background(0);
  fill(255);
  let string = "SCORE:  " + score;
  textSize(30);
  text(string, 30, 50);

  if (keyIsPressed && keyCode === DOWN_ARROW && frameCount % 2 === 0) {
    if (shape.y + shape.dy * blocksize === dimy) {
      landed = landed.concat(shape.boxes);
      shape = newShape();
      isOver();
    }
    shape.update();
  } else if (frameCount % dropspeed === 0) {
    if (shape.y + shape.dy * blocksize === dimy) {
      landed = landed.concat(shape.boxes);
      shape = newShape();
      isOver();
    }
    shape.update();
  }

  if (shape.crash()) {
    shape.y -= blocksize;
    for (let i = 0; i < shape.boxes.length; i++) {
      shape.boxes[i].y -= blocksize;
    }
    landed = landed.concat(shape.boxes);
    shape = newShape();
    isOver();
  }
  countPoints();
  for (let i = 0; i < landed.length; i++) {
    landed[i].crtaj();
  }

  shape.crtaj();
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    if (shape.x + shape.dx * blocksize !== dimx) {
      shape.move(1);
    }
  }
  if (keyCode === LEFT_ARROW) {
    if (shape.x - blocksize >= 0) {
      shape.move(-1);
    }
  }
  if (keyCode === UP_ARROW) {
    shape.rotate();
  }
  if (keyCode === TAB) {
    console.log(landed);
  }
}
function newShape() {
  index = Math.floor(Math.random() * shapelist.length);
  crit = new Shape(
    Math.floor(horizontalB / 2 - shapelist[index][0][0].length / 2) * blocksize,
    0,
    shapelist[index][0],
    shapelist[index][1]
  );
  return crit;
}

function isOver() {
  if (shape.crash()) {
    console.log("Game over");
    landed = [];
    score = 0;
  }
}

function countPoints() {
  let whys = [];
  count = 0;
  for (let i = 0; i < landed.length; i++) {
    whys[landed[i].y] = 0;
  }
  for (let i = 0; i < landed.length; i++) {
    whys[landed[i].y] += 1;
  }
  for (let i = 0; i < whys.length; i++) {
    if (whys[i] === horizontalB) {
      for (let j = landed.length - 1; j > -1; j--) {
        if (landed[j].y === i) {
          landed.splice(j, 1);
        } else if (landed[j].y < i) {
          landed[j].y += blocksize;
        }
      }
      count += 1;
    }
  }
  score += Math.pow(count, 2) * 20;
}
