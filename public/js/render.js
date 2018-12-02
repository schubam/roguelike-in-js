export const TILE_SIZE = 16;

export function createBuffer(width, height) {
  const buffer = document.createElement("canvas");
  buffer.width = width * TILE_SIZE;
  buffer.height = height * TILE_SIZE;
  return buffer;
}

const colorForTile = tile => {
  switch (tile) {
    case " ":
      return "darkgreen";
    case "W":
      return "darkgrey";
    case "X":
      return "gold";
    case "@":
      return "darkblue";
    case ">":
      return "pink";
    case "K":
      return "orange";
    case "D":
      return "darkbrown";

    default:
      return "color-1";
  }
};

export function renderPaletteTile(tile, x, y, context, palette) {
  palette.drawProjected(
    colorForTile(tile),
    context,
    0,
    0,
    palette.width,
    palette.width,
    x * TILE_SIZE,
    y * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  );
}

const tileForName = name => {
  switch (name) {
    case " ":
      return "ground-generic";
    case "[":
      return "wall-top-left";
    case "]":
      return "wall-top-right";
    case "{":
      return "wall-bottom-left";
    case "}":
      return "wall-bottom-right";
    case "W":
      return "wall-top-inner";
    case "|":
      return "wall-side-inner";
    case "D":
      return "door-closed";
    case ">":
      return "stairs-down";
    case "K":
      return "key";
    case "X":
      return "gold";
  }
};

export function renderSpriteTile(tile, x, y, context, sprites) {
  sprites.drawTile(tileForName(tile), context, x, y);
}
