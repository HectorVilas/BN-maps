import drawMapInfo from './drawMapInfo';

export default function domMapPage() {
  const mapPage = document.createElement('section');
  const mapViewer = document.createElement('div');
  mapViewer.setAttribute('id', 'map-viewer');

  const btnTest = document.createElement('button');
  btnTest.textContent = 'load map';
  btnTest.addEventListener('click', () => {
    const floor = document.querySelector('.floor');
    const variant = document.querySelector('.variant');
    drawMapInfo('./json/mapgen/house/2storymodern01.json', floor.value, variant.value);
  });

  const inputNums = [];
  const numTest = ['floor', 'variant'];
  numTest.forEach((inputNum) => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 0;
    input.max = 10;
    input.value = 0;
    input.classList.add(inputNum);
    inputNums.push(input);
  });

  mapPage.append(
    mapViewer,
    btnTest,
    ...inputNums,
  );

  return mapPage;
}
