import mapData from './mapData';

export default async function drawMapInfo(jsonMap, floor, variant) {
  const selectedMap = await mapData(jsonMap);
  const mapViewer = document.querySelector('#map-viewer');
  mapViewer.replaceChildren();

  for (let y = 0; y < selectedMap.height; y += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let x = 0; x < selectedMap.width; x += 1) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.dataset.x = x;
      tile.dataset.y = y;
      tile.textContent = `${selectedMap.floors[floor][variant].object.rows[y][x]}`;

      row.append(tile);
    }
    mapViewer.append(row);
  }
  // console.log(selectedMap.floors[floor][variant]);
}
