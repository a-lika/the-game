import './style.scss';
import html from './index.html';

import { switchToButtle, audioPlay } from '../../index';

const noticeAccept = require('../../sounds/notice-accept.mp3');
const noticeError = require('../../sounds/notice-error.mp3');

let allowClick = true;
let correct;
let answer;
let task;

function CreateTaskMoreLess() {
  task = this.task;
  task = document.createElement('div');
  task.classList.add('task-display');
  task.innerHTML = html;
  document.body.appendChild(task);
  
  task.firstNumber = task.querySelector('.first-number');
  task.secondNumber = task.querySelector('.second-number');
  task.equalSign = task.querySelector('.equal-sign');
  
  task.buttonFields = task.querySelector('.task-button-fields');
  task.message = task.querySelector('.message');

  insertNumbers(task.firstNumber, task.secondNumber);
  task.buttonFields.addEventListener('click', checkAnswer, false);
};

const insertNumbers = (firstNumber, secondNumber) => {
  const number1 = _.random(1, 200);
  const number2 = _.random(1, 200);
  
  firstNumber.textContent = number1;
  secondNumber.textContent = number2;
  
  if(number1 > number2) {
    answer = '>';
  } else if(firstNumber === secondNumber) {
    answer = '=';
  } else {
    answer = '<';
  }
};

const checkAnswer = event => {
  event.preventDefault();
  
  if(allowClick) {
    allowClick = false;
    
    switch(event.target.className) {
      case 'more'  : {
        if(answer === '>') {
          correct = true;
          showCorrect(event.target);
        } else {
          correct = false;
          showMistake(event.target);
        }
        break;
      }
      case 'same' : {
        if(answer === '=') {
           correct = true;
          showCorrect(event.target);
        } else { 
          correct = false;
          showMistake(event.target);
        }
        break;
      }
      case 'less' : {
        if(answer === '<') {
          correct = true;
          showCorrect(event.target);
        } else {
          correct = false;
          showMistake(event.target);
        }
        break;
      }
    };
    setTimeout(changeDisplay, 2000);
  }
};

const changeDisplay = () => {
  task.remove();
  task.buttonFields.removeEventListener('click', checkAnswer, false);
  allowClick = true;
  switchToButtle(correct);
 };

const showCorrect = (button) => {
  task.buttonFields.classList.remove('available');
  audioPlay(noticeAccept);
  task.message.textContent = 'Верно!'
  task.message.classList.add('correct');
  task.equalSign.textContent = answer;
  button.classList.add('correct');
};

const showMistake = (button) => {
  task.buttonFields.classList.remove('available');
  audioPlay(noticeError);
  task.message.textContent = 'Ошибка';
  task.message.classList.add('mistake');
  task.equalSign.textContent = answer;
  button.classList.add('mistake');
 };

export { CreateTaskMoreLess };