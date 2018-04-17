import * as types from './types';
// Some visual things and feedback
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
// Future note: message and error should really be together
export function clearAllMessages() {
  return {
    type: types.CLEAR_ALL_MESSAGES
  }
}

export function setMessage(message) {
  return {
    type: types.SET_MESSAGE,
    message
  }
}

export function setErrorMessage(message) { // sad repetition
  return {
    type: types.SET_ERROR_MESSAGE,
    message
  }
}
// Timeout
export function messageWrap(dispatch, message) {
  dispatch(setMessage(message));
  setTimeout(() => dispatch(clearAllMessages()), 3000); //
}

export function errorWrap(dispatch, message) {
  dispatch(setErrorMessage(message));
  setTimeout(() => dispatch(clearErrors()), 3000);
}
