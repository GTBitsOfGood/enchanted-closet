// Helper functions
import fetch from 'isomorphic-fetch';

export function fetchHelper( route, apiToken, obj ) {
  if (!apiToken) {
    return fetch(route, obj);
  }
  let headers = {'Authorization': 'Bearer ' + apiToken};
  if (obj && obj.headers) {
    obj.headers = Object.assign({}, obj.headers, headers);
  } else {
    if (!obj) obj = {};
    obj.headers = Object.assign({}, obj.headers || {}, headers);
  }
  return fetch(route, obj)
}

export function getAPIToken( getState ) {
  return getState().user ? getState().user.token : null;
}
