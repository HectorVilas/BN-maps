import mapData from './mapData';
import drawMapInfo from './drawMapInfo';

let loadedMap;

export default async function domMapPage(jsonMap) {
  loadedMap = await mapData(jsonMap);

  const mapPage = document.createElement('section');
  const mapViewer = document.createElement('div');
  mapViewer.id = 'map-viewer';
  const floorList = document.createElement('div');
  floorList.id = 'map-floors';

  loadedMap.floors.forEach((floor) => {
    const div = document.createElement('div');

    const btnFloor = document.createElement('button');
    const omTerrain = floor[0].om_terrain;
    btnFloor.textContent = `${
      typeof omTerrain === 'string' ? omTerrain : omTerrain.toString().split(',').join(' + ')
    }`;

    div.append(btnFloor);
    if (floor.length > 1) {
      const btnVariantNext = document.createElement('button');
      btnVariantNext.textContent = '>';
      const btnVariantPrev = document.createElement('button');
      btnVariantPrev.textContent = '<';
      div.append(btnVariantNext, btnVariantPrev);
    }

    floorList.append(div);
  });

  mapViewer.append(drawMapInfo(loadedMap, 0, 0));
  mapPage.append(
    mapViewer,
    floorList,
  );

  return mapPage;
}
