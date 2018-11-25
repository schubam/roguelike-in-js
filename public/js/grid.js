export default class Grid {
  constructor(json) {
    this.width = json.width;
    this.height = json.height;
    this.data = json.data;
  }

  set(x, y, value) {
    this.data[this.height * y + x] = value;
  }

  get(x, y) {
    this.data[this.height * y + x];
  }

  indexOf(i) {
    return this.data.indexOf(i);
  }

  reduce(reducer, memo) {
    return this.data.reduce(reducer, memo);
  }
}
