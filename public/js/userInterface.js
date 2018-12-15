function playerStat(player, attr, pad, maxPad = 2) {
  const lookup = {
    level: "Level",
    gold: "Gold",
    experience: "XP",
    strength: "Str",
    keys: "Keys",
    armor: "AC"
  };
  return `${lookup[attr]}:${player[attr].toString().padStart(maxPad, pad)} `;
}

function titlebar(context, font, gameStore, levelStore) {
  context.clearRect(0, 0, 32 * font.size, 2 * font.size);

  const text = "Roguelike";
  font.print(text, context, 12 * font.size, 0);
}

function statusbar(context, font, gameStore, levelStore) {
  const line1 = { x: 0, y: 27 * font.size };
  const line2 = { x: 0, y: 28 * font.size };
  const line3 = { x: 0, y: 29 * font.size };
  context.clearRect(0, 26 * font.size, 32 * font.size, 6 * font.size);

  const { playerStats, status } = gameStore.getState();
  const { player } = levelStore.getState();

  let line1Text = "";
  line1Text += playerStat(status, "level", 0);
  line1Text += playerStat(playerStats, "gold", " ", 3);
  line1Text += playerStat(playerStats, "experience", " ", 3);
  line1Text += `(${player.position.x + "," + player.position.y})`;

  font.print(line1Text, context, line1.x, line1.y);
  let line2Text = "";
  line2Text += `HP:${playerStats.currentHealth
    .toString()
    .padStart(2, " ")}/${playerStats.health.toString().padStart(2, " ")} `;
  line2Text += playerStat(playerStats, "strength", 0);
  line2Text += playerStat(playerStats, "armor", " ");
  line2Text += playerStat(playerStats, "keys", " ");
  font.print(line2Text, context, line2.x, line2.y);

  const text = status.messages[status.messages.length - 1].message;
  font.print(text, context, line3.x, line3.y);
}

export function createUserInterfaceLayer(font, gameStore, levelStore) {
  return function drawUserInterface(context) {
    titlebar(context, font, gameStore, levelStore);
    statusbar(context, font, gameStore, levelStore);
  };
}
