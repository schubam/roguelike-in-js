import guid from "./guid.js";

export default class Timer {
  constructor(deltaTime = 1 / 60) {
    if (!Timer.instance) {
      this.id = guid();
      let accumulatedTime = 0;
      let lastTime = 0;

      this.updateProxy = time => {
        accumulatedTime += (time - lastTime) / 1000;

        if (accumulatedTime > 1) {
          accumulatedTime = 1;
        }

        while (accumulatedTime > deltaTime) {
          this.update(deltaTime);
          accumulatedTime -= deltaTime;
        }

        lastTime = time;

        this.enqueue();
      };
      Timer.instance = this;
    }
    return Timer.instance;
  }

  enqueue() {
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueue();
  }
}
