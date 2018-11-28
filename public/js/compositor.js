class Compositor {
  constructor() {
    this.layers = [];
  }

  add(layer) {
    this.layers.push(layer);
  }

  draw(context, camera) {
    this.layers.forEach(layer => layer(context, camera));
  }
}

export default Compositor;
