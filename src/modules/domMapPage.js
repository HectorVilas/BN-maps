import mapData from './mapData';
import drawMapInfo from './drawMapInfo';
import createFloorList from './createFloorList';

export default async function domMapPage(jsonMap) {
  const loadedMap = {
    blueprint: [],
    floor: 0,
    variant: 0,
  };
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

  floorList.replaceChildren(
    ...await createFloorList(loadedMap, mapViewer.id),
  );
  mapViewer.append(await drawMapInfo(loadedMap.blueprint, loadedMap.floor, loadedMap.variant));
  mapPage.append(
    btnBack,
    mapViewer,
    floorList,
  );

  return mapPage;
}
