# Todo

## Worked on last

- changing level
- show enemies
- make rooms/maps procedurally
    - use patterns for ground
    - paint ground first, then walls
- combat (lose health)

### Changing level/loading level

Start Game
----------
Get handle to canvas - ok
Create game state for player, status - ok

Load assets
- Font
- Dungeon Sprites
- Character Sprites

Start Level
- load level data (currently json)
- create/update camera
- create store for level state (level, enemies) 
- setupInput (need store or rather dispatch)
- create render layers (UI, Background, Entities, Player)
- create update-loop (cameraFollowsPlayer, updateEntities, draw)