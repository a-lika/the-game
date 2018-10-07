import { audioPlay } from '../../../utils/utilities';

const heartImg = require('../images/heart.png');
const music = require('../sounds/sound-health.mp3');

let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let context;
let end;

const images = [
  { uri: heartImg, x: 117, y: 255, sw: 58, sh: 58 },
  { uri: heartImg, x: 55, y: 190, sw: 58, sh: 58 },
  { uri: heartImg, x: 5, y: 270, sw: 58, sh: 58 },
  { uri: heartImg, x: 75, y: 345, sw: 58, sh: 58 }
];

const animationHeal = () => {
  return new Promise(resolve => {
    const heroSprite = document.querySelector('.hero');
    const heroCoords = heroSprite.getBoundingClientRect();
    const canvasAnimate =  document.createElement('canvas');
    canvasAnimate.classList.add('canvas-animate-heal');
    context = canvasAnimate.getContext('2d');
    canvasAnimate.width = heroSprite.width + 100;
    canvasAnimate.height = 250;
    canvasAnimate.style.top = heroCoords.top - heroCoords.height + 'px';
    canvasAnimate.style.left = heroCoords.left - 50 + 'px';
    
    images.forEach(depict);
    audioPlay(music);
    document.body.appendChild(canvasAnimate);
    end = resolve;
  });
};

const loadImage = url => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`load ${url} fail`));
    image.src = url;
  });
};

const depict = (options) => {
  const ctx = context;
  const ownOptions = Object.assign({}, options);
  
  return loadImage(ownOptions.uri).then(image => {    
    let cycleX = ownOptions.x;
    let cycleY = ownOptions.y;
      
    function animate() {    
      if(cycleY < 1) {       
        ctx.clearRect(cycleX, 0, ownOptions.sw, ownOptions.sh);
        cancelAnimationFrame(animate); 
        end();
      }  else {         
        ctx.clearRect(cycleX + 1, cycleY + 1, ownOptions.sw, ownOptions.sh);
        ctx.drawImage(image, 0, 0, ownOptions.sw, ownOptions.sh, cycleX, cycleY, ownOptions.sw, ownOptions.sh);  
        cycleY = cycleY - 2;
        requestAnimationFrame(animate);
        }    
      }
    requestAnimationFrame(animate);     
  });     
};

export { animationHeal };