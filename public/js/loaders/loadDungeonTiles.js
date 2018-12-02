import loadSpriteSheet from "./loadSpriteSheet.js";

export default async function loadDungeonTiles() {
  return await loadSpriteSheet("tiles_dungeon");
}
