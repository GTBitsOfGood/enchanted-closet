import { showModalLoader, hideModalLoader, loading, stopLoading } from './loading';
import { fetchHelper, getAPIToken, DEFAULT_HEADERS, deleteLocalData } from './util';

import * as types from './types';

export function upsertUser(data) {
  return (dispatch, getState) => {
    dispatch(loading());
    console.log(data);
    const url = data._id ? `/api/users/${data._id}` : `/api/users`;
    const method = data._id ? 'PUT' : 'POST';
    const isUpdate = data._id ? true : false;
    delete data._id;
    return fetchHelper(url, getAPIToken(getState), {
      method: method,
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => dispatch(processUserUpsert(json, isUpdate)))
  }
}

function processUserUpsert(json, isUpdate) {
  if (json.status === 'ok') {
    return {
      type: types.USER_UPSERT,
      user: json.user,
      isUpdate: isUpdate
    };
  } else {
    return {
      type: types.API_ERROR,
      error: json.msg
    }
  }
}

export function fetchUsers() {
  return (dispatch, getState) => {
    dispatch(requestUsers());
    return fetchHelper(`/api/users`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => dispatch(receieveUsers(json)));
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
