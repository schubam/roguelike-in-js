import { drawLevel, drawPlayer } from "./render.js";

function calculateCenter(w, h) {
  return { x: Math.floor(w / 2), y: Math.floor(h / 2) };
}

export default class Camera {
  constructor(context, width, height, store) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.center = calculateCenter(width, height);
    this.renderWidth = Math.floor(width * 0.25);
    this.renderHeight = Math.floor(height * 0.25);
    this.store = store;
  }

  render() {
    const { level, playerPosition } = this.store.getState();

    drawLevel(level.indexToPosition)(this.context, level.data);
    drawPlayer(this.context, playerPosition);
  }
}
