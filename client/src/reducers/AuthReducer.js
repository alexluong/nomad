import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, user: action.payload, authenticated: true };
    case UNAUTH_USER:
      return { ...state, user: action.payload, authenticated: false };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}