import makeId from "./guid.js";

export default class Enemy {
  constructor(position) {
    this.id = makeId();
    this.position = position;
    this.armor = 2;
    this.health = 10;
    this.currentHealth = 10;
    this.isDead = false;
  }

  takeDamage(damage) {
    this.currentHealth -= damage;
    if (this.currentHealth <= 0) {
      this.isDead = true;
    }
  }
}
