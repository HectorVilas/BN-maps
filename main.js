import './src/styles/style.css';
import './src/styles/mapPage.css';
import domHome from './src/modules/domHome';

const app = document.querySelector('#app');
async function loadApp() {
  app.append(await domHome());
}

loadApp();
