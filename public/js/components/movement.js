import * as States from "./states.js";

export default class Movement {
  constructor() {
    this.name = "movement";
    this.velocity = 75;
    this.animations = [];
  }

  update(gameObject, dt, level) {
    if (this.animations.length > 0) {
      const anim = this.animations[0];
      gameObject.setState(anim.state);

      if (gameObject.state === States.MOVEMENT_RIGHT) {
        gameObject.pos.x += this.velocity * dt;
        if (gameObject.pos.x > anim.x) {
          gameObject.pos.x = anim.x;
          this.finalize(gameObject);
        }
      } else if (gameObject.state === States.MOVEMENT_LEFT) {
        gameObject.pos.x -= this.velocity * dt;
        if (gameObject.pos.x < anim.x) {
          gameObject.pos.x = anim.x;
          this.finalize(gameObject);
        }
      } else if (gameObject.state === States.MOVEMENT_DOWN) {
        gameObject.pos.y += this.velocity * dt;
        if (gameObject.pos.y > anim.y) {
          gameObject.pos.y = anim.y;
          this.finalize(gameObject);
        }
      } else if (gameObject.state === States.MOVEMENT_UP) {
        gameObject.pos.y -= this.velocity * dt;
        if (gameObject.pos.y < anim.y) {
          gameObject.pos.y = anim.y;
          this.finalize(gameObject);
        }
      }
    }
  }

  finalize(gameObject) {
    this.animations.shift();
    if (this.animations.length > 0) {
      gameObject.setState(this.animations[0].state);
    } else {
      gameObject.setState(States.IDLE);
    }
  }

  animateTo(gameObject, x, y, direction) {
    let state;
    if (direction.x === -1) state = States.MOVEMENT_LEFT;
    if (direction.x === 1) state = States.MOVEMENT_RIGHT;
    if (direction.y === -1) state = States.MOVEMENT_UP;
    if (direction.y === 1) state = States.MOVEMENT_DOWN;

    this.animations.push({ state, x, y });
  }
}
