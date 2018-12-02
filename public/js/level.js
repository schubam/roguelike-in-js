import Compositor from "./compositor.js";

export default class Level {
  constructor(grid) {
    this.grid = grid;
    this.entities = new Set();
    this.items = new Set();
    this.compositor = new Compositor();
  }

  addLayer(layer) {
    this.compositor.add(layer);
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
