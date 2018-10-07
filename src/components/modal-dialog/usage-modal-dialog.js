import './style.scss';
import { modalDialog, goToTaskScreen } from './index';

const buttonsSound = require('./sounds/mouseClick.mp3');
const spellInfo = {};

let applyFunction;
let spellName;
let hpSizeRemove;

const audioPlay = () => {
  if (!modalDialog.audio.classList.contains('hide-sound')) {
    const sound = new Audio;
    sound.src = buttonsSound;
    document.body.appendChild(sound);
    sound.play();
    setTimeout(removeElement, 3000, sound);
  }
};

const removeElement = (element) => {
  element.remove();
};

const applySettings = e => {
  switch(e.target) {        
    case modalDialog.exit : {
      audioPlay();
      window.location.reload();
      break;
    };
    case modalDialog.cancel : {
      audioPlay();
      modalDialog.window.classList.toggle('hidden');
      modalDialog.name.classList.toggle('modal-name-animation');
      break;
    };
    case modalDialog.audio : {
      audioPlay();
      e.target.classList.toggle('hide-sound');
      break;
    };
  }
};

const showSettings = () => {
  audioPlay();
  modalDialog.window.classList.toggle('hidden');
  modalDialog.name.classList.toggle('modal-name-animation');
  modalDialog.spellsList.removeEventListener('click', chooseSpell, false);
  modalDialog.spellsList.classList.add('hidden');
  modalDialog.spellsType.classList.remove('hidden');
};

const chooseAction = e => {
  e.preventDefault();
  
  switch (e.target.parentNode) {
    case modalDialog.heal : {
      modalDialog.removeKeyBordEvent();
      audioPlay();
      spellInfo.applyFunction = 'addHealth';
      modalDialog.name.classList.add('hidden');
      modalDialog.window.classList.add('hidden');
      goToTaskScreen(spellInfo);
      break;
    }         
    case modalDialog.attack : {       
      audioPlay();
      spellInfo.applyFunction = 'removeMonsterHealth';         
      modalDialog.spellsType.classList.add('hidden');
      modalDialog.spellsList.classList.remove('hidden');
      modalDialog.spellsList.addEventListener('click', chooseSpell, false);   
      break;
    };
  }
};

const applySpell = () => { 
  audioPlay();
  modalDialog.name.classList.add('hidden');
  modalDialog.spellsList.removeEventListener('click', chooseSpell, false);
  modalDialog.spellsList.classList.add('hidden');
  modalDialog.spellsType.classList.remove('hidden');
  modalDialog.window.classList.add('hidden');
  goToTaskScreen(spellInfo);
  modalDialog.removeKeyBordEvent();
};

const chooseSpell = e => { 
  switch(e.target.parentNode.className) {        
    case 'modal-spell-laser' : {
      spellInfo.spellName = 'laser';
      spellInfo.hpSizeRemove = _.random(38, 62);
      applySpell();
      break;
    };     
    case 'modal-spell-cloud' : {
      spellInfo.spellName = 'cloud';
      spellInfo.hpSizeRemove = _.random(50, 75);
      applySpell();
      break;
    };
    case 'modal-spell-comet' : {
      spellInfo.spellName = 'comet';
      spellInfo.hpSizeRemove = _.random(63, 87);
      applySpell();
      break;
    };
    case 'modal-spell-mystery' : {
      spellInfo.spellName = 'mystery';
      spellInfo.hpSizeRemove = _.random(75, 100);
      applySpell();
      break;
    };        
  }
};

export { applySettings, chooseAction, showSettings };