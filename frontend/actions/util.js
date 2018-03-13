// Helper functions
import fetch from 'isomorphic-fetch';

export function fetchHelper( route, apiToken, obj = {} ) {
  if (!apiToken) {
    return fetch(route, obj);
  }
  let headers = {'Authorization': 'Bearer ' + apiToken};
  obj.headers = Object.assign({}, obj.headers || {}, headers);
  return fetch(route, obj)
}

export function uploadImage(data) {
    return (dispatch, getState) => {
        console.log(data);
        try {
            fetch(`/api/events/${data.id}`);
            fetchHelper(`api/events/uploadImage/${data.id}`,
            getAPIToken(getState)).then(response => response.json());
        } catch (err) {
            console.log("Not an event");
        }
        try {
            fetch(`/api/users/${data.id}`);
            fetchHelper(`api/users/uploadImage/${data.id}`, getAPIToken(getState)).then(response => response.json());
        } catch (err) {
            console.log("Not a user");
        }
    }
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
