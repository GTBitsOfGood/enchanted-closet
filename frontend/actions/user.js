import { showModalLoader, hideModalLoader, loading, stopLoading } from './loading';
import { safeWrap, fetchHelper, getAPIToken, DEFAULT_HEADERS, deleteLocalData } from './util';
import { receiveEvents, receiveMoreEvents } from './';
import moment from 'moment';
import * as types from './types';

export function upsertUser(data) {
  return (dispatch, getState) => {
    dispatch(loading());
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
      .then(json => safeWrap(json, () => dispatch(processUserUpsert(json, isUpdate)))).then(() => stopLoading());
  }
}

function processUserUpsert(json, isUpdate) { // updates users array as well (only relevant for admin)
  return (dispatch, getState) => {
    if (json.status === 'ok') {
      const { birthday } = json.user;
      const formatBDay = birthday ? moment(new Date(birthday)).format('MMMM Do YYYY') : null;
      json.user = { ...json.user, birthday: formatBDay };
      dispatch(updateUserWithEvents(json.user)); // whatever, not gonna strip users array
      dispatch({
	type: types.USERS_UPSERT,
	user: json.user,
	isUpdate: isUpdate
      });
    } else {
      // Todo: toast here
      dispatch({
	type: types.API_ERROR,
	error: json.msg
      });
    }
  }
}

export function fetchUsers() {
  return (dispatch, getState) => {
    dispatch(loading());
    dispatch(requestUsers());
    return fetchHelper(`/api/users`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => safeWrap(json, () => dispatch(receieveUsers(json))))
      .then(() => dispatch(stopLoading()));
  }
}

// probably repeat of refreshUser in auth
export function fetchUserById(id){
  return (dispatch, getState) => {
    return fetchHelper(`/api/users/${id}`, getAPIToken(getState), {
      header: DEFAULT_HEADERS
    })
      .then(response => response.json())
      .then(json => safeWrap(json, () => dispatch(updateUser(json))))
      .then(() => dispatch(stopLoading()));
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

export function updateUserWithEvents(user) {
  return (dispatch, getState) => {
    const events = user.events ? user.events.map(e => e._id) : [];
    const pendingEvents = user.pendingEvents ? user.pendingEvents.map(e => e._id) : [];
    const newUser = { ...user, events, pendingEvents };
    dispatch(updateUser(newUser));
    dispatch(receiveEvents(user.events)); // these are unstripped
    dispatch(receiveMoreEvents(user.pendingEvents));
    dispatch(stopLoading());
  }
}

function updateUser(user) {
  return {
    type: types.USER_UPDATE,
    user
  }
}
