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
    console.log("upload user image run");
    const { user } = getState();
    if (user) {
      try {
	let packagedData = new FormData();
	packagedData.append("image", data["file"]);
	/* for (const key in data) {
	   packagedData.append(key, data[key]);
	   } */ // TODO this
        fetchHelper(`api/users/uploadImage/${user._id}`, getAPIToken(getState), {
          method: 'POST',
          body: packagedData
        })
          .then(response => response.json())
	  .then(json => {
	    console.log(json); // TODO: something with confirm
	  });
      } catch (err) {
        console.log("Upload error");
      }
    } else {
      // ERROR
    }
  }
}


export function uploadEventImage(data) {
  return (dispatch, getState) => {
    const { event } = getState();
    if (event) {
      try {
	let packagedData = new FormData();
	packagedData.append("image", data["file"]);
	/* for (const key in data) {
	   packagedData.append(key, data[key]);
	   } */ // TODO this
        fetchHelper(`api/events/uploadImage/${event._id}`, getAPIToken(getState), {
          method: 'POST',
          body: packagedData
        })
          .then(response => response.json())
	  .then(json => {
	    console.log(json); // TODO: something with confirm
	  });
      } catch (err) {
        console.log("Upload error");
      }
    } else {
      // ERROR
    }
  }
}
