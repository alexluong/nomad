import axios from 'axios';
import { CREATE_BOARD, GET_BOARD } from './types';

const ROOT_URL = 'http://localhost:8080/api';

export const createBoard = (authToken) => {
  return (dispatch) => {
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
  };
};

export const getBoard = (authToken) => {
  return (dispatch) => {
    console.log('getboard');
    axios.get(`${ROOT_URL}/lists/current`, {
      'headers': {'Authorization' : `Bearer ${authToken}` }
    }).then(response => {
      dispatch({
        type: GET_BOARD,
        payload: response.data
      });
    }).catch(error => {
      console.log(error.response);
    });
  }
};