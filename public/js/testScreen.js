import loadSpriteSheet from "./loaders/loadSpriteSheet.js";

export async function testScreen() {
  const canvas = document.getElementById("testScreen");
  const context = canvas.getContext("2d");
  const dude = await loadSpriteSheet("character");
  const hero = await loadSpriteSheet("chara_hero");
  const dungeon = await loadSpriteSheet("tiles_dungeon");
  drawAllSprites([hero, dude, dungeon]);
  function drawAllSprites(sheets) {
    let index = 0;
    sheets.forEach(sheet => {
      sheet.tiles.forEach((_, key) => {
        sheet.drawTile(key, context, index % 16, Math.floor(index / 16));
        index++;
      });
    });
  }
}
