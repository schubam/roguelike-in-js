export default class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = [];
  }

  setData(data) {
    if (data.length != this.width * this.height) {
      throw `Error: data.length (${
        data.length
      }) != number of tiles in grid, should be ${this.width * this.height}`;
    }
    this.forEach((_, x, y) => {
      let val = data[x + y * this.width];
      this.set(x, y, val);
    });
  }

  set(x, y, value) {
    if (!this.data[x]) {
      this.data[x] = [];
    }
    this.data[x][y] = value;
  }

  get(x, y) {
    const col = this.data[x];
    if (col) {
      return col[y];
    }
    return undefined;
  }

  getRow(x, y, size) {
    const data = [];
    for (let i = 0; i < size; i++) {
      data.push(this.get(x + i, y));
    }
    return data;
  }

  forEach(callback) {
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        callback(this.get(i, j), i, j);
      }
    }
  }
}
