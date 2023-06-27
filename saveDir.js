import { readdirSync, promises } from 'fs';

function listFiles(directory) {
  const files = readdirSync(directory);
  const filesFolders = {};

  files.forEach((file) => {
    if (file.includes('.')) {
      if (!('files' in filesFolders)) Object.assign(filesFolders, { files: [] });
      filesFolders.files.push(`${directory}${file}/`);
    } else {
      Object.assign(filesFolders, { [file]: listFiles(`${directory}${file}/`) });
    }
  });
  return filesFolders;
}

async function dumpToFile(filename, content) {
  try {
    await promises.writeFile(filename, JSON.stringify(content));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

const mapgenFolder = listFiles('./public/json/mapgen/');
const mapgenPalletesFolder = listFiles('./public/json/mapgen_palettes/');
const tilesetsFolder = listFiles('./public/gfx/');

dumpToFile('./public/fileList/blueprints.json', mapgenFolder);
dumpToFile('./public/fileList/blueprints_palettes.json', mapgenPalletesFolder);
dumpToFile('./public/fileList/tilesets.json', tilesetsFolder);
