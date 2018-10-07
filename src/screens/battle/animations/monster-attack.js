import { UTILS, audioPlay } from '../../../utils/utilities';

const arrowsImg = require('../images/arrows.png');
const lightningImg = require('../images/lightning.png');
const conversionImg = require('../images/conversion.png');

const arrowsSound = require('../sounds/arrow.mp3');
const lightningSound = require('../sounds/lightning.mp3');
const conversionSound = require('../sounds/conversion.mp3');

const spriteWidth = 192;
const spriteHeight = 192;

let context;

const animationMonsterAttack = (spell) => {
 return new Promise(function(resolve) {
    const heroSprite = document.querySelector('.hero');
    const heroCoords = heroSprite.getBoundingClientRect();
    const canvasAnimate =  document.createElement('canvas');
    canvasAnimate.classList.add('canvas-animate-monster-attack');
    context = canvasAnimate.getContext('2d');
   
    canvasAnimate.width = spriteWidth;
    canvasAnimate.height = spriteHeight;
    canvasAnimate.style.top = heroCoords.top - 20 + 'px';
    canvasAnimate.style.left = heroCoords.left - 50 + 'px';

    spell = !!spell ? spell : _.sample(['arrows', 'lightning']);
    const url = eval(`${spell}Img`);
    drawSpell(url, resolve);  
    audioPlay(eval(`${spell}Sound`)); 
    document.body.appendChild(canvasAnimate);
  }) 
};

const loadImage = url => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`load ${url} fail`));
    image.src = url;
  });
};

const drawSpell = (url, end) => {
  return loadImage(url).then(image => {  
    let cycleX = 0;
    let cycleY = 0;
    let frames = 0;

    const animate = setInterval(function() {
      if(frames < 25) {
        context.clearRect(0, 0, spriteWidth, spriteHeight);
        context.drawImage(image, cycleX * spriteWidth, cycleY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        cycleX = (cycleX + 1) % 5;
        cycleY = (cycleX === 0) ? ((cycleY + 1)  % 5) : cycleY;
        frames += 1;
      } else {
        context.clearRect(0, 0, spriteWidth, spriteHeight);
        clearInterval(animate);
        end();
      }      
    }, 100);    
  })
};

export { animationMonsterAttack };