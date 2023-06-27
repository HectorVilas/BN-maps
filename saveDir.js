import { readdirSync, promises } from 'fs';

function listFiles(directory) {
  const files = readdirSync(directory);
  const filesFolders = {};

  files.forEach((file) => {
    if (file.includes('.')) {
      if (!('files' in filesFolders)) {
        Object.assign(filesFolders, { files: [] });
      };
      filesFolders.files.push(`${directory}${file}/`);
    } else {
      Object.assign(filesFolders, { [file]: listFiles(`${directory}${file}/`) });
    };
  });
  return filesFolders;
}

async function dumpToFile(filename, content) {
  try {
    await promises.writeFile(filename, JSON.stringify(content));
  } catch (error) {
    console.log(error);
  }
}

const toJson = listFiles('./public/json/mapgen/');

dumpToFile('blueprints.json', toJson);
