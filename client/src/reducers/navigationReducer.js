import { CHANGE_PAGE } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
}