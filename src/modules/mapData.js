// documentation: https://github.com/cataclysmbnteam/Cataclysm-BN/tree/upload/doc/JSON%20Mapping%20Guides

export default function mapData(jsonMap) {
  const map = {
    width: jsonMap[0].object.rows[0].length,
    height: jsonMap[0].object.rows.length,
    floors: [],
  };

  // list all om_terrain IDs
  const omTerrains = [];
  jsonMap.forEach((floor) => {
    if (!omTerrains.includes(floor.om_terrain)) omTerrains.push(floor.om_terrain);
  });
  // create an empty array for each ID
  omTerrains.forEach(() => map.floors.push([]));
  // group each floor variant
  jsonMap.forEach((floor) => {
    const floorsIdx = omTerrains.indexOf(floor.om_terrain);
    map.floors[floorsIdx].push(floor);
  });

  return map;
};
