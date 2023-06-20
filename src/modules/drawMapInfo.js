export default function drawMapInfo(jsonMap, floor, variant) {
  const generatedMap = document.createElement('div');
  const chosenMap = jsonMap.floors[floor][variant];
  const chosenMapWidth = chosenMap.object.rows[0].length;
  const chosenMapHeight = chosenMap.object.rows.length;

  for (let y = 0; y < chosenMapHeight; y += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let x = 0; x < chosenMapWidth; x += 1) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.dataset.x = x;
      tile.dataset.y = y;
      tile.textContent = `${chosenMap.object.rows[y][x]}`;

      row.append(tile);
    }
    generatedMap.append(row);
  }

  return generatedMap;
}
