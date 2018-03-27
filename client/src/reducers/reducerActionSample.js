export default function(state = null, action) {
  switch (action.type) {
    case 'SAMPLE_ACTION':
      return action.payload;
    default:
      return state;
  }
}