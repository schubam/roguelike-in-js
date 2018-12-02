import loadSpriteSheet from "./loadSpriteSheet.js";

export default async function loadColorPalette() {
  return await loadSpriteSheet("edg32");
}
