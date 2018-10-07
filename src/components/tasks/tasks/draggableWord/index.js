import './style.scss';
import html from './index.html';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';

import { switchToButtle, audioPlay } from '../../index';

const vocabulary = require('../../vocabulary/vocabulary.json');
const noticeAccept = require('../../sounds/notice-accept.mp3');
const noticeError = require('../../sounds/notice-error.mp3');

let allowClick = true;
let correct;
let task;
let key;
let value;

function CreateTaskDraggableWord() { 
  task = this.task;
  task = document.createElement('div');
  task.classList.add('task-display');
  task.innerHTML = html;
  document.body.appendChild(task);
  
  task.word = task.querySelector('.task-word');
  task.sortableArea = task.querySelector('.sortable-area');
  task.message = task.querySelector('.message');
  task.button = task.querySelector('.answer-button');
  task.button.focus();
  
  $( '.sortable-area' ).sortable({ containment: 'parent' });
  
  loadJSON(vocabulary)
    .then(result => insertValue(result, task.word))
    .then(task.button.addEventListener('click', checkAnswer, false))
};

function loadJSON(n) {
  let promise = fetch(n)
      .then(response => response.json())
      .then(result => result)
      .catch(() => { throw new TypeError('Oops, we haven\'t got JSON!') })
  return promise;   
};

const insertValue = (object, context) => {
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
  context.textContent = _.capitalize(value);
  insertKey();
};

const insertKey = () => {
  let keyWordLength = _.size(key);
  task.fragment = document.createDocumentFragment();
  let array = [];  
  for(let i = 0; i < keyWordLength; i++) {
    let div = document.createElement('div');
    div.textContent = key[i];
    div.setAttribute('tabindex', '0');
    array.push(div);
  }
  array = _.shuffle(array);
  array.forEach((el) => task.fragment.appendChild(el));
  task.sortableArea.appendChild(task.fragment);
};

const checkAnswer = event => { 
  event.preventDefault();
  
  if(allowClick) {
    allowClick = false;
    $( '.sortable-area' ).sortable('disable');
    let sortableChildren = $('.sortable-area div');
    let content = [].map.call(sortableChildren, (el) => el.textContent);
    let answer = content.reduce((a, b) => a.concat(b));
    correct = (answer === key) ? true : false;

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
  task.message.textContent = `Ошибка. Правильный ответ: ${key}`;
  task.message.classList.add('mistake'); 
  $( '.sortable-area div' ).addClass('mistake');
};

const changeDisplay = () => {
  task.remove();
  task.button.removeEventListener('click', checkAnswer, false);
  allowClick = true;
  switchToButtle(correct);
};

export { CreateTaskDraggableWord };