import './style.scss';

import { showLoader } from '../../screens/loading/index';
import { UTILS } from '../../utils/utilities';
import { showDisplay } from '../../screens/battle/index';

import { CreateTaskEngToRo } from './tasks/engToRu/index';
import { CreateTaskDraggableWord } from './tasks/draggableWord';
import { CreateTaskListeningEngWord } from './tasks/listeningEngWord';
import { CreateTaskSimpleMath } from './tasks/simpleMath';
import { CreateTaskMathRange } from './tasks/mathRange';
import { CreateTaskMoreLess } from './tasks/moreLess';
import { CreateTaskRuToEngChoose } from './tasks/ruToEngChoose';
import { CreateTaskSortOrder } from './tasks/sortOrder';

const backgroundImg = require('./images/background-rainbow.jpg');

let spell;

const audioPlay = (audio) => {
  const modalAudio = document.querySelector('.modal-audio'); 
  if (!modalAudio.classList.contains('hide-sound')) {
    const sound = new Audio;
    sound.src = audio;
    document.body.appendChild(sound);
    sound.play();
    setTimeout(removeElement, 3000, sound);
  }
};

const removeElement = (element) => {
  element.remove();
};

const switchToTask = async (args, spellInfo) => {
  UTILS.hideElementFromWindow(args); 
  await showLoader(1200, 'Загружаем задания');
  UTILS.сhooseBackground(backgroundImg);
  
  if(spellInfo.applyFunction === 'addHealth') {
     spellInfo.spellName = _.sample(['mystery', 'cloud', 'comet', 'laser']);
  }
  
  spell = spellInfo;
  
  switch(spellInfo.spellName) {
    case 'laser' : {
      const task = _.sample([CreateTaskMoreLess, CreateTaskRuToEngChoose]);
      new task();
      break;
    }
    case 'cloud' : {
      const task = _.sample([CreateTaskSortOrder, CreateTaskDraggableWord]);
      new task();
      break;
    }
    case 'comet' : {
      const task = _.sample([CreateTaskMathRange, CreateTaskEngToRo]);
      new task();
      break;
    }
    case 'mystery' : {
      const task = _.sample([CreateTaskSimpleMath, CreateTaskListeningEngWord]);
      new task();
      break;
    }
    default : const task = new CreateTaskEngToRo();
      break;
  }
};

const switchToButtle = async (correct) => {
  await showLoader(700, 'Загружаем персонажей');  
  await showDisplay(correct, spell);
};

export { switchToTask, switchToButtle, audioPlay };