//import './style.scss';

import html from './index.html';
import { switchToButtle, audioPlay } from '../../index';

const vocabulary = require('../../vocabulary/vocabulary.json');
const noticeAccept = require('../../sounds/notice-accept.mp3');
const noticeError = require('../../sounds/notice-error.mp3');

let allowClick = true;
let correct;
let task;
let message;

function CreateTaskEngToRo() {
  task = this.task;
  task = document.createElement('div');
  task.classList.add('task-display');
  task.innerHTML = html;
  document.body.appendChild(task);
  
  task.word = task.querySelector('.task-word');
  task.answer = task.querySelector('.answer-input').focus();
  task.form = task.querySelector('form');
  message = task.querySelector('.message');

  loadJSON(vocabulary)
    .then(result => insertWord(result, task.word))
    .then(task.form.addEventListener('submit', checkAnswer, false))
};

function loadJSON(n) {
  let promise = fetch(n)
      .then(response => response.json())
      .then(result => result)
      .catch(() => { throw new TypeError('Oops, we haven\'t got JSON!') })
  return promise;   
};

const insertWord = (object, context) => {
  let array = [];
  let pushKeys = _.forIn(object, function(value, key) {
    array.push(key);
  });
  let word = _.sample(array);
  context.textContent = _.capitalize(word);
};

const checkAnswer = event => {
  event.preventDefault();
  
  if(allowClick) {
    allowClick = false; 
    const answer = task.querySelector('.answer-input');
    
    loadJSON(vocabulary).then(function(result) {
      let translation;
      for (let key in result) {
        translation = result[_.lowerCase(task.word.textContent)];  
      }
      let answerValue = _.trim(answer.value);
      answerValue = _.lowerCase(answerValue);
      translation = translation.split(", ");

      if (translation.indexOf(answerValue) !== -1) {
        showCorrect(answer);
        correct = true;   
      } else {
        let variable = translation[0];
        showMistake(answer, variable);
        correct = false;    
        }  
    })
      .then(setTimeout(changeDisplay, 2000));
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
  message.textContent = 'Верно!'
  message.classList.add('correct');
  answer.classList.add('correct');
 };

const showMistake = (answer, variable) => {
  answer.disabled = true;
  audioPlay(noticeError);
  message.textContent = `Ошибка. Правильный ответ: ${_.capitalize(variable)}`;
  message.classList.add('mistake');
  answer.classList.add('mistake');
};

export { CreateTaskEngToRo };