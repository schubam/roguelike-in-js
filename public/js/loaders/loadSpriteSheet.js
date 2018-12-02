import { SpriteSheet } from "../spriteSheet.js";
import { loadImage } from "./loadImage.js";
import { loadJSON } from "./loadJSON.js";

export default async function loadSpriteSheet(name) {
  const spec = await loadJSON(`/sprites/${name}.json`);
  const image = await loadImage(spec.imageURL);
  return new SpriteSheet(image, spec);
}
