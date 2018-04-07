import data from './data';
import { CREATE_BOARD } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_BOARD:
      return {
        ...state,
        serverLists: action.payload.activeLists,
        progress: action.payload.progress
      }
    default:
      return { clientLists: data };
  }
}