import drawMapInfo from './drawMapInfo';

export default async function createFloorList(loadedMapInfo, mapViewerId) {
  const loadedMap = loadedMapInfo;
  const buttonsList = [];
  loadedMap.blueprint.floors.reverse().forEach((floor, i) => {
    const div = document.createElement('div');
    div.classList.add('floor-btn-div');
    div.style.zIndex = i * -1;

    const para = document.createElement('p');
    para.classList.add('floor-om-terrain');
    para.textContent = floor[0].om_terrain;

    if (floor.length > 1) {
      const span = document.createElement('span');
      span.textContent = ` (${floor.length} variants)`;
      para.append(span);
    }

    const btnFloor = document.createElement('div');
    btnFloor.classList.add('floor-btn');
    btnFloor.value = para.textContent;
    if (btnFloor.value.includes('_roof')) btnFloor.classList.add('roof');
    if (btnFloor.value.includes('_basement')) btnFloor.classList.add('basement');

    [btnFloor, para].forEach((element) => {
      element.addEventListener('click', async () => {
        const mapViewer = document.querySelector(`#${mapViewerId}`);
        loadedMap.floor = i;
        loadedMap.variant = 0;
        mapViewer.replaceChildren(
          await drawMapInfo(loadedMap.blueprint, loadedMap.floor, loadedMap.variant),
        );
      });
    });

    div.append(btnFloor, para);
    if (floor.length > 1) {
      const btnVariantNext = document.createElement('div');
      btnVariantNext.classList.add('floor-btn-next');
      btnVariantNext.textContent = '>';

      const btnVariantPrev = document.createElement('div');
      btnVariantPrev.classList.add('floor-btn-prev');
      btnVariantPrev.textContent = '<';

      btnVariantNext.addEventListener('click', async () => {
        const mapViewer = document.querySelector(`#${mapViewerId}`);
        if (loadedMap.floor !== i) loadedMap.variant = 0;
        loadedMap.floor = i;
        loadedMap.variant += 1;
        if (!floor[loadedMap.variant]) loadedMap.variant = 0;
        mapViewer.replaceChildren(
          await drawMapInfo(loadedMap.blueprint, loadedMap.floor, loadedMap.variant),
        );
      });
      btnVariantPrev.addEventListener('click', async () => {
        const mapViewer = document.querySelector(`#${mapViewerId}`);
        loadedMap.floor = i;
        loadedMap.variant -= 1;
        if (!floor[loadedMap.variant]) loadedMap.variant = floor.length - 1;
        mapViewer.replaceChildren(
          await drawMapInfo(loadedMap.blueprint, loadedMap.floor, loadedMap.variant),
        );
      });
      div.append(btnVariantNext, btnVariantPrev);
    }
    buttonsList.push(div);
  });
  return buttonsList;
}
