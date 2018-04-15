// Helper functions
import { showModalLoader, hideModalLoader, loading, stopLoading } from './loading';
import fetch from 'isomorphic-fetch';

export function safeWrap(json, okCallback) {
  if (json.status === 'ok') {
    return okCallback();
  } else {
    return {
      type: types.API_ERROR,
      error: json.msg
    };
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
  console.log(getState())
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
      fetchHelper(`api/users/uploadImage/${user._id}`, getAPIToken(getState), {
        method: 'POST',
        body: packagedData
      })
        .then(response => response.json())
	.then(json => {
	  console.log(json); // TODO: something with confirm
	})
	.then(() => dispatch(hideModalLoader()));
    } else { // unexpected error
      dispatch({
	type: types.API_ERROR,
	error: "User not found in state (unexpected error)"
      });
    }
  }
}


export function uploadEventImage(data) {
  return (dispatch, getState) => {
    const { event } = getState();
    if (event) {
      let packagedData = new FormData();
      packagedData.append("image", data["file"]);
      fetchHelper(`api/events/uploadImage/${event._id}`, getAPIToken(getState), {
        method: 'POST',
        body: packagedData
      })
        .then(response => response.json())
	.then(json => {
	  console.log(json); // TODO: something with confirm
	});      
    } else {
      dispatch({
	type: types.API_ERROR,
	error: "User not found in state (unexpected error)"
      });
    }
  }
}
