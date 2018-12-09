import * as States from "./states.js";

export default class Movement {
  constructor() {
    this.name = "movement";
    this.velocity = 50;
    this.targetX = null;
    this.targetY = null;
  }

  update(gameObject, dt, level) {
    if (this.targetX && this.targetY) {
      if (gameObject.state === States.MOVEMENT_RIGHT) {
        gameObject.pos.x += this.velocity * dt;

        if (gameObject.pos.x > this.targetX) {
          gameObject.pos.x = this.targetX;
          gameObject.setState(States.IDLE);
          this.targetX = null;
          this.targetY = null;
          console.log("animation finished");
        }

        console.log(gameObject.pos.x);
      } else if (gameObject.state === States.MOVEMENT_LEFT) {
        gameObject.pos.x -= this.velocity * dt;

        if (gameObject.pos.x < this.targetX) {
          gameObject.pos.x = this.targetX;
          gameObject.setState(States.IDLE);
          this.targetX = null;
          this.targetY = null;
          console.log("animation finished");
        }

        console.log(gameObject.pos.x);
      } else if (gameObject.state === States.MOVEMENT_DOWN) {
        gameObject.pos.y += this.velocity * dt;

        if (gameObject.pos.y > this.targetY) {
          gameObject.pos.y = this.targetY;
          gameObject.setState(States.IDLE);
          this.targetX = null;
          this.targetY = null;
          console.log("animation finished");
        }

        console.log(gameObject.pos.y);
      } else if (gameObject.state === States.MOVEMENT_UP) {
        gameObject.pos.y -= this.velocity * dt;

        if (gameObject.pos.y < this.targetY) {
          gameObject.pos.y = this.targetY;
          gameObject.setState(States.IDLE);
          this.targetX = null;
          this.targetY = null;
          console.log("animation finished");
        }

        console.log(gameObject.pos.y);
      }
    }
  }

  animateTo(gameObject, x, y, direction) {
    let state;
    if (direction.x === -1) state = States.MOVEMENT_LEFT;
    if (direction.x === 1) state = States.MOVEMENT_RIGHT;
    if (direction.y === -1) state = States.MOVEMENT_UP;
    if (direction.y === 1) state = States.MOVEMENT_DOWN;
    gameObject.setState(state);
    this.targetX = x;
    this.targetY = y;
  }
}
