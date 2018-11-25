import { drawLevel, drawPlayer } from "./render.js";
import Grid from "./grid.js";

function fillArrayWithOutOfBounds(ary, maxElements) {
  for (let i = 0; ary.length < maxElements; i++) {
    ary.push("|");
  }
}

export default class Camera {
  constructor(width, height, context, store) {
    this.width = width;
    this.height = height;
    this.topLeft = { x: 0, y: 0 };
    this.center = {
      x: Math.floor(this.width / 2) + this.topLeft.x,
      y: Math.floor(this.height / 2) + this.topLeft.y
    };
    this.scrollBoundaryX = Math.min(5, Math.floor(width * 0.25));
    this.scrollBoundaryY = Math.min(5, Math.floor(height * 0.25));
    this.context = context;
    this.store = store;
  }

  debug() {
    console.log("----");
    console.log("width ", this.width);
    console.log("height ", this.height);
    console.log("camera topLeft ", this.topLeft);
    console.log(
      `frame ${this.topLeft.x}, ${this.topLeft.x + this.width}-${
        this.topLeft.y
      }, ${this.topLeft.y + this.height}`
    );
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

    console.log("player position ", playerPosition);
    this.debug();

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
    drawLevel(this.context, cdata);
    drawPlayer(this.context, {
      x: playerPosition.x - this.topLeft.x,
      y: playerPosition.y - this.topLeft.y
    });
  }

  cameraData(level) {
    const { grid } = level;
    let rows = [];
    let row;
    for (let i = 0; i < this.height; i++) {
      row = grid.getRow(this.topLeft.x, this.topLeft.y + i, this.width);
      rows = rows.concat(row);
    }
    const newGrid = new Grid(this.width, this.height);
    newGrid.setData(rows);
    return newGrid;
  }
}
