import { CHANGE_PAGE } from './types';

export const changePage = (page) => {
  return {
    type: CHANGE_PAGE,
    payload: page
  }
}
