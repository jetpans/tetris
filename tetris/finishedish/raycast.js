const dimx = 1000;
const dimy = 800;
const numberOfRays = 3000;
const period = (2 * Math.PI) / numberOfRays;
const numberOfLines = 10;
let rays = [];
let lines = [];
let dots = [];
let mindist = Infinity;
let najk = [];

class Ray {
  constructor(x, y) {
    this.x = Math.floor(mouseX + x * dimx * 3);
    this.y = Math.floor(mouseY + y * dimx * 3);
    this.k = y / x;
    this.l = -this.k * mouseX + mouseY;
  }
  crtaj = () => line(mouseX, mouseY, this.x, this.y);
}
class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.k = (y2 - y1) / (x2 - x1);
    this.l = -this.k * x1 + y1;
  }
  crtaj = () => line(this.x1, this.y1, this.x2, this.y2);
}

// UDALJENOST DVIJE TOČKE
function distance(x1, y1, x2, y2) {
  dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return dist;
}

// SUDARANJE 1 ZRAKE S 1 LINIJOM
function cast(ray, line) {
  intersectx = (ray.l - line.l) / (line.k - ray.k);
  intersecty = line.k * intersectx + line.l;
  if (line.k === Infinity || line.k === -Infinity) {
    intersectx = line.x1;
    intersecty = ray.k * intersectx + ray.l;
  }
  if (ray.k === Infinity || ray.k === -Infinity) {
    intersectx = mouseX;
    intersecty = line.k * intersectx + line.l;
  }
  if (
    Math.floor(
      distance(intersectx, intersecty, line.x1, line.y1) +
        distance(intersectx, intersecty, line.x2, line.y2)
    ) === Math.floor(distance(line.x1, line.y1, line.x2, line.y2)) &&
    Math.floor(
      distance(intersectx, intersecty, ray.x, ray.y) +
        distance(intersectx, intersecty, mouseX, mouseY)
    ) === Math.floor(distance(mouseX, mouseY, ray.x, ray.y))
  ) {
    return [Math.floor(intersectx), Math.floor(intersecty)];
  }
}

function setup() {
  createCanvas(dimx, dimy);
}

function draw() {
  background(0);
  rays = [];

  strokeWeight(1);
  stroke(120, 170, 50);
  // GENERIRANJE ZRAKA
  for (let i = 0; i < numberOfRays; i++) {
    angle = i * period;
    x = Math.cos(angle);
    y = Math.sin(angle);
    directions = [x, y];
    rays.push(new Ray(x, y));
  }
  // SUDARANJE ZRAKA S LINIJAMA
  for (let j = 0; j < rays.length; j++) {
    dots = [];
    for (let i = 0; i < lines.length; i++) {
      if (cast(rays[j], lines[i])) {
        x = cast(rays[j], lines[i])[0];
        y = cast(rays[j], lines[i])[1];
        dots.push([x, y]);
        rays[j].x = x;
        rays[j].y = y;
      }
    }
    mindist = Infinity;
    najk = [];
    for (let k = 0; k < dots.length; k++) {
      if (distance(mouseX, mouseY, dots[k][0], dots[k][1]) <= mindist) {
        mindist = distance(mouseX, mouseY, dots[k][0], dots[k][1]);
        najk = dots[k];
      }
    }
    if (najk.length > 0) {
      rays[j].x = najk[0];
      rays[j].y = najk[1];
    }
  }

  // CRTANJE SVEGA
  for (let i = 0; i < rays.length; i++) {
    rays[i].crtaj();
  }
  strokeWeight(1);
  stroke(120, 120, 250);
  for (let i = 0; i < lines.length; i++) {
    lines[i].crtaj();
  }
}

// DODAVANJE LINIJA
function mousePressed() {
  pressx = mouseX;
  pressy = mouseY;
}

function mouseReleased() {
  lines.push(new Line(pressx, pressy, mouseX, mouseY));
}
