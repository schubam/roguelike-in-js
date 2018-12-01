import { createBuffer } from "./render.js";

function createAnimation(frames, frameLength) {
  return function resolveFrame(distance) {
    const frameIndex = Math.floor(distance / frameLength) % frames.length;
    const frameName = frames[frameIndex];
    return frameName;
  };
}

export class SpriteSheet {
  constructor(image, spec) {
    this.image = image;
    this.tiles = new Map();
    this.animations = new Map();

    if (spec) {
      this.width = spec.tileWidth;
      this.height = spec.tileHeight;
      if ("tiles" in spec) {
        spec.tiles.forEach(tileSpec => {
          this.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
        });
      }

      if ("animations" in spec) {
        spec.animations.forEach(animationSpec => {
          const animation = createAnimation(
            animationSpec.frames,
            animationSpec.frameLength
          );
          this.defineAnimation(animationSpec.name, animation);
        });
      }
    }
  }

  define(name, x, y, width, height) {
    const buffer = createBuffer(width, height);
    const context = buffer.getContext("2d");
    context.drawImage(this.image, x, y, width, height, 0, 0, width, height);
    this.tiles.set(name, buffer);
  }

  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  defineAnimation(name, animation) {
    this.animations.set(name, animation);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }

  drawAnimation(name, context, x, y, distance) {
    const animation = this.animations.get(name);
    const tile = animation(distance);
    this.drawTile(tile, context, x, y);
  }
}
