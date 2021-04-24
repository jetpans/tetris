class Box {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  crtaj = () => {
    fill(this.color);
    square(this.x, this.y, blocksize);
  };
  compare = (other) => {
    if (other.x === this.x && other.y === this.y) {
      return true;
    }
  };
}
