import * as COLORS from "./colors.js";

function clearBackground(context, area) {
  const oldFillStyle = context.fillStyle;
  context.fillStyle = COLORS.background;
  context.fillRect(area.x, area.y, area.width, area.height);
  context.fillStyle = oldFillStyle;
}

function playerStat(player, attr, pad, maxPad = 2) {
  const lookup = {
    level: "Level",
    gold: "Gold",
    experience: "XP",
    strength: "Str",
    armor: "AC"
  };
  return `${lookup[attr]}:${player[attr].toString().padStart(maxPad, pad)} `;
}

function titlebar(context, font, store) {
  const text = "Roguelike";
  font.print(text, context, 13 * 8 - Math.floor(text.length / 2), 0); // WTF?
}

function sidebar(context, font, store) {
  context.fillStyle = COLORS.sidebar;
  context.fillRect(26 * 8, 8, 6 * 8, 26 * 8);
}

function statusbar(context, font, store) {
  const line1 = { x: 0, y: 27 * font.size };
  const line2 = { x: 0, y: 28 * font.size };
  const line3 = { x: 0, y: 29 * font.size };
  const area = {
    x: 0,
    y: 27 * font.size,
    width: 32 * font.size,
    height: 3 * font.size
  };
  clearBackground(context, area);

  const state = store.getState();
  const { player } = state;

  let line1Text = "";
  line1Text += playerStat(player, "level", 0);
  line1Text += playerStat(player, "gold", " ", 3);
  line1Text += playerStat(player, "experience", " ", 3);
  line1Text += ` (${player.position.x + "," + player.position.y})`;

  font.print(line1Text, context, line1.x, line1.y);
  let line2Text = "";
  line2Text += `${player.currentHealth.toString().padStart(2, " ")}/${player.health.toString().padStart(2, " ")}HP `;
  line2Text += playerStat(player, "strength", 0);
  line2Text += playerStat(player, "armor", " ");
  font.print(line2Text, context, line2.x, line2.y);

  font.print(`mock text.. what is happening?`, context, line3.x, line3.y);
}

export function createUserInterfaceLayer(font, store) {
  return function drawUserInterface(context) {
    titlebar(context, font, store);
    sidebar(context, font, store);
    statusbar(context, font, store);
  };
}
