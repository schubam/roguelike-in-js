import { drawLevel, drawPlayer, drawEnemies, createBuffer } from "./render.js";
import Grid from "./grid.js";
import Compositor from "./compositor.js";

export default class Camera {
  constructor(width, height, store) {
    this.width = width;
    this.height = height;
    this.topLeft = { x: 0, y: 0 };
    this.center = {
      x: Math.floor(this.width / 2) + this.topLeft.x,
      y: Math.floor(this.height / 2) + this.topLeft.y
    };
    this.scrollBoundaryX = Math.min(5, Math.floor(width * 0.25));
    this.scrollBoundaryY = Math.min(5, Math.floor(height * 0.25));
    this.store = store;
    this.compositor = new Compositor();
    this.buffer = createBuffer(width, height);
    this.context = this.buffer.getContext("2d");
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
    const { level, player, enemies } = this.store.getState();
    const { position, direction } = player;

    this.followPlayer(position, direction);

    this.compositor.add(
      drawLevel(this.width, this.height, this.cameraData(level))
    );
    this.compositor.add(
      drawPlayer(this.width, this.height, {
        x: position.x - this.topLeft.x,
        y: position.y - this.topLeft.y
      })
    );
    const positions = Object.entries(enemies)
      .map(a => a[1])
      .map(enemy => {
        const pos = {
          x: enemy.position.x - this.topLeft.x,
          y: enemy.position.y - this.topLeft.y
        };
        return pos;
      });
    this.compositor.add(drawEnemies(this.width, this.height, positions));
    this.compositor.draw(this.context);
    const self = this;
    return function(ctx) {
      ctx.drawImage(self.buffer, 0, 8);
    };
  }

  followPlayer(position, direction) {
    if (direction) {
      if (direction.x === 1) {
        if (position.x >= this.center.x + this.scrollBoundaryX) {
          this.move({ x: 1, y: 0 });
        }
      } else if (direction.x === -1) {
        if (position.x <= this.center.x - this.scrollBoundaryX) {
          this.move({ x: -1, y: 0 });
        }
      } else if (direction.y === 1) {
        if (position.y >= this.center.y + this.scrollBoundaryY) {
          this.move({ x: 0, y: 1 });
        }
      } else if (direction.y === -1) {
        if (position.y <= this.center.y - this.scrollBoundaryY) {
          this.move({ x: 0, y: -1 });
        }
      }
    }
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
