import './style.scss';

import { UTILS, audioPlay } from '../../utils/utilities';
import { CreateInfo } from '../player-info/index';
import { loginComponent } from '../../screens/login/index';

const iddleImg = require('./images/iddle-vert.png');
const attackImg = require('./images/attack-vertical.png');

const magicSound = require ('./sounds/magic.mp3');

const countFrames = 10;  
const heroHeight = 154;
const heroWidth = 163;

let cycleН = 0;
let frames = 0;
let heroIddle;
let heroAttack;
let context;
let heroAnimate;

const toAnimateAttack = (cntxt, instance, instanceWidth, instanceHeight) => {
  if(frames > countFrames) {
    depict(heroIddle);
    cntxt.clearRect(0, 0, instanceWidth, instanceHeight);
    frames = 0;
    cycleН = 0;
    clearInterval(heroAnimate);       
  } else {
    cntxt.clearRect(0, 0, instanceWidth, instanceHeight);
    cntxt.drawImage(instance, 0, instanceHeight * cycleН, instanceWidth, instanceHeight, 0, 0, instanceWidth, instanceHeight);
    cycleН = (cycleН + 1) % countFrames;
    frames += 1;
    }    
};

const toAnimateIddle = (cntxt, instance, instanceWidth, instanceHeight) => {      
  cntxt.clearRect(0, 0, instanceWidth, instanceHeight);
  cntxt.drawImage(instance, 0, instanceHeight * cycleН, instanceWidth, instanceHeight, 0, 0, instanceWidth, instanceHeight);
  cycleН = (cycleН + 1) % countFrames;
};
  
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
    
  return loadImage(ownOptions.uri).then(image => {    
    switch(ownOptions.uri) {
      case iddleImg : {
        heroAnimate = setInterval(toAnimateIddle, 120, context, image, ownOptions.sw, ownOptions.sh);
        break;
      };
      case attackImg : {
        heroAnimate = setInterval(toAnimateAttack, 120, context, image, ownOptions.sw, ownOptions.sh);
        audioPlay(magicSound);
        break;
      }
    }        
  });     
};

const switchToAttack = () => {
  depict(heroAttack);
  context.clearRect(0, 0, heroWidth, heroHeight);
  cycleН = 0;
  clearInterval(heroAnimate);
};

function CreateHero() { 
  this.canvas = document.createElement('canvas');
  context = this.canvas.getContext('2d');
  this.canvas.classList.add('hero');

  const heroHeight = 154;
  const heroWidth = 163;
  this.canvas.width = heroWidth;
  this.canvas.height = heroHeight;

  heroIddle = { uri: iddleImg, context, sw: heroWidth, sh: heroHeight };
  heroAttack = { uri: attackImg, context, sw: heroWidth, sh: heroHeight }; 

  depict(heroIddle);      
  document.body.appendChild(this.canvas);

  this.info = new CreateInfo('hero-info');
  this.health = 250;
  this.name = document.querySelector('.hero-info .name');
  this.name.textContent = loginComponent.userName.value;
};

export { CreateHero, switchToAttack, heroAnimate };