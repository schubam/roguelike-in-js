export default class Entity {
  constructor() {
    this.lifetime = 0;
  }

  update(dt, level) {
    this.lifetime += dt;
  }
}
