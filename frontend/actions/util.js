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
        let user = getState().user;
        let event = getState().event;
        if (user) {
            try {
                fetchHelper(`api/users/uploadImage/${user._id}`, getAPIToken(getState), {
                    method: 'POST',
                    body: data
                })
                    .then(response => response.json());
            } catch (err) {
                console.log("Not a user");
            }
        }
        if (event) {
            try {
                fetchHelper(`api/events/uploadImage/${event._id}`,
                getAPIToken(getState), {method: 'POST'}, getState().apiToken).then(response => response.json());
            } catch (err) {
                console.log("Not an event");
            }
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
