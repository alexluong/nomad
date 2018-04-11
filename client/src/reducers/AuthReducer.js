import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, CLEAR_ERROR, CREATE_BOARD } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, user: action.payload, authenticated: true };
    case UNAUTH_USER:
      return { ...state, user: action.payload, authenticated: false };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case CLEAR_ERROR:
      return { ...state, errorMessage: '' };
    case CREATE_BOARD:
      return {
        ...state,
        user: {
          ...state.user,
          hasBoard: true
        }
      }
    default:
      return state;
  }
}