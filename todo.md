# Todo

## Worked on last

- changing level
- update UI with entity changes after collision (right now after state update gold disappears, but player not there yet)
- show enemies
- make rooms/maps procedurally
  - use patterns for ground
  - paint ground first, then walls
- combat (lose health)

### Changing level/loading level

## Start Game

Get handle to canvas - ok
Create game state for player, status - ok

### Load assets

- Font - ok
- Dungeon Sprites - ok
- Character Sprites - ok

### Start Level

- load level data (currently json) - ok
- create/update camera - ok
- create store for level state (level, enemies) - ok
- setupInput (need store or rather dispatch) - ok
- create render layers (UI, Background, Entities, Player) - ok
- create update-loop (cameraFollowsPlayer, updateEntities, draw) - ok
- finish level
- load next level
