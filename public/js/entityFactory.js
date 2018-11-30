import Entity from "./entity.js";
import { loadSpriteSheet } from "./spriteSheet.js";

export async function loadEntities() {
  const sprite = await loadSpriteSheet("chara_hero");
  // const sprite = await loadSpriteSheet("character");
  return createEntityFactories(sprite);
}

function dudeFactory(sprite) {
  // const walkAnim = sprite.animations.get("dude-walk-right");
  function drawDude(context) {
    // sprite.draw(walkAnim(this.lifetime), context, 0, 0);
  }

  return function createDude() {
    const dude = new Entity();
    dude.draw = drawDude;
    return dude;
  };
}

function playerFactory(sprite) {
  const walkAnim = sprite.animations.get("player-action");
  function drawPlayer(context) {
    sprite.draw(walkAnim(this.lifetime), context, 0, 0);
  }

  return function createplayer() {
    const player = new Entity();
    player.draw = drawPlayer;
    return player;
  };
}

function createEntityFactories(sprite) {
  return {
    dude: dudeFactory(sprite),
    player: playerFactory(sprite)
  };
}
