import './style.scss';
import html from './index.html';
import KeyCode from 'keycode-js';

import { applySettings, chooseAction, showSettings, spellName } from './usage-modal-dialog';
import { attackInstancesArray } from '../../screens/battle/index';
import { switchToTask } from '../tasks/index';

const modalDialog = document.createElement('div');
modalDialog.classList.add('modal-dialog');
modalDialog.innerHTML = html;

modalDialog.window = modalDialog.querySelector('.modal-window');
modalDialog.name = modalDialog.querySelector('.modal-name');
modalDialog.spellsType = modalDialog.querySelector('.modal-list');
modalDialog.heal = modalDialog.querySelector('.modal-heal');
modalDialog.attack = modalDialog.querySelector('.modal-attack');
modalDialog.settings = modalDialog.querySelector('.modal-settings');
modalDialog.audio  = modalDialog.querySelector('.modal-audio');
modalDialog.cancel = modalDialog.querySelector('.modal-cancel');
modalDialog.exit = modalDialog.querySelector('.modal-exit'); 
modalDialog.spellsList = modalDialog.querySelector('.modal-spells-list');

modalDialog.settings.addEventListener('click', applySettings, false);
modalDialog.spellsType.addEventListener('click', chooseAction, false);
modalDialog.name.addEventListener('click', showSettings, false);

const keyBoardFunc = e => {
  e = (e.keyCode === KeyCode.KEY_SPACE) ? showSettings() : null;
  return e
};

modalDialog.addKeyBordEvent = () => {
  document.addEventListener("keydown", keyBoardFunc, false);
};
  
modalDialog.removeKeyBordEvent = () => {
  document.removeEventListener("keydown", keyBoardFunc, false);
};
  
const goToTaskScreen = (spellInfo) => {
  const args = attackInstancesArray;
  switchToTask(args, spellInfo);
};

export { modalDialog, goToTaskScreen };