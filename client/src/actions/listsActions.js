import axios from 'axios';
import { getAuthToken } from '../localStorage';
import { CREATE_BOARD, GET_BOARD, UPDATE_BOARD } from './types';

const ROOT_URL = 'http://localhost:8080/api';

export const createBoard = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/lists/create`, {
      'headers': {'Authorization' : `Bearer ${getAuthToken()}` }
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

export const getBoard = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/lists/current`, {
      'headers': {'Authorization' : `Bearer ${getAuthToken()}` }
    }).then(response => {
      dispatch({
        type: GET_BOARD,
        payload: response.data
      });
    }).catch(error => {
      console.log(error.response);
    });
  };
};

export const updateBoard = (action, listId, activityId) => {
  return dispatch => {
    const url = `${ROOT_URL}/lists/update?action=${action}&listId=${listId}&activityId=${activityId}`
    axios.get(url, {
      'headers': {'Authorization' : `Bearer ${getAuthToken()}` }
    }).then(response => {
      dispatch({
        type: UPDATE_BOARD,
        payload: response.data
      });
    }).catch(error => {
      console.log(error.response);
    });
  };
}