// Pure event related actions
import { showModalLoader, hideModalLoader, loading, stopLoading } from './loading';
import { fetchHelper, getAPIToken, DEFAULT_HEADERS, deleteLocalData } from './util';

import * as types from './types';

export function deleteEvent(id) {
  return (dispatch, getState) => {
    dispatch(showModalLoader());
    return fetchHelper(`/api/events/${id}`, getAPIToken(getState), {
      method: 'DELETE',
      headers: DEFAULT_HEADERS
    }, getState().apiToken)
      .then(response => response.json())
      .then(json => {
	if (json.status === 'ok') {
	  dispatch(deleteLocalData('events', id));
	} else {
	  // TODO: Error toast
	}
      })
      .then(() => dispatch(hideModalLoader()));
  }
}

export function upsertEvent(data) {
  return (dispatch, getState) => {
    dispatch(loading());
    data.datetime = data.datetime.toDate(); // Convert from Moment object to JS Date Object
    const url = data._id ? `/api/events/${data._id}` : `/api/events`;
    const method = data._id ? 'PUT' : 'POST';
    const isUpdate = data._id ? true : false;
    delete data._id;
    return fetchHelper(url, getAPIToken(getState), {
      method: method,
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => dispatch(processEventUpsert(json, isUpdate)));
  }
}

export function invalidateEvents() {
  return {
    type: types.INVALIDATE_EVENTS
  };
}

function processEventUpsert(json, isUpdate) {
  if (json.status === 'ok') {
    return {
      type: types.EVENT_UPSERT,
      event: json.event,
      isUpdate: isUpdate
    }
  } else {
    return {
      type: types.API_ERROR,
      error: json.msg
    }
  }
}

function shouldFetchEvents(state) {
  const events = state.events;
  if (!events || events.length === 0) {
    return true;
  } else if (state.isFetchingEvents) {
    return false;
  } else {
    return state.didInvalidateEvents;
  }
}

export function fetchEventsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchEvents(getState())) {
      dispatch(loading());
      return dispatch(fetchFutureEvents());
    }
  }
}

function requestFutureEvents() {
  return {
    type: types.REQUEST_FUTURE_EVENTS
  };
}

function requestPastEvents() {
  return {
    type: types.REQUEST_PAST_EVENTS
  }; 
}

function receiveEvents(json) {
  return {
    type: types.RECEIVE_EVENTS,
    events: json.events,
    receivedAt: Date.now()
  };
}

export function fetchFutureEvents() {
  return (dispatch, getState) => {
    dispatch(requestFutureEvents());
    return fetchHelper(`/api/events`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
      .then(() => dispatch(stopLoading()));
  }
}

export function fetchPastEvents() {
  return (dispatch, getState) => {
    dispatch(requestPastEvents());
    return fetchHelper(`/api/eventsPast`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
      .then(() => dispatch(stopLoading()));
  }
}

export function fetchEventById(id){
  return (dispatch, getState) => {
    return fetchHelper(`/api/events/${id}`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
  }
}
