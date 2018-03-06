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

export function hideModalLoader() {
  return {
    type: types.HIDE_MODAL_LOADER
  }
}

export function showModalLoader() {
  return {
    type: types.SHOW_MODAL_LOADER
  };
}

export function clearErrors() {
  return {
    type: types.CLEAR_ERRORS
  }
}
