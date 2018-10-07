import './style.scss';
import html from './index.html';

import { switchToButtle, audioPlay } from '../../index';

const vocabulary = require('../../vocabulary/vocabulary.json');
const noticeAccept = require('../../sounds/notice-accept.mp3');
const noticeError = require('../../sounds/notice-error.mp3');

let allowClick = true;
let correct;
let task;
let voices; 
let utterThis;
let synth;
let word;
let translation;

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = changeVoice;   
}

function CreateTaskListeningEngWord() {
  task = this.task;
  task = document.createElement('div');
  task.classList.add('task-display');
  task.innerHTML = html;
  document.body.appendChild(task);
  
  task.word = task.querySelector('.task-word');
  task.answer = task.querySelector('.answer-input').focus();
  task.form = task.querySelector('form');
  task.image = task.querySelector('.play-image');
  task.message = task.querySelector('.message');

  loadJSON(vocabulary)
    .then(result => chooseWord(result))
    .then(task.form.addEventListener('submit', checkAnswer, false))
    .then(task.image.addEventListener('click', speakWord, false))
};

function loadJSON(n) {
  let promise = fetch(n)
      .then(response => response.json())
      .then(result => result)
      .catch(() => { throw new TypeError('Oops, we haven\'t got JSON!') })
  return promise;   
};

const speakWord = () => {
   synth.speak(utterThis);
};

const chooseWord = (obj) => {
  let array = [];
  let pushKeys = _.forIn(obj, function(value, key) {
    array.push(key);
  });
  word = _.sample(array);
  changeVoice();
};

const changeVoice = () => {
  synth = window.speechSynthesis;
  voices = synth.getVoices();
  utterThis = new SpeechSynthesisUtterance(word);
  utterThis.voice = voices[4];
  speakWord();
};

function checkAnswer(event) { 
  event.preventDefault();
  
  if(allowClick) {
    allowClick = false;
    const answer = document.querySelector('.answer-input');
    let answerValue = answer.value;
    answerValue =  _.lowerCase(answerValue);

    if (answerValue === word) {
      showCorrect(answer);
      correct = true;
    } else {
      showMistake(answer);
      correct = false;
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

const showCorrect = (answer) => {
  task.form.disabled = true;
  audioPlay(noticeAccept);
  task.message.textContent = 'Верно!'
  task.message.classList.add('correct');
  answer.classList.add('correct');
 };

const showMistake = (answer) => {
  task.form.disabled = true;
  audioPlay(noticeError);
  task.message.textContent = `Ошибка. Правильный ответ: ${_.capitalize(word)}`;
  task.message.classList.add('mistake');
  answer.classList.add('mistake');
};

export { CreateTaskListeningEngWord };