import GameObject from "./gameObject.js";
import Movement from "./components/movement.js";
import * as States from "./components/states.js";

export default function playerFactory(sprite) {
  const animations = {
    [States.IDLE]: sprite.animations.get("player-idle"),
    [States.MOVEMENT_RIGHT]: sprite.animations.get("player-right"),
    [States.MOVEMENT_LEFT]: sprite.animations.get("player-left"),
    [States.MOVEMENT_UP]: sprite.animations.get("player-up"),
    [States.MOVEMENT_DOWN]: sprite.animations.get("player-down")
  };

  function animationSprite(player) {
    const a = animations[player.state];
    return a(player.lifetime);
  }

  function drawPlayer(context) {
    const s = animationSprite(this);
    sprite.draw(s, context, 0, 0);
  }

  return function createplayer() {
    const player = new GameObject();

    player.addComponent(new Movement());

    player.draw = drawPlayer;
    return player;
  };
}
