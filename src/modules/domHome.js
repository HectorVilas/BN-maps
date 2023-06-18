import domMapPage from './domMapPage';

const app = document.querySelector('#app');

export default function domHome() {
  const section = document.createElement('main');

  const h1 = document.createElement('h1');
  h1.textContent = 'BN Maps';

  const ul = document.createElement('ul');
  const mapList = [
    './json/mapgen/house/2storymodern01.json',
    './json/mapgen/house/bungalow01.json',
    './json/mapgen/house/garden_house_1.json',
    './json/mapgen/house/house_garage_prepper.json',
    './json/mapgen/house/urban_1_house.json',
  ];
  mapList.forEach((link) => {
    const li = document.createElement('li');
    li.textContent = link.split('/').at(-1).split('.json').at(0);
    li.addEventListener('click', async () => {
      app.replaceChildren(await domMapPage(link));
    });

    ul.append(li);
  });

  section.append(
    h1,
    ul,
  );
  return section;
}
