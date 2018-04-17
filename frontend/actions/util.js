// Helper functions
import { messageWrap, errorWrap, showModalLoader, hideModalLoader, loading, stopLoading } from './loading';
import * as types from './types';
import fetch from 'isomorphic-fetch';

export function safeWrap(json, okCallback, dispatch) {
  if (json.status === 'ok') {
    if (json.msg) {
      messageWrap(dispatch, json.msg);
    }
    return okCallback();
  } else {
    errorWrap(dispatch, json.msg);
  }
}

export function fetchHelper( route, apiToken, obj = {} ) {
  if (!apiToken) {
    return fetch(route, obj);
  }
  let headers = {'Authorization': 'Bearer ' + apiToken};
  obj.headers = Object.assign({}, obj.headers || {}, headers);
  return fetch(route, obj)
}

export function getAPIToken( getState ) {
  return getState().user && getState().user.token ? getState().user.token : null;
}

export function deleteLocalData(type, id) {
  return {
    type: types.DELETE_DATA_LOCALLY,
    data_type: type,
    id: id
  }
}

export const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export function uploadUserImage(data) {
  return (dispatch, getState) => {
    const { user } = getState();
    if (user) {
      dispatch(showModalLoader());
      let packagedData = new FormData();
      packagedData.append("image", data["file"]);
      fetchHelper(`/api/users/uploadImage/${user._id}`, getAPIToken(getState), {
        method: 'POST',
        body: packagedData
      })
        .then(response => response.json())
	.then(json => safeWrap(json, () => {
	  dispatch(updateUserImage(json.user));
	}, dispatch))
	.then(() => dispatch(hideModalLoader()));
    } else { // unexpected error
      errorWrap(dispatch, "User not found in state (unexpected error)");
    }
  }
}

// timehack - tbh we don't need user param
export function updateUserImage(user) {
  const curTime = new Date().getTime();
  const newUser = { ...user, image: `${user.image}?${curTime}` }; // but deep copy
  return {
    type: types.USER_UPDATE,
    user: newUser
  }
}


export function uploadEventImage(data, id) {
  return (dispatch, getState) => {
    dispatch(showModalLoader());
    let packagedData = new FormData();
    packagedData.append("image", data["file"]);
    fetchHelper(`/api/events/uploadImage/${id}`, getAPIToken(getState), {
      method: 'POST',
      body: packagedData
    })
      .then(response => response.json())
      .then(json => safeWrap(json, () => {
	dispatch(updateEventImage(json.event));
      }, dispatch))
      .then(() => dispatch(hideModalLoader()));
  }
}

// assume ID is in array of events
export function updateEventImage(event) {
  const curTime = new Date().getTime();
  const newEvent = { ...event, image: `${event.image}?${curTime}` }; // but deep copy
  return {
    type: types.RECEIVE_MORE_EVENTS,
    events: [newEvent]
  }
}
