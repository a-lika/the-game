import './style.scss';
import html from './index.html';

const backgroundImg = require('./images/background.png');

const сhooseBackground = (image) => {
  document.body.style.backgroundImage = `url(${image})`;
};

const loader = document.createElement('div');
loader.innerHTML = html;

loader.text = loader.querySelector('#load-text');

const showLoader = (time, text) => {
  time = Number(time);
  time = !time ? 1600 : time;

  return new Promise(resolve => {
    сhooseBackground(backgroundImg);
    document.body.appendChild(loader);  
    if (text) {
      loader.text.textContent = `${text}`;
    } else {
      loader.text.textContent = 'Загружаем необходимые компоненты';
    }
    setTimeout(() => {
      document.body.removeChild(loader); 
      resolve();
    }, time);
  });
};

export { showLoader };