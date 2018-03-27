import { AUTH_USER } from './types';

export function doSampleAction(sampleObject) {
  // doSampleAction is an ActionCreator
  // Need to return an action: an object with a type property
  return {
    type: 'SAMPLE_ACTION',
    payload: sampleObject
  };
}

export function signIn({ email, password }) {
  return {
    type: AUTH_USER
  };
}