import { UTILS, audioPlay } from '../../../utils/utilities';

const shootgunImg = require('../images/shoot.png');
const mysteryImg = require('../images/mystery.png');
const laserImg = require('../images/lazer.png');
const cloudImg = require('../images/poison.png');
const cometImg = require('../images/comet.png');

const shootgunSound = require('../sounds/shotgun.mp3');
const cloudSound = require('../sounds/poison.mp3');
const cometSound = require('../sounds/bomb.mp3');
const laserSound = require('../sounds/laser.mp3');
const mysterySound = require('../sounds/mystery.mp3');

const spriteWidth = 192;
const spriteHeight = 192;
let cycleX = 0;
let cycleY = 0;
let frames = 0;
let canvasAnimate;
let context;
let end;

const animationHeroAttack = spellName => {
  return new Promise(resolve => {
    cycleX = 0;
    cycleY = 0;
    frames = 0;
    
    const monsterSprite = document.querySelector('.monster');
    const monsterCoords = monsterSprite.getBoundingClientRect();
    canvasAnimate =  document.createElement('canvas');
    canvasAnimate.classList.add('canvas-animate-hero-attack');
    context = canvasAnimate.getContext('2d');
    canvasAnimate.style.top = monsterCoords.top + 'px';
    canvasAnimate.style.left = monsterCoords.left + 30 + 'px';  
    canvasAnimate.width = spriteWidth;
    canvasAnimate.height = spriteHeight;

    drawSpell(spellName);
    audioPlay(eval(`${spellName}Sound`));
    document.body.appendChild(canvasAnimate);
    end = resolve;
  })
};

const loadImage = url => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`load ${url} fail`));
    image.src = eval(`${url}Img`);
  });
};

const drawSpell = (spellName) => {
  return loadImage(spellName).then(image => { 
    
    switch(spellName) {
    case 'mystery' : {
      animateMystery(image);
      break;
    }
    case 'cloud' : {
    animateDefault(image);
      break;
    }
    case 'comet' : {
     animateDefault(image);
      break;
    }
    case 'laser' : {
     animateLaser(image);
      break;
    }
    default : animateDefault(image);
      break;
    } 
  })
};

const drawAnimation = (image) => {    
  context.clearRect(0, 0, spriteWidth, spriteHeight);
  context.drawImage(image, cycleX * spriteWidth, cycleY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
  cycleX = (cycleX + 1) % 5;
  cycleY = (cycleX === 0) ? ((cycleY + 1)  % 5) : cycleY;
  frames += 1;
};

const animateMystery = (image) => {  
  canvasAnimate.style.top = parseInt(canvasAnimate.style.top) - 150 + 'px';    
    const animate = setInterval(function() {       
      if(frames < 25) {       
        if(frames > 4 && frames < 12) { 
          canvasAnimate.style.top = parseInt(canvasAnimate.style.top) + 30 + 'px';
        } 
        drawAnimation(image);       
      } else { 
        context.clearRect(0, 0, spriteWidth, spriteHeight);
        clearInterval(animate);
        end();
      }
    }, 100);     
};
    
const animateDefault = (image) => {
  canvasAnimate.style.top = parseInt(canvasAnimate.style.top) + 70 + 'px'; 
    const animate = setInterval(function() {      
     if(frames < 25) {
      drawAnimation(image);     
      } else { 
        context.clearRect(0, 0, spriteWidth, spriteHeight);
        clearInterval(animate);
        end();
      }
    }, 60);   
};  
      
const animateLaser = (image) => { 
  const animate = setInterval(function() {    
    if(frames < 25) {
      if(frames > 3 && frames < 7) {    
        canvasAnimate.style.top = parseInt(canvasAnimate.style.top) + 30 + 'px';
      }
      drawAnimation(image);     
    } else { 
      context.clearRect(0, 0, spriteWidth, spriteHeight);
      clearInterval(animate);
      end();
    }
  }, 100);     
};

export { animationHeroAttack };