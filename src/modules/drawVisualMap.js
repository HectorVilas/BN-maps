export default async function drawVisualMap(jsonMap, floor, variant) {
  const generatedMap = document.createElement('div');
  const chosenMap = await jsonMap.floors[floor][variant];
  const chosenMapWidth = chosenMap.object.rows[0].length;
  const chosenMapHeight = chosenMap.object.rows.length;

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

      row.append(tile);
    }
    generatedMap.append(row);
  }

  return generatedMap;
}
