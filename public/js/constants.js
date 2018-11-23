export const TILE_SIZE = 8;
export const WIDTH = 32;
export const HEIGHT = 30;

export function indexToPosition(index) {
  return { x: index % WIDTH, y: Math.floor(index / WIDTH) };
}

export function positionToIndex(pos) {
  return pos.y * WIDTH + pos.x;
}
