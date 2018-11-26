import { createBuffer } from "./render.js";

class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name, x, y, width, height) {
    const buffer = createBuffer(width, height);
    const context = buffer.getContext("2d");
    context.drawImage(this.image, x, y, width, height, 0, 0, width, height);
    this.tiles.set(name, buffer);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }
}

const CHARS =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

class Font {
  constructor(sprites, size) {
    this.sprites = sprites;
    this.size = size;
  }

  print(text, context, x, y) {
    [...text].forEach((char, pos) => {
      this.sprites.draw(char, context, x + pos * this.size, y);
    });
  }
}

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.src = url;
  });
}

export async function loadFont() {
  return loadImage("./img/font.png").then(image => {
    const fontSprite = new SpriteSheet(image);
    const size = 8;
    const rowLen = image.width;
    for (let [index, char] of [...CHARS].entries()) {
      const x = (index * size) % rowLen;
      const y = Math.floor((index * size) / rowLen) * size;
      fontSprite.define(char, x, y, size, size);
    }
    return new Font(fontSprite, size);
  });
}
