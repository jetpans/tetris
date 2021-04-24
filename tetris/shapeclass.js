class Shape {
  constructor(x, y, content, color) {
    this.x = x;
    this.y = y;
    this.content = content;
    this.boxes = [];
    this.dx = content[0].length;
    this.dy = content.length;
    this.oldboxes = [];
    this.color = color;
    for (let i = 0; i < content.length; i++) {
      for (let j = 0; j < content[i].length; j++) {
        if (content[i][j] === 1) {
          this.boxes.push(
            new Box(this.x + blocksize * j, this.y + blocksize * i, this.color)
          );
        }
      }
    }
  }
  crash = () => {
    for (let i = 0; i < this.boxes.length; i++) {
      for (let j = 0; j < landed.length; j++) {
        if (this.boxes[i].compare(landed[j])) {
          return true;
        }
      }
    }
  };
  update = () => {
    this.y += blocksize;
    for (let i = 0; i < this.boxes.length; i++) {
      this.boxes[i].y += blocksize;
    }
  };
  move = (a) => {
    this.x += blocksize * a;
    for (let i = 0; i < this.boxes.length; i++) {
      this.boxes[i].x += a * blocksize;
    }
    if (this.crash() || this.x + this.dx * blocksize > dimx) {
      this.x -= blocksize * a;
      for (let i = 0; i < this.boxes.length; i++) {
        this.boxes[i].x -= a * blocksize;
      }
    }
  };
  crtaj = () => {
    for (let i = 0; i < this.boxes.length; i++) {
      this.boxes[i].crtaj();
    }
  };

  rotate = () => {
    this.oldcont = this.content;
    this.content = rotat(this.content);
    this.dx = this.content[0].length;
    this.dy = this.content.length;
    this.oldboxes = this.boxes;
    this.boxes = [];
    for (let i = 0; i < this.content.length; i++) {
      for (let j = 0; j < this.content[i].length; j++) {
        if (this.content[i][j] === 1) {
          this.boxes.push(
            new Box(this.x + blocksize * j, this.y + blocksize * i, this.color)
          );
        }
      }
    }
    if (this.crash() || this.x + this.dx * blocksize > dimx) {
      this.boxes = this.oldboxes;
      this.content = this.oldcont;
      this.dx = this.content[0].length;
      this.dy = this.content.length;
    }
  };
}

rotat = (matrix) => {
  newx = matrix.length;
  newy = matrix[0].length;
  newMatrix = [];
  for (let i = 0; i < newy; i++) {
    newMatrix.push([]);
    for (let j = 0; j < newx; j++) {
      newMatrix[i].unshift(matrix[j][i]);
    }
  }
  return newMatrix;
};
