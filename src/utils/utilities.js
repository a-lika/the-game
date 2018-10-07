const UTILS = {};

UTILS.createNewElement = (tag, className) => {
  const newTag = document.createElement(tag);
  newTag.classList.add(className);
  return newTag
};

UTILS.hideElementFromWindow = args => {
 args.forEach(x => x.classList.add('hidden'));
};

UTILS.showElementFromWindow = args => {
  args.forEach(x => x.classList.remove('hidden'));
};

UTILS.сhooseBackground = image => {
  document.body.style.backgroundImage = `url(${image})`;
};

const audioPlay = (audio) => {
  return new Promise(resolve => {
    const modalAudio = document.querySelector('.modal-audio');

    if (!modalAudio.classList.contains('hide-sound')) {
      const sound = new Audio;
      sound.src = audio;
      document.body.appendChild(sound);
      sound.play();
      setTimeout(removeElement, 3000, sound);   
    } 
    setTimeout(() => {
      resolve()
    }, 1000);
  })
};

const removeElement = (element) => {
  element.remove();
};

export { UTILS, audioPlay };

