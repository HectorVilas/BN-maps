export default async function getTiles(tilesetName, chars, paletteList) {
  const charList = chars;
  const fetchTileset = await fetch(`../../gfx/${tilesetName}/tile_config.json`);
  const tilesetJson = await fetchTileset.json();
  const { width, height } = tilesetJson.tile_info[0];
  // console.log(chars, paletteList);

  // import palettes
  if (paletteList?.palettes) {
    paletteList.palettes.forEach(async (palette) => {
      console.log(palette);
      let fetchPalette;
      try {
        fetchPalette = await fetch(`../../json/mapgen_palettes/${palette}.json`);
      } catch (error) {
        console.log(error);
      }
      const thisPalette = await fetchPalette.json();
      console.log(thisPalette);
    });
    // console.log(paletteList.palettes);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const char in charList) {
    if (Object.hasOwn(charList, char)) {
      // TODO: use category keys for each char instead of adding them unclassified
      charList[char] = 'linear-gradient(45deg, darkgray, gray)';
    }
  }

  // console.log(charList);
  return charList;
}
