import { createBackgroundLayer } from "./backgroundLayer.js";
import Compositor from "./compositor.js";
import { loadLevelData } from "./levelData.js";

class Level {
  constructor(grid) {
    this.grid = grid;
    this.entities = new Set();
    this.compositor = new Compositor();
  }

  addLayer(layer) {
    this.compositor.add(layer);
  }

  draw(context, camera) {
    this.compositor.draw(context, camera);
  }

  update() {
    this.entities.forEach(entity => {
      entity.think(this);
    });
  }
}

export function createLevelLoader() {
  return function loadLevel(name) {
    return loadLevelData(name).then(grid => {
      const level = new Level(grid);
      level.addLayer(createBackgroundLayer(grid));
      return level;
    });
  };
}
