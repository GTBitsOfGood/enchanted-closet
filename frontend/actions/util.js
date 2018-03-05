// Helper functions
import fetch from 'isomorphic-fetch';

export function fetchHelper( route, apiToken, obj = {} ) {
  console.log("Here");
  if (!apiToken) {
    return fetch(route, obj);
  }
  console.log("fetch helping xd");
  let headers = {'Authorization': 'Bearer ' + apiToken};
  obj.headers = Object.assign({}, obj.headers || {}, headers);
  console.log(obj.headers);
  return fetch(route, obj)
}

export function getAPIToken( getState ) {
  return getState().user && getState().user.token ? getState().user.token : null;
}

export const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
