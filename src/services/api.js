import { API_BASE_URL } from "../utils/constants";

const makeMoveAPI = (moveData) => {
  fetch(`${API_BASE_URL}/moves`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(moveData)
  }).then(x => {
    console.log(x);
  }).catch(err => console.log(err));
}

export {
  makeMoveAPI,
}