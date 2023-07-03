import createMapgenList from './createMapgenList';

export default async function domHome() {
  const section = document.createElement('main');

  const h1 = document.createElement('h1');
  h1.textContent = 'BN Maps';

  const mapList = document.createElement('div');
  mapList.append(await createMapgenList());

  section.append(
    h1,
    mapList,
  );

  return section;
}
