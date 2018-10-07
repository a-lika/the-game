import './style.scss';
import { UTILS } from '../../utils/utilities';

function CreateInfo(className) {
  this.infoField = UTILS.createNewElement('div', className);
  this.name = UTILS.createNewElement('div', 'name');
  this.block = UTILS.createNewElement('div', 'health-block');
  this.size = UTILS.createNewElement('div', 'health-size');
    
  this.canvasTransparent = UTILS.createNewElement('canvas', 'health-transparent');
  const contextTransparent = this.canvasTransparent.getContext('2d');
  
  this.canvasColored = UTILS.createNewElement('canvas', 'health-colored');
  const contextColored = this.canvasColored.getContext('2d');
  
  this.canvasTransparent.width = 250;
  this.canvasColored.width = this.canvasTransparent.width;
  this.canvasTransparent.height = this.canvasColored.height = 22;
  
  contextTransparent.fillStyle = 'rgba(200, 200, 200, .9)';
  contextTransparent.fillRect(0, 0, 250, 35);
  contextColored.fillStyle = 'rgba(235, 2, 10, .8)';
  contextColored.fillRect(0, 0, 250, 35);
  
  this.block.appendChild(this.canvasTransparent);
  this.block.appendChild(this.canvasColored);
  this.block.appendChild(this.size);
  this.infoField.appendChild(this.name);
  this.infoField.appendChild(this.block);
  this.size.textContent = '100%';
  document.body.appendChild(this.infoField);
};

export { CreateInfo };

