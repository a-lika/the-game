import { loginComponent, getStart } from './index';
import { UTILS } from '../../utils/utilities';
import { database } from '../login/base';

let data;

const updateScore = (username, currentScore) => {
  return new Promise(resolve => {
    const docRef = database.collection('users').doc(username);
      docRef.get()
      .then(function(doc) {
        if(doc.data().score <= currentScore) {
          docRef.update({score: currentScore});
        }
        setTimeout(() => resolve(), 0);
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });  
  })
};

const searchBestPlayers = (parent, nextChild) => {
  const fragment = document.createDocumentFragment();
  const tableBestPlayers = UTILS.createNewElement('table', 'table-best-players');
  const captionBestPlayers = document.createElement('caption');
  captionBestPlayers.textContent = 'Лучшие игроки';
  tableBestPlayers.appendChild(captionBestPlayers);
 
  const usersRef = database.collection('users');
  const query = usersRef.orderBy("score", "desc").limit(10);
  
  query.get()
        .then(users => {
          users.forEach(doc => {
            data = doc.data();
            
    const tr = document.createElement('tr');
    const tdUserName = document.createElement('td');
    tdUserName.textContent = data.username;
    const tdCountNonsters = document.createElement('td');
    tdCountNonsters.textContent = data.score;
    tr.appendChild(tdUserName);
    tr.appendChild(tdCountNonsters);
    tableBestPlayers.appendChild(tr);          
    })  
  });
  
  fragment.appendChild(tableBestPlayers);
  parent.insertBefore(tableBestPlayers, nextChild);
};

export { updateScore, searchBestPlayers };
