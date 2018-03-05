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

export function requestUsers() {
  return {
    type: types.REQUEST_USERS
  }
}

export function receieveUsers(json) {
  return {
    type: types.RECEIVE_USERS,
    users: json.users
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
