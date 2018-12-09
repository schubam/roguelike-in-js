import * as States from "./components/states.js";

export default class GameObject {
  constructor() {
    this.state = States.IDLE;
    this.components = [];
    this.lifetime = 0;
  }

  setState(state) {
    this.state = state;
  }

  addComponent(c) {
    this.components.push(c);
    this[c.name] = c;
  }

  update(dt, level) {
    this.lifetime += dt;
    this.components.forEach(component => {
      component.update(this, dt, level);
    });
  }
}
