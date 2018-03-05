import * as types from './types';
// Some visual things
export function loading() {
  return {
    type: types.LOADING
  }
}

export function stopLoading() {
  return {
    type: types.NOT_LOADING
  }
}
