function listFolder(fileList, title) {
  const div = document.createElement('div');
  div.classList.add('mapgen-list-folder');
  const h2 = document.createElement('h2');
  h2.textContent = title;
  div.append(h2);

  for (const file in fileList) {
    if (Object.hasOwn(fileList, file)) {
      if (Array.isArray(fileList[file])) {
        fileList[file].forEach((item) => {
          const para = document.createElement('p');
          para.textContent = item.split('/').at(-2).split('.json').at(0);
          div.append(para);
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
