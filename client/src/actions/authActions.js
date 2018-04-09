import axios from 'axios';
import { saveAuthToken, removeAuthToken, removeState } from '../localStorage';
import { history } from '../App';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:8080/api';

export const signIn = ({ email, password }) => {
  return dispatch => {
    let authentication;
    if (validateEmail(email)) {
      authentication = { email, password };
    } else {
      authentication = { username: email, password };
    }
    // Send request to the server
    axios.post(`${ROOT_URL}/users/login`, authentication)
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

export const signUp = ({ username, email, password }) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/users/register`, { username, email, password })
    .then(response => {
      history.push('/signin');
    })
    .catch(error => {
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
  return dispatch => {
    // Remove stuff in localStorage
    removeAuthToken();
    removeState();
    // Then dispatch
    dispatch({
      type: UNAUTH_USER
    });
  }
}

const validateEmail = (email) => {
  const pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
  return pattern.test(email);
}