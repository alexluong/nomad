import axios from 'axios';
import { saveAuthToken, removeAuthToken } from '../localStorage';
import { history } from '../App';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:8080/api';

export const signIn = ({ email, password }) => {
  return function(dispatch) {
    // Send request to the server
    axios.post(`${ROOT_URL}/users/login`, { email, password })
      .then(response => {
        // console.log(response);
        // If request is good:
        // - Update state to indicate user is authenticated
        dispatch({
          type: AUTH_USER,
          payload: response.data.user
        });
        // - Save the JWT token
        saveAuthToken(response.data.authToken);
        // - Redirect to '/dashboard'
        history.push('/dashboard');
      })
      .catch(error => {
        // console.log(error.response);
        // If request is bad:
        // - Show an error
        dispatch(authError(error.response.data.message));
      });
  }
}

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export const signOut = (error) => {
  removeAuthToken();
  return { type: UNAUTH_USER };
}