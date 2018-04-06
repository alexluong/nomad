import data from './data';
export default function(state = { clientData: data }, action) {
  return { ...state };
}