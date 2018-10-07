import './style.scss';
import html from './index.html';

import { createBattleField } from '../battle/index';
import { addUser, searchUser } from './base';
import { showLoader } from '../loading/index';
import { UTILS, audioPlay } from '../../utils/utilities';

const backgroundImg = require('./images/background.png');
let allowClick = true;

const loginComponent = UTILS.createNewElement('div', 'wrapper');
loginComponent.innerHTML = html;

document.body.style.backgroundImage = `url(${backgroundImg})`;

const restartClick = () => {
  allowClick = true;
};

loginComponent.welcomeForm = loginComponent.querySelector('.welcome-form');
loginComponent.formMessage = loginComponent.querySelector('#form-message');

loginComponent.userName = loginComponent.querySelector('input[name="name"]');
loginComponent.userPassword = loginComponent.querySelector('input[name="password"]');

loginComponent.registerButton = loginComponent.querySelector('#register');

loginComponent.listenForm = loginComponent.addEventListener('submit', checkUser, false);
loginComponent.registerButton.addEventListener('click', registerUser, false);

function checkUser(event) {
  event.preventDefault();
  const user = loginComponent.userName.value.toString();
  const password = loginComponent.userPassword.value.toString();
  searchUser(user, password); 
};

function registerUser() {
  const user = loginComponent.userName.value.toString();
  const password = loginComponent.userPassword.value.toString();
  addUser(user, password);
};

const getStart = async () => {
  if (allowClick)  {
    allowClick = false;
    loginComponent.classList.add('hidden');
   
    await showLoader(5000, 'Управление c клавиатуры: SPACE - вызов меню, TAB - переключение, ENTER - выбор');  
    await createBattleField();   
    loginComponent.formMessage.textContent = '';
  }
};

export { loginComponent, getStart, restartClick };
