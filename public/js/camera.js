import { drawLevel, drawPlayer } from "./render.js";
import { makeIndexToPosition } from "./levelData.js";

export default class Camera {
  constructor(context, width, height, store) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.topLeft = { x: 0, y: 0 };
    this.center = {
      x: Math.floor(this.width / 2) + this.topLeft.x,
      y: Math.floor(this.height / 2) + this.topLeft.y
    };
    this.scrollBoundaryX = 5;
    this.scrollBoundaryY = 5;
    this.store = store;
  }

  calculateCenter() {
    this.center = {
      x: Math.floor(this.width / 2) + this.topLeft.x,
      y: Math.floor(this.height / 2) + this.topLeft.y
    };
  }

  move(pos) {
    const temp = { x: this.topLeft.x + pos.x, y: this.topLeft.y + pos.y };
    if (temp.x < 0) temp.x = 0;
    if (temp.y < 0) temp.y = 0;
    this.topLeft = temp;
    this.calculateCenter();
  }

  render() {
    const { level, playerPosition } = this.store.getState();
    console.log(playerPosition);
    console.log(this.topLeft);
    
    let movedCamera = false;
    if (playerPosition.direction) {
      if (playerPosition.direction.x === 1) {
        console.log("move right");
        if (playerPosition.x >= this.center.x + this.scrollBoundaryX) {
          this.move({ x: 1, y: 0 });
          movedCamera = true;
        }
      } else if (playerPosition.direction.x === -1) {
        if (playerPosition.x <= this.center.x - this.scrollBoundaryX) {
          console.log("move left");
          this.move({ x: -1, y: 0 });
          movedCamera = true;
        }
      } else if (playerPosition.direction.y === 1) {
        if (playerPosition.y >= this.center.y + this.scrollBoundaryY) {
          console.log("move down");
          this.move({ x: 0, y: 1 });
          movedCamera = true;
        }
      } else if (playerPosition.direction.y === -1) {
        if (playerPosition.y <= this.center.y - this.scrollBoundaryY) {
          console.log("move up");
          this.move({ x: 0, y: -1 });
          movedCamera = true;
        }
      }
    }

    const cdata = this.cameraData(level);
    drawLevel(makeIndexToPosition(this.width))(this.context, cdata);
    drawPlayer(this.context, {
      x: playerPosition.x - this.topLeft.x,
      y: playerPosition.y - this.topLeft.y
    });
  }

  cameraData(level) {
    const { data, positionToIndex } = level;
    let lines = [];
    for (let i = 0; i < this.height; i = i + 1) {
      const start = positionToIndex({
        x: this.topLeft.x,
        y: this.topLeft.y + i
      });
      const last = positionToIndex({
        x: this.topLeft.x + this.width,
        y: this.topLeft.y + i
      });
      const elems = data.slice(start, last);
      lines = lines.concat(elems);
    }

    return lines;
  }
}
