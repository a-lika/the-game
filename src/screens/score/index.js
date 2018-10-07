import './style.scss';

import { createBattleField, restartGame, reset } from '../battle/index';
import { updateScore, searchBestPlayers } from './score-data';
import { showLoader } from '../loading/index';
import { UTILS, audioPlay } from '../../utils/utilities';

import { loginComponent, restartClick } from '../login/index';

const backgroundImg = require('./images/background.png');
const gameOverSound = require('./sounds/game-over.mp3');

let table;
let elements;

const showScores = async (instances, countMonsters) => {
  updateScore(`${loginComponent.userName.value}`, countMonsters);
  audioPlay(gameOverSound);
  elements = instances;
  UTILS.hideElementFromWindow(instances);
  table = new ScoreTable(countMonsters);
};

function ScoreTable(countMonsters) {
  this.scoreField = UTILS.createNewElement('div', 'score-table');
  this.tableInstance = document.createElement('table');
  this.caption = document.createElement('caption');
  this.caption.textContent = 'Игра окончена';
  this.thUser = document.createElement('th');
  this.thUser.textContent = 'Игрок';
  this.thMonsters = document.createElement('th');
  this.thMonsters.textContent = 'Побеждено монстров';
  this.tr = document.createElement('tr');
  this.tdUserName = document.createElement('td');
  this.tdUserName.textContent = `${loginComponent.userName.value}`;
  this.tdCountNonsters = document.createElement('td');
  this.tdCountNonsters.textContent = countMonsters;
  
  this.buttonsField = UTILS.createNewElement('div', 'score-table-buttons');
  this.buttonsField.innerHTML = '<button type="button" class="restart-button" id="score-restart"/>Новая игра</button><button type="button" class="exit-button" id="score-exit"/>Выйти</button>';
  
  this.tr.appendChild(this.tdUserName);
  this.tr.appendChild(this.tdCountNonsters);
  this.tableInstance.appendChild(this.caption);
  this.tableInstance.appendChild(this.thUser);
  this.tableInstance.appendChild(this.thMonsters);
  this.tableInstance.appendChild(this.tr);
  this.scoreField.appendChild(this.tableInstance);
  this.scoreField.appendChild(this.buttonsField);
  
  searchBestPlayers(this.scoreField, this.buttonsField);
  document.body.appendChild(this.scoreField);
  this.buttonsField.addEventListener('click', gameOverChoose, false);
};

const gameOverChoose = e => {
  switch(e.target.id) {
    case 'score-restart' : {
      table.buttonsField.removeEventListener('click', gameOverChoose, false);
      table.scoreField.remove();
      elements.forEach((el) => el.remove());
      UTILS.showElementFromWindow(elements);
      restartGame();
      break;
    }
    case 'score-exit' : {
      table.buttonsField.removeEventListener('click', gameOverChoose, false);
      table.scoreField.remove();
      exit(elements);
      break;
    }
  }
};

const exit = instances => {
  restartClick();
  reset();
  instances.forEach((el) => el.remove());
  UTILS.showElementFromWindow(instances);
  UTILS.сhooseBackground(backgroundImg);
  loginComponent.formMessage.textContent = '';
  loginComponent.classList.remove('hidden');
};

export { showScores };

