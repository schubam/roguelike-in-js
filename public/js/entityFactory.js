import GameObject from "./gameObject.js";
import loadSpriteSheet from "./loaders/loadSpriteSheet.js";
import playerFactory from "./playerFactory.js";

export async function loadEntities() {
  const sprite = await loadSpriteSheet("chara_hero");
  const dude = await loadSpriteSheet("character");
  return {
    dude: dudeFactory(dude),
    player: playerFactory(sprite)
  };
}

function dudeFactory(sprite) {
  const walkAnims = {
    right: sprite.animations.get("red-dude-walk-right"),
    left: sprite.animations.get("red-dude-walk-left"),
    up: sprite.animations.get("red-dude-walk-up"),
    down: sprite.animations.get("red-dude-walk-down")
  };

  const animationSprite = dude => {
    return "red-dude-right-1";
    return walkAnims.down(dude.lifetime);
  };

  function drawDude(context) {
    console.log("draw dude");
    sprite.draw(animationSprite(this), context, 0, 0);
  }

  return function createDude() {
    const dude = new GameObject();
    dude.draw = drawDude;
    return dude;
  };
}
