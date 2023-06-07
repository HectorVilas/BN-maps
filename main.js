import './src/styles/style.css';
import mapData from './src/modules/mapData';
// JSON files for testing
// import bungalow from './src/json/mapgen/house/bungalow01.json';
import modern from './src/json/mapgen/house/2storymodern01.json';
// import gardenHouse from './src/json/mapgen/house/garden_house_1.json';
// import house from './src/json/mapgen/house/house01.json';
// import urban from './src/json/mapgen/house/urban_1_house.json';


console.log(
  mapData(modern)
);
