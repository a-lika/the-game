import './style.scss';
import html from './index.html';

import { switchToButtle, audioPlay } from '../../index';

const vocabulary = require('../../vocabulary/vocabulary.json');
const noticeAccept = require('../../sounds/notice-accept.mp3');
const noticeError = require('../../sounds/notice-error.mp3');

let allowClick = true;
let correct;
let task;
let key;
let value;

function CreateTaskRuToEngChoose() {
  task = this.task;
  task = document.createElement('div');
  task.classList.add('task-display');
  task.innerHTML = html;
  document.body.appendChild(task);
  
  task.word = task.querySelector('.task-word');
  task.buttonFields = task.querySelector('.task-button-fields');
  task.firstWord = task.querySelector('#first-word');
  task.secondWord = task.querySelector('#second-word');
  task.thirdWord = task.querySelector('#third-word');
  task.message = task.querySelector('.message');

 loadJSON(vocabulary)
    .then(result => insertWord(result, task.word))
    .then(task.buttonFields.addEventListener('click', checkAnswer, false));
};

function loadJSON(n) {
  let promise = fetch(n)
      .then(response => response.json())
      .then(result => result)
      .catch(() => { throw new TypeError('Oops, we haven\'t got JSON!') })
  return promise;   
};

let answerArray = [];

const insertWord = (object, context) => {
  let arrayKeys = [];
  let arrayValues = [];
  let pushKeys = _.forIn(object, function(value, key) {
    let splitValue = value.split(", ");
    splitValue = splitValue[0];
    arrayKeys.push(key);
    arrayValues.push(splitValue);
});
  let index = _.random(0, arrayKeys.length-1);
  key = arrayKeys[index];
  value = arrayValues[index];
  answerArray.push(key);
  arrayKeys.splice(index, 1);
  fillAnswerArray(arrayKeys);
  fillAnswerArray(arrayKeys);
  context.textContent = _.capitalize(value);
  console.log(answerArray);
  insertAnswers();
};

const fillAnswerArray = (arrayKeys) => {
  let randomIndex = _.random(0, arrayKeys.length-1);
  answerArray.push(arrayKeys[randomIndex]);
  arrayKeys.splice(randomIndex, 1);
};

const insertAnswers = () => {
  answerArray = _.shuffle(answerArray);
  task.firstWord.textContent = answerArray[0];
  task.secondWord.textContent = answerArray[1];
  task.thirdWord.textContent = answerArray[2];
};

const checkAnswer = event => {
  event.preventDefault();
  
  if(allowClick) {
    allowClick = false;
    
    switch(event.target) {
      case task.firstWord  : {
        if(_.toLower(key) === _.toLower(event.target.textContent)) {
          correct = true;
          showCorrect(event.target)
        } else {
          correct = false;
          showMistake(event.target);
        }
        break;
      }
      case task.secondWord : {
        if(_.toLower(key) === _.toLower(event.target.textContent)) {
          correct = true;
          showCorrect(event.target)
        } else {
          correct = false;
          showMistake(event.target);
        }
        break;
      }
      case task.thirdWord : {
        if(_.toLower(key) === _.toLower(event.target.textContent)) {
          correct = true;
          showCorrect(event.target)
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
  answerArray = [];
  switchToButtle(correct);
 };

const showCorrect = (button) => {
  task.buttonFields.classList.remove('available');
  audioPlay(noticeAccept);
  task.message.textContent = 'Верно!'
  task.message.classList.add('correct');
  button.classList.add('correct');
};

const showMistake = (button) => {
  task.buttonFields.classList.remove('available');
  audioPlay(noticeError);
  task.message.textContent = `Ошибка. Правильный ответ: ${key}`;
  task.message.classList.add('mistake');
  button.classList.add('mistake');
 };

export { CreateTaskRuToEngChoose };