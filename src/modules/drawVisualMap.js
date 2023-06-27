import getTiles from './getTiles';

export default async function drawVisualMap(jsonMap, floor, variant) {
  const generatedMap = document.createElement('div');
  const chosenMap = await jsonMap.floors[floor][variant];
  const blueprint = chosenMap.object.rows;
  const chosenMapWidth = blueprint[0].length;
  const chosenMapHeight = blueprint.length;
  const paletteList = {};
  let charList = {};

  // group all map palettes
  if (chosenMap?.object?.terrain) paletteList.terrain = chosenMap.object.terrain;
  if (chosenMap?.object?.furniture) paletteList.furniture = chosenMap.object.furniture;
  if (chosenMap?.object?.palettes) paletteList.palettes = chosenMap.object.palettes;

  // list all chars as keys, no values
  blueprint.forEach((row) => {
    row.split('').forEach((char) => {
      charList[char] = {
        terrain: undefined,
        furniture: undefined,
        items: undefined,
        place_loot: undefined,
      };
    });
  });

  // add values with CSS background properties
  charList = await getTiles('BrownLikeBears', charList, paletteList);

  // create row divs and tile divs
  for (let y = 0; y < chosenMapHeight; y += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let x = 0; x < chosenMapWidth; x += 1) {
      const char = chosenMap.object.rows[y][x];
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.dataset.x = x;
      tile.dataset.y = y;
      tile.textContent = `${char}`;
      tile.style.background = charList[char];

      row.append(tile);
    }
    generatedMap.append(row);
  }

  return generatedMap;
}
