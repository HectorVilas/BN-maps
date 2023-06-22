import mapData from './mapData';
import drawMapInfo from './drawMapInfo';

const loadedMap = {
  blueprint: [],
  floor: 0,
  variant: 0,
};

export default async function domMapPage(jsonMap) {
  loadedMap.blueprint = await mapData(jsonMap);

  // for testing
  const btnBack = document.createElement('button');
  btnBack.textContent = 'Back to list';
  btnBack.addEventListener('click', () => {
    window.location.reload();
  });

  const mapPage = document.createElement('section');
  const mapViewer = document.createElement('div');
  mapViewer.id = 'map-viewer';
  const floorList = document.createElement('div');
  floorList.id = 'map-floors';

  loadedMap.blueprint.floors.reverse().forEach((floor, i) => {
    const omTerrain = floor[0].om_terrain;

    const div = document.createElement('div');
    div.classList.add('floor-btn-div');
    div.style.zIndex = i * -1;

    const para = document.createElement('p');
    para.classList.add('floor-om-terrain');
    para.textContent = `${
      typeof omTerrain === 'string' ? omTerrain : `[${omTerrain.toString().split(',').join('] [')}]`
    }`;

    const btnFloor = document.createElement('div');
    btnFloor.classList.add('floor-btn');
    btnFloor.value = para.textContent;
    if (btnFloor.value.includes('_roof')) btnFloor.classList.add('roof');
    if (btnFloor.value.includes('_basement')) btnFloor.classList.add('basement');

    btnFloor.addEventListener('click', () => {
      loadedMap.floor = i;
      loadedMap.variant = 0;
      mapViewer.replaceChildren(
        drawMapInfo(loadedMap.blueprint, loadedMap.floor, loadedMap.variant),
      );
    });

    div.append(btnFloor, para);
    if (floor.length > 1) {
      const btnVariantNext = document.createElement('div');
      btnVariantNext.classList.add('floor-btn-next');
      btnVariantNext.textContent = '>';

      const btnVariantPrev = document.createElement('div');
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
    btnBack,
    mapViewer,
    floorList,
  );

  return mapPage;
}
