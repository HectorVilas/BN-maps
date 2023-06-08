import drawMapInfo from './drawMapInfo';

export default function domMapPage() {
  const mapPage = document.createElement('section');
  const mapViewer = document.createElement('div');
  mapViewer.setAttribute('id', 'map-viewer');

  const btnTest = document.createElement('button');
  btnTest.textContent = 'load map';
  btnTest.addEventListener('click', () => {
    drawMapInfo('./json/mapgen/house/2storymodern01.json', 0, 0);
  });

  mapPage.append(
    mapViewer,
    btnTest,
  );

  return mapPage;
}
