import { readdirSync, promises } from 'fs';

function listFiles(directory) {
  const files = readdirSync(directory);
  const filesFolders = {};

  files.forEach((file) => {
    if (file.includes('.')) {
      // eslint-disable-next-line no-restricted-syntax
      if (!('files' in filesFolders)) Object.assign(filesFolders, { files: [] });
      // removing ./public/ as Vite moves everything from here to the root folder
      const directoryNoPublic = directory.split('public/').join('');
      filesFolders.files.push(`${directoryNoPublic}${file}/`);
    } else {
      Object.assign(filesFolders, { [file]: listFiles(`${directory}${file}/`) });
    }
  });
  return filesFolders;
}

async function dumpToFile(filename, content) {
  try {
    await promises.writeFile(filename, JSON.stringify(content, null, 2));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

const mapgenFolder = listFiles('./public/json/mapgen/');
const mapgenPalletesFolder = listFiles('./public/json/mapgen_palettes/');
const tilesetsFolder = listFiles('./public/gfx/');

dumpToFile('./public/fileList/mapgen.json', mapgenFolder);
dumpToFile('./public/fileList/mapgen_palettes.json', mapgenPalletesFolder);
dumpToFile('./public/fileList/tilesets.json', tilesetsFolder);
