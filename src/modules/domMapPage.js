import drawMapInfo from './drawMapInfo';

export default function domMapPage(jsonMap) {
  const mapPage = document.createElement('section');
  const mapViewer = document.createElement('div');
  mapViewer.setAttribute('id', 'map-viewer');

  const inputNums = [];
  const numTest = ['floor', 'variant'];
  numTest.forEach((inputNum) => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 0;
    input.max = 3;
    input.value = 0;
    input.classList.add(inputNum);
    input.addEventListener('change', () => {
      const floor = document.querySelector('.floor');
      const variant = document.querySelector('.variant');
      drawMapInfo(jsonMap, floor.value, variant.value);
    });
    inputNums.push(input);
  });

  mapPage.append(
    mapViewer,
    ...inputNums,
  );

  return mapPage;
}
