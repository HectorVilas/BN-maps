import mapData from './mapData';
import drawMapInfo from './drawMapInfo';

let loadedMap;

export default async function domMapPage(jsonMap) {
  loadedMap = await mapData(jsonMap);

  const mapPage = document.createElement('section');
  const mapViewer = document.createElement('div');
  mapViewer.id = 'map-viewer';

  mapViewer.append(drawMapInfo(loadedMap, 0, 0));
  mapPage.append(mapViewer);

  return mapPage;
}
