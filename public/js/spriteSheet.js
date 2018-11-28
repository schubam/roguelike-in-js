import { createBuffer } from "./render.js";

export async function loadJSON(url) {
  const data = await fetch(url);
  return data.json();
}

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.src = url;
  });
}

export class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
    this.animations = new Map();
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

export async function loadSpriteSheet(name) {
  const spriteSheetSpec = await loadJSON(`/sprites/${name}.json`);
  const spriteSheet = await loadImage(spriteSheetSpec.imageURL);
  const sprites = new SpriteSheet(
    spriteSheet,
    spriteSheetSpec.tileWidth,
    spriteSheetSpec.tileHeight
  );

  spriteSheetSpec.tiles.forEach(tileSpec => {
    sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
  });

  spriteSheetSpec.animations.forEach(animationSpec => {
    const animation = createAnimation(
      animationSpec.frames,
      animationSpec.frameLength
    );
    sprites.defineAnimation(animationSpec.name, animation);
  });

  return sprites;
}

function createAnimation(frames, frameLength) {
  return function resolveFrame(distance) {
    const frameIndex = Math.floor(distance / frameLength) % frames.length;
    const frameName = frames[frameIndex];
    return frameName;
  };
}
