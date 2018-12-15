import { TILE_SIZE } from "./render.js";

export default class Camera {
  constructor(pos, size, levelWidth, levelHeight) {
    this.pos = pos;
    this.size = size;
    this.levelWidth = levelWidth;
    this.levelHeight = levelHeight;
  }

  move(pos) {
    this.pos.x = Math.min(
      Math.max(0, pos.x - this.size.x / 2),
      this.levelWidth * TILE_SIZE - this.size.x
    );
    this.pos.y = Math.min(
      Math.max(0, pos.y - 5 * TILE_SIZE),
      this.levelHeight * TILE_SIZE - this.size.y
    );
  }
}
