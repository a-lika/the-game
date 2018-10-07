import './style.scss';

import { CreateHero, switchToAttack, heroAnimate } from '../../components/hero/index';
import { CreateMonster, depict, monsterImages } from '../../components/monster/index';
import { cloudInfo } from '../../components/cloud-info/index';
import { modalDialog } from '../../components/modal-dialog/index';

import { animationHeal } from './animations/hero-heal';
import { animationHeroAttack } from './animations/hero-attack';
import { animationMonsterAttack } from './animations/monster-attack';

import { showScores } from '../score/index';
import { UTILS, audioPlay } from '../../utils/utilities';

const zombieSound = require('./sounds/zombie.mp3');
const monsterLaughtSound = require('./sounds/monster-laught.mp3');
const monsterAttackSound = require('./sounds/monster-attack.mp3');
const appearanceSound = require('./sounds/appearance.mp3');

const backgroundImg = require('./images/background.png');

let attackInstancesArray = [];
let gameOver = false;
let monsterAlive = true;
let deadMonsters = 0;
let hero;
let monster;

const createBattleField = () => {
  return new Promise(resolve => {
    UTILS.сhooseBackground(backgroundImg);
    document.body.appendChild(modalDialog);
    document.body.appendChild(cloudInfo);
    hero = new CreateHero();
    monster = new CreateMonster();
    showModalDialog();
    
    const heroInfoDiv = document.querySelector('.hero-info');
    const monsterInfoDiv = document.querySelector('.monster-info');
    const heroInstanceDiv = document.querySelector('.hero');
    const monsterInstanceDiv = document.querySelector('.monster');
    const monsterInstanceHandDiv = document.querySelector('.monster-hand');

    attackInstancesArray.push(heroInfoDiv, monsterInfoDiv, heroInstanceDiv, monsterInstanceDiv, monsterInstanceHandDiv, modalDialog, cloudInfo);
  });
};

const showModalDialog = () => {
  modalDialog.name.classList.remove('hidden');
  modalDialog.name.classList.add('modal-name-animation');
  modalDialog.addKeyBordEvent();
};

const pause = async (time) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

const removeElement = (el, bool) => {
  return new Promise(resolve => {
    el.remove();
    resolve();
    if(bool) {
      showModalDialog();
    };
  })
};

const showDisplay = (correct, spellInfo) => {
  return new Promise(resolve => {
    UTILS.сhooseBackground(backgroundImg);
    UTILS.showElementFromWindow(attackInstancesArray);
    if(spellInfo.applyFunction === 'addHealth') {
      addHealth(correct);
    } else {
      removeMonsterHealth(correct, spellInfo);
    }
  })
};

const addHealth = async (correct) => {   
  if (correct) {  
    hero.health += _.random(70, 90);
    (hero.health > 250) ? (hero.health = 250) : hero.health;
    await animationHeal();
    await pause(1100);
    await removeElement(document.querySelector('.canvas-animate-heal'), false);
    await changeHealth(hero.health);  
  } else {   
     audioPlay(monsterLaughtSound);
     await pause(2200);
    }
  await audioPlay(zombieSound);
  removeHeroHealth();
};

const removeHeroHealth = async () => {  
  hero.health -= _.random(50, 70);
  gameOver = hero.health > 0 ?  gameOver : true;  
  await animationMonsterAttack();
  await pause(1000);
  await changeHealth(hero.health);
  await removeElement(document.querySelector('.canvas-animate-monster-attack'), true);
};

const removeMonsterHealth = async (correct, spellInfo) => {
  const monsterCanvas = document.querySelector('.monster-info .health-colored')
  const monsterHealthSize = document.querySelector('.monster-info .health-size');
   
  if (correct) {
    monster.health -= spellInfo.hpSizeRemove;
    monsterAlive = monster.health > 0 ? true : false;
    switchToAttack();
    await pause(1000);
    await animationHeroAttack(spellInfo.spellName);
    await changeHealth(monster.health, monsterHealthSize, monsterCanvas);
    await removeElement(document.querySelector('.canvas-animate-hero-attack'), false);
  }  else {
      audioPlay(monsterLaughtSound);
      await pause(2200);
    }  
  if(monsterAlive) {
    await audioPlay(monsterAttackSound);
    removeHeroHealth();
   }
};

const changeHealth = (healthCount, instanceHealthSize, instanceCanvas) => {
  return new Promise(resolve => {
    instanceHealthSize = !!instanceHealthSize ? instanceHealthSize : document.querySelector('.hero-info .health-size');
    instanceCanvas = !!instanceCanvas ? instanceCanvas : hero.info.canvasColored;

    instanceCanvas.width = healthCount > 0 ? healthCount : 0;
    instanceCanvas.getContext('2d').fillStyle = "rgba(235, 2, 10, .8)";
    instanceCanvas.getContext('2d').fillRect(0, 0, 250, 35);
    let healthPercent = _.ceil(healthCount/2.5);
    healthPercent = healthPercent > 0 ? healthPercent : 0;
    instanceHealthSize.textContent = `${healthPercent}%`;
    
    if(gameOver) {
      removeElement(document.querySelector('.canvas-animate-monster-attack'), false);
      showScores(attackInstancesArray, deadMonsters);
    } else if(!monsterAlive) {
      removeElement(document.querySelector('.canvas-animate-hero-attack'), false);
      deadMonsters += 1;
      monsterDeath();
    } else resolve(); 
  })
};

const monsterDeath = async () => { 
  document.querySelector('.monster').classList.add('appearance');
  document.querySelector('.monster-hand').classList.add('appearance'); 
  await animationHeroAttack('shootgun');
  hero.health = 250;
  await createAnotherMonster();
  cloudInfo.number.textContent = deadMonsters;
  await animationMonsterAttack('conversion');
  await changeHealth(hero.health);
  await removeElement(document.querySelector('.canvas-animate-hero-attack'), false);
  await removeElement(document.querySelector('.canvas-animate-monster-attack'), true);
};

const createAnotherMonster = () => {
  return new Promise(resolve => {
    audioPlay(appearanceSound);
    audioPlay(zombieSound);
    document.querySelector('.monster').classList.remove('appearance');
    document.querySelector('.monster-hand').classList.remove('appearance');
    const monsterHealthSize = document.querySelector('.monster-info .health-size');
    monsterAlive = true;
    const monsterCanvas = document.querySelector('.monster-info .health-colored');
    monsterImages.forEach(depict);
    monster.name.textContent = monster.generateMonsterName();
    monster.health = 250;
    changeHealth(monster.health, monsterHealthSize, monsterCanvas);
    resolve();    
  })
};

const reset = () => {
  gameOver = false;
  monsterAlive = true;
  deadMonsters = 0;
  cloudInfo.number.textContent = deadMonsters;
  clearInterval(heroAnimate);
};

const restartGame = () => {
  reset();
  createBattleField();
  showModalDialog();
};

export { createBattleField, attackInstancesArray, showDisplay, restartGame, reset };