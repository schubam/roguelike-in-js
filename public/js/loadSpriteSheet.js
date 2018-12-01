import { loadImage } from "./loaders/loadImage.js";
import { loadJSON } from "./loaders/loadJSON.js";
import { SpriteSheet } from "./spriteSheet.js";

export async function loadSpriteSheet(name) {
  const spec = await loadJSON(`/sprites/${name}.json`);
  const image = await loadImage(spec.imageURL);
  return new SpriteSheet(image, spec);
}
