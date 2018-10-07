import './style.scss';
import html from './index.html';

import { switchToButtle, audioPlay } from '../../index';

const noticeAccept = require('../../sounds/notice-accept.mp3');
const noticeError = require('../../sounds/notice-error.mp3');

let allowClick = true;
let correct;
let answer;
let task;

function CreateTaskSimpleMath() {
  task = this.task;
  task = document.createElement('div');
  task.classList.add('task-display');
  task.innerHTML = html;
  document.body.appendChild(task);
  
  task.firstOperand = task.querySelector('.first-operand');
  task.secondOperand = task.querySelector('.second-operand');
  task.operator = task.querySelector('.operator');
  task.answer = task.querySelector('.answer-input-math').focus();
  task.form = task.querySelector('form');
  task.message = task.querySelector('.message');

  insertNumbers(task.firstOperand, task.secondOperand, task.operator);
  task.form.addEventListener('submit', checkAnswer, false);
};


const insertNumbers = (firstOperand, secondOperand, operator) => {
  const operators = ['+', '-', '*', '/'];
  const sign = _.sample(operators);
  let number_1;
  let number_2;
  
  switch(sign) {  
    case '*' : {
      number_1 = _.random(1, 10);
      number_2 = _.random(1, 10);
      break;
    }
    case '/' : {
      number_1 = _.random(1, 100);
      number_2 = _.random(1, number_1);  
      let result = _.floor(eval(number_1 + sign + number_2));
      number_1 = result * number_2;
      break;
    }
    default : {
      number_1 = _.random(2, 500);
      number_2 = _.random(2, 100);
    }
  } 
  answer = eval(number_1 + sign + number_2);
  firstOperand.textContent = number_1;
  secondOperand.textContent = number_2;
  operator.textContent = sign;
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

export { CreateTaskSimpleMath };