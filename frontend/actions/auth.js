import { showModalLoader, hideModalLoader, loading, stopLoading, requestUsers, receiveUsers, updateUserWithEvents } from './';
import { fetchHelper, getAPIToken, DEFAULT_HEADERS } from './util';
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
  return (dispatch, getState) => {
    if (json.status === 'ok') {
      dispatch(updateUserWithEvents(json.user));
    } else {
      return {
	type: types.USER_NOT_AUTHENTICATED,
	errorMessage: json.msg
      }
    }
  }
}

export function refreshUser(user) {
  return (dispatch, getState) => {
    dispatch(requestUsers());
    return fetchHelper(`/api/users/` + user._id, getAPIToken(getState))
      .then(response => response.json())
      .then(json => {
	if (json.status === 'ok' && json.user) {
	  // Normalize the data:
	  dispatch(updateUserWithEvents(json.user));
	} else {
    return {
	  type: types.GEN_ERROR,
    errorMessage: 'There was an error refreshing the user.^^^Please follow the rules'
  }
	}
      })
      .then(() => dispatch(stopLoading()));
  }
}

export function performLogin(data) {
  return (dispatch, getState) => {
    dispatch(showModalLoader());
    return fetchHelper(`/api/login`, null, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data)
    })
      .then(response => {console.log(response); return response.json()})
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
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(hideModalLoader());
        dispatch(processAuthenticationAttempt(json));
      });
  }
}
