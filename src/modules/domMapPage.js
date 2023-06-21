import mapData from './mapData';
import drawMapInfo from './drawMapInfo';

const loadedMap = {
  blueprint: [],
  floor: 0,
  variant: 0,
};

export default async function domMapPage(jsonMap) {
  loadedMap.blueprint = await mapData(jsonMap);

  const mapPage = document.createElement('section');
  const mapViewer = document.createElement('div');
  mapViewer.id = 'map-viewer';
  const floorList = document.createElement('div');
  floorList.id = 'map-floors';

  loadedMap.blueprint.floors.forEach((floor, i) => {
    const div = document.createElement('div');
    div.classList.add('floor-btn-div');

    const omTerrain = floor[0].om_terrain;
    const btnFloor = document.createElement('button');
    btnFloor.classList.add('floor-btn');
    btnFloor.textContent = `${
      typeof omTerrain === 'string' ? omTerrain : `[${omTerrain.toString().split(',').join('] [')}]`
    }`;

    btnFloor.addEventListener('click', () => {
      loadedMap.floor = i;
      loadedMap.variant = 0;
      mapViewer.replaceChildren(
        drawMapInfo(loadedMap.blueprint, loadedMap.floor, loadedMap.variant),
      );
    });

    div.append(btnFloor);
    if (floor.length > 1) {
      const btnVariantNext = document.createElement('button');
      btnVariantNext.classList.add('floor-btn-next');
      btnVariantNext.textContent = '>';

      const btnVariantPrev = document.createElement('button');
      btnVariantPrev.classList.add('floor-btn-prev');
      btnVariantPrev.textContent = '<';

      btnVariantNext.addEventListener('click', () => {
        if (loadedMap.floor !== i) loadedMap.variant = 0;
        loadedMap.floor = i;
        loadedMap.variant += 1;
        if (!floor[loadedMap.variant]) loadedMap.variant = 0;
        mapViewer.replaceChildren(
          drawMapInfo(loadedMap.blueprint, loadedMap.floor, loadedMap.variant),
        );
      });
      btnVariantPrev.addEventListener('click', () => {
        loadedMap.floor = i;
        loadedMap.variant -= 1;
        if (!floor[loadedMap.variant]) loadedMap.variant = floor.length - 1;
        mapViewer.replaceChildren(
          drawMapInfo(loadedMap.blueprint, loadedMap.floor, loadedMap.variant),
        );
      });
      div.append(btnVariantNext, btnVariantPrev);
    }

    floorList.append(div);
  });

  mapViewer.append(drawMapInfo(loadedMap.blueprint, loadedMap.floor, loadedMap.variant));
  mapPage.append(
    mapViewer,
    floorList,
  );

  return mapPage;
}
