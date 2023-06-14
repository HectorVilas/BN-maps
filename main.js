import './src/styles/style.css';
import domHome from './src/modules/domHome';

const app = document.querySelector('#app');
app.append(domHome());
