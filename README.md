# Welcome to Bright Nights Maps

## Live: [hectorvilas.github.io/bn-maps](https://hectorvilas.github.io/bn-maps/)

---

## About this
This is a little project to let the players explore all the mapgen blueprints from the game [Cataclysm: Bright Nights](https://github.com/cataclysmbnteam/Cataclysm-BN) in their browsers.

The original `JSON` files and tilesets from the game will be used for this purpose, recreating each blueprint as seen on the game.

---

## planning
### Listing maps and tilesets:
> As there's no way to browse folders and files from the frontend alone without importing or referencing each file, this part will require some extra tool to make a list. `nodeJs` or maybe `Python`/`C#` will be used for this step. I have no experience with `nodeJs` and very little with the other languages, so this will be trial and error.

- a `JSON` file will be generated, listing:
  - each `JSON` file from mapgen, including subfolders
  - each tileset folder from gfx

### When map is picked:
- fetch map data
  - organize floors
  - add any neccesary extra info
  - store it globally
- draw map page elements (if map page not drawn):
  - grid view
  - buttons section (floor and variant)
  - map data Section
  - floor data section
  - tile data section
  - search bar
  - tileset list.
- on grid:
  - clear and draw first floor on it's first variant ([more details below](#drawing-the-map-on-the-grid))
- on buttons section (floor and variant):
  - clear and create a button for each floor on the stored map:
    - if floor has variants, add arrow shaped buttons on each side of the button
    - if the floor's ID includes `_roof`, `_basement` or is ground floor, the button will have different appearance
    - add listeners to each button:
      - draw the selected floor and update data for first variant
      - the left variant button will draw the previous variant and the right button the next one, carousel style
      - clear and fill floor data sections with the selected floor and variant
- on data sections:
  - clear and fill info with values from the global variable

### drawing the map on the grid:
> Here I'll work with the original `JSON` files. I've been reading the game's documentation ([the beginner one](https://github.com/cataclysmbnteam/Cataclysm-BN/tree/upload/doc/JSON%20Mapping%20Guides), I still have to read the [intermediate guide](https://github.com/CleverRaven/Cataclysm-DDA/blob/master/doc/JSON_Mapping_Guides/Guide_for_intermediate_mapgen.md)) and I think I can manage with small maps and the less complex tilesets, for now.
- the selected floor and variant will be received as argument
- the grid will be cleared
- a new grid will be created:
  - `flex` will be used instead of `grid`, for performance reasons
  - the ascii blueprint from the argument will be iterated with a double `for`:
    - a `div` will be added as child for each row
    - for each column a new `div` will be added as child to its respective row `div`:
      - the blueprint's simbol will be searched on the blueprint's `terrain` or its 'mapgen_palette'
      - its value will be passed as argument to another module that picks the correct tile from the selected tileset ([more details below](#finding-a-tile-on-a-tileset)):
      - its return will have the required `style` to accomodate the tileset with the correct zoom and position
      - as second layer, if the simbol is referenced in `furniture`:
        - a new `div` will be created and added as child of its tile
        - its width and height (from the tileset data) will be set, as percentage
        - the module that returns the requierd `style` will set its background image
        - this `div` will have position absolute while its parent will have position relative
        - use `offset` data to position the div, otherwise position it at the bottom-center

### finding a tile on a tileset
- a function dedicated to reading tilesets will receive as parameters:
  - the selected tileset
  - the `terrain`/`furniture`'s ID
- the tile size from the tileset passed from the argument will be used to know the dimension of each tile on its corresponding tileset:
  - the coordinates of the image will be adjusted with `style`
- the `terrain`/`furniture`'s ID will be searched on the tileset's `JSON`:
  - if found, read it's position (`bg`/`fg`)
  - else, use the fallback value
- with `16%0` and `Math.floor(ID)` get the exact offset for the tileset
- return a `style` to apply to the requested tile
  - include offset values if present