import Compositor from "./compositor.js";

export default class Level {
  constructor(grid) {
    this.grid = grid;
    this.entities = new Set();
    this.items = new Set();
    this.compositor = new Compositor();
    this.fov = () => null;
  }

  addLayer(layer) {
    this.compositor.add(layer);
  }

  setFOV(layer) {
    this.fov = layer;
  }

  setUI(layer) {
    this.ui = layer;
  }

  updateUI(context) {
    this.ui(context)
  }

  addEntity(entity) {
    this.entities.add(entity);
  }

  addItem(item) {
    this.items.add(item);
  }

  removeItemAtPosition(x, y) {
    this.items.forEach(item => {
      if (item.pos.x === x && item.pos.y === y) {
        this.items.delete(item);
      }
    });
  }

  draw(context, camera) {
    this.compositor.draw(context, camera);
    this.fov(context, camera);
  }

  update(dt) {
    this.entities.forEach(entity => {
      entity.update(dt);
    });
    this.items.forEach(entity => {
      entity.update(dt);
    });
  }
}
