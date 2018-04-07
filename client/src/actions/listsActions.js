import axios from 'axios';
import { CREATE_BOARD } from './types';

const ROOT_URL = 'http://localhost:8080/api';

export const createBoard = (authToken) => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/lists/create`, {
      'headers': {'Authorization' : `Bearer ${authToken}` }
    }).then(response => {
      dispatch({
        type: CREATE_BOARD,
        payload: response.data
      });
    }).catch(error => {
      console.log(error.response);
    });
  }
}