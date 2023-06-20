// documentation: https://github.com/cataclysmbnteam/Cataclysm-BN/tree/upload/doc/JSON%20Mapping%20Guides

export default async function mapData(jsonMap) {
  const fetchMap = await fetch(jsonMap);
  const map = await fetchMap.json();
  const organizedMap = {
    floors: [],
  };

  // list all om_terrain IDs
  const omTerrains = [];
  map.forEach((floor) => {
    if (!omTerrains.includes(floor.om_terrain)) omTerrains.push(floor.om_terrain);
  });
  // create an empty array for each ID
  omTerrains.forEach(() => organizedMap.floors.push([]));
  // group each floor variant
  map.forEach((floor) => {
    const floorsIdx = omTerrains.indexOf(floor.om_terrain);
    organizedMap.floors[floorsIdx].push(floor);
  });

  return organizedMap;
}
