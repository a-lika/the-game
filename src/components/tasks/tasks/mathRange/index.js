import './style.scss';
import html from './index.html';

import { switchToButtle, audioPlay } from '../../index';

const noticeAccept = require('../../sounds/notice-accept.mp3');
const noticeError = require('../../sounds/notice-error.mp3');

let allowClick = true;
let correct;
let answer;
let task;

function CreateTaskMathRange() {
  task = this.task;
  task = document.createElement('div');
  task.classList.add('task-display');
  task.innerHTML = html;
  document.body.appendChild(task);
  
  task.answer = task.querySelector('.answer-input-math');
  task.answer.focus();
  task.form = task.querySelector('form');
  task.numbersField = task.querySelector('.numbers-field');
  task.message = task.querySelector('.message');

  insertNumbers(task.numbersField, task.answer);
  task.form.addEventListener('submit', checkAnswer, false);
};

const insertNumbers = (numbersField, answerInput) => {
  const sign = _.sample(['+', '-']);
  const range = _.random(1, 10);
  let number;
  
  switch(sign) {  
    case '+' : {
      number = _.random(1, 100);
      break;
    }
    case '-' : {
      number = _.random(50, 150);
      break;
    }
  }
  
  for (let i=0; i < 5; i++) {
      const div = document.createElement('div');
      div.textContent = number;
      if(i < 4) {
         numbersField.insertBefore(div, answerInput);
      } else { 
        answer = number;
      }
    number = eval(`number${sign}=${range}`);
  }
};

const checkAnswer = event => {
  event.preventDefault();
  
  if(allowClick) {
    allowClick = false;
    const answerInput = document.querySelector('.answer-input-math');
    let answerValue = answerInput.value;
    answerValue = Number(_.trim(answerValue));
    correct = (answer === answerValue) ? true : false;

    if(correct) {
      showCorrect(answerInput);
    } else {
      showMistake(answerInput, answer);
    }
    setTimeout(changeDisplay, 2000);
  }
};

const changeDisplay = () => {
  task.remove();
  task.form.removeEventListener('submit', checkAnswer, false);
  allowClick = true;
  switchToButtle(correct);
 };

const showCorrect = answer => {
  answer.disabled = true;
  audioPlay(noticeAccept);
  task.message.textContent = 'Верно!'
  task.message.classList.add('correct');
  answer.classList.add('correct');
};

const showMistake = (answer, variable) => {
  answer.disabled = true;
  audioPlay(noticeError);
  task.message.textContent = `Ошибка. Правильный ответ: ${variable}`;
  task.message.classList.add('mistake');
  answer.classList.add('mistake');
 };

export { CreateTaskMathRange };