import data from './data';
import { CREATE_BOARD, GET_BOARD } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_BOARD:
      return {
        ...state,
        serverLists: action.payload.activeLists
      }
    case GET_BOARD:
      return {
        ...state,
        serverLists: action.payload.activeLists
      }
    default:
      return { ...state, clientLists: data };
  }
}