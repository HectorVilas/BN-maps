import domMapPage from './domMapPage';

function listFolder(fileList, title) {
  const div = document.createElement('div');
  div.classList.add('mapgen-list-folder');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');
  h2.textContent = title;
  div.append(h2, ul);

  for (const file in fileList) {
    if (Object.hasOwn(fileList, file)) {
      if (Array.isArray(fileList[file])) {
        fileList[file].forEach((item, i) => {
          const li = document.createElement('li');
          li.textContent = item.split('/').at(-2).split('.json').at(0);
          li.title = fileList[file][i];

          li.addEventListener('click', async () => {
            const app = document.querySelector('#app');
            app.replaceChildren(await domMapPage(li.title));
          });

          ul.append(li);
        });
      } else {
        div.append(listFolder(fileList[file], file));
      }
    }
  }

  return div;
}

export default async function createMapgenList() {
  const fetchFileList = await fetch('../../fileList/mapgen.json');
  const fileList = await fetchFileList.json();

  return listFolder(fileList, 'root');
}
