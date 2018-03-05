import { loading, stopLoading } from './loading';
import { fetchHelper, getAPIToken } from './helpers';

import * as types from './types';

export function logoutUser() {
  return {
    type: types.LOGOUT_USER
  }
}

export function performLogout() {
  return (dispatch, getState) => {
    dispatch(logoutUser());
  }  
}

function processAuthenticationAttempt(json) {
  if (json.status === 'ok') {
    return {
      type: types.USER_AUTHENTICATED,
      user: json.user
    }
  } else {
    return {
      type: types.USER_NOT_AUTHENTICATED,
      errorMessage: json.msg
    }
  }
}

export function refreshUser(user) {
  return (dispatch, getState) => {
    dispatch(requestUsers());
    return fetchHelper(`/api/users/` + user._id, getAPIToken(getState))
      .then(response => response.json())
      .then(() => dispatch(stopLoading()));
  }
}

export function performLogin(data) {
  return (dispatch, getState) => {
    dispatch(showModalLoader());
    return fetchHelper(`/api/login`, null, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(hideModalLoader());
        dispatch(processAuthenticationAttempt(json));
      });
  }
}

export function performRegistration(data) {
  return (dispatch, getState) => {
    dispatch(showModalLoader());
    return fetchHelper(`/api/register`, null, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(hideModalLoader());
        dispatch(processAuthenticationAttempt(json));
      });
  }
}
