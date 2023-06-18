export default function drawMapInfo(jsonMap, floor, variant) {
  const generatedMap = document.createElement('div');

  for (let y = 0; y < jsonMap.height; y += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let x = 0; x < jsonMap.width; x += 1) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.dataset.x = x;
      tile.dataset.y = y;
      tile.textContent = `${jsonMap.floors[floor][variant].object.rows[y][x]}`;

      row.append(tile);
    }
    generatedMap.append(row);
  }

  return generatedMap;
}
