import './style.scss';
import html from './index.html';

const cloudInfo = document.createElement('div');
cloudInfo.classList.add('cloud-window');
cloudInfo.innerHTML = html;

cloudInfo.number = cloudInfo.querySelector('.cloud-monster-info');

export { cloudInfo };