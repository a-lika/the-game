import './style.scss';
import html from './index.html';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';

import { switchToButtle, audioPlay } from '../../index';

const noticeAccept = require('../../sounds/notice-accept.mp3');
const noticeError = require('../../sounds/notice-error.mp3');

let allowClick = true;
let correct;
let task;
let correctAnswer;

function CreateTaskSortOrder() { 
  task = this.task;
  task = document.createElement('div');
  task.classList.add('task-display');
  task.innerHTML = html;
  document.body.appendChild(task);
  
  task.sortableArea = task.querySelector('.sortable-area');
  task.message = task.querySelector('.message');
  task.paragraph = task.querySelector('p');
  task.button = task.querySelector('.answer-button');
  task.button.focus();
  
  $( '.sortable-area' ).sortable({ containment: 'parent' });
  fillNumbersArray();
  task.button.addEventListener('click', checkAnswer, false);
};

const fillNumbersArray = () => {
  const fragment = document.createDocumentFragment();
  let numbersArray = [];
  for(let i=0; i < 5; i++) {
    let div = document.createElement('div');
    generateNumber(numbersArray);
    div.textContent = numbersArray[i];
    div.setAttribute('tabindex', '0');
    fragment.appendChild(div);
  }
  task.sortableArea.appendChild(fragment);
  correctAnswer = sortNumbers();
};

const generateNumber = (numbersArray) => {
  const random = _.random(0, 200);
  if(_.includes(numbersArray, random) === true) {
   return generateNumber;
  } else {
    numbersArray.push(random);
    return numbersArray;
  }
};

const sortNumbers = () => {
  let sortableChildren = $('.sortable-area div');
  let content = [].map.call(sortableChildren, (el) => Number(el.textContent));
  let answer;
  const order = _.sample(['>', '<']);
  switch(order) {
    case '>' : {
      task.paragraph.textContent = 'Расположи цифры в порядке возрастания';
      answer = content.sort((a, b) => a > b);
      break;
    }
    case '<' : {
      task.paragraph.textContent = 'Расположи цифры в порядке убывания';
      answer = content.sort((a, b) => a < b);
      break;   
    }
  }
  return answer;
};

const checkArrays = (answerArray, correctAnswer) => {
  let correctAnswerLenght = correctAnswer.length;
    for(let i = 0; i < correctAnswerLenght; i++) {        
      if(answerArray[i] !== correctAnswer[i]) {
      return correct = false;
    } 
  };
   return correct = true;
};

const checkAnswer = event => { 
  event.preventDefault();
  
  if(allowClick) {
    allowClick = false;
    let answerArray = [];
    $( '.sortable-area' ).sortable('disable');
    let sortableChildren = $('.sortable-area div');
    let content = [].map.call(sortableChildren, (el) => Number(el.textContent));
    content.forEach(element => answerArray.push(element));
    console.log(answerArray);

    checkArrays(answerArray, correctAnswer);
    if(correct) {
      showCorrect();
    } else {
      showMistake();
    }
    setTimeout(changeDisplay, 2000);
    }
};

const showCorrect = () => {
  audioPlay(noticeAccept);
  task.message.textContent = 'Верно!'
  task.message.classList.add('correct');
  $( '.sortable-area div' ).addClass('correct');
};

const showMistake = () => {
  audioPlay(noticeError);
  task.message.textContent = 'Ошибка';
  task.message.classList.add('mistake'); 
  $( '.sortable-area div' ).addClass('mistake');
};

const changeDisplay = () => {
  task.remove();
  task.button.removeEventListener('click', checkAnswer, false);
  allowClick = true;
  switchToButtle(correct);
};

export { CreateTaskSortOrder };