import { API_BASE_URL } from "../utils/constants";

const makeMoveAPI = (gameId, moveData) => {
  fetch(`${API_BASE_URL}/games/${gameId}/moves`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(moveData)
  }).then(x => {
    console.log(x);
  }).catch(err => console.log(err));
}

const createGameAPI = (gameData, cb = () => {}) => {
  fetch(`${API_BASE_URL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameData)
  }).then(y => y.json()).then(x => {
    cb(x);
  }).catch(err => console.log(err));
}

const JoinGameAPI = (joinData, gameId, cb = () => {}) => {
  fetch(`${API_BASE_URL}/games/${gameId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(joinData)
  }).then(y => y.json()).then(x => {
    cb(x);
  }).catch(err => console.log(err));
}

const getGameAPI = (gameId, cb = () => {}) => {
  fetch(`${API_BASE_URL}/games/${gameId}/`).then(x=> x.json()).then(y => {
    console.log(y);
    cb(y);
  }).catch(err => console.log(err));
}

export {
  makeMoveAPI,
  createGameAPI,
  JoinGameAPI,
  getGameAPI
}