import axios from 'axios';
import { history } from '../App';
// import { AUTH_USER } from './types';

const ROOT_URL = 'http://localhost:8080/api';

export function signIn({ email, password }) {
  history.push('/dashboard');
  return function(dispatch) {
    // Send request to the server
    console.log(email, password);
    axios.post(`${ROOT_URL}/users/login`, { email, password })
      .then(response => {
        console.log(response);
        history.push('/dashboard');
      })
      .catch(error => {
        console.log(error.response);
      });

    // If request is good:
    // - Update state to indicate user is authenticated
    // - Save the JWT token
    // - Redirect to '/dashboard'

    // If request is bad:
    // - Show an error
  }
}