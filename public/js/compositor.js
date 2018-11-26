class Compositor {
  constructor() {
    this.layers = [];
  }

  add(layer) {
    this.layers.push(layer);
  }

  draw(context) {
    this.layers.forEach(layer => layer(context));
  }
}

export default Compositor;
