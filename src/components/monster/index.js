import './style.scss';

import { CreateInfo } from '../player-info/index';
import { generateMonsterName } from './monster-name';

const head = require('./images/monsters-head.png');
const body = require('./images/monsters-body.png');
const foots = require('./images/monsters-foots.png');
const hands = require('./images/monsters-hands.png');

const monstersCount = 3;
const randomNumber = () =>  _.random(0, monstersCount-1);

const monsterImg = new Image();
monsterImg.src = head;

const monsterHeight = 250
const monsterWidth = 246;

const loadImage = url => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`load ${url} fail`));
    image.src = url;
  });
};
  
const depict = options => {
  const context = options.context;
  const ownOptions = Object.assign({}, options);
  context.clearRect(0, 0, monsterWidth, monsterHeight);
  
  return loadImage(ownOptions.uri).then(image => {     
    context.drawImage(image, monsterWidth * randomNumber(), 0, monsterWidth, monsterHeight, 0, 0, monsterWidth, monsterHeight);    
  });     
};

const canvas = document.createElement('canvas');
let context = canvas.getContext('2d');

const canvasForHands = document.createElement('canvas');
let contextForHands = canvasForHands.getContext('2d');

canvas.classList.add('monster');
canvasForHands.classList.add('monster-hand');
  
canvas.width = monsterWidth;
canvasForHands.width = monsterWidth;
canvas.height = monsterHeight;
canvasForHands.height = monsterHeight; 

const monsterImages = [
  { uri: body, context},
  { uri: foots, context},
  { uri: head, context},
  { uri: hands, context: contextForHands}
];

function CreateMonster() {
  this.fragment = document.createDocumentFragment();
  monsterImages.forEach(depict); 
  this.fragment.appendChild(canvas);
  this.fragment.appendChild(canvasForHands);
  document.body.appendChild(this.fragment);

  this.health = 250;
  this.info = new CreateInfo('monster-info');
  this.name = document.querySelector('.monster-info .name');
  this.generateMonsterName = generateMonsterName;
  this.name.textContent = generateMonsterName();
};

export { CreateMonster, depict, monsterImages };

