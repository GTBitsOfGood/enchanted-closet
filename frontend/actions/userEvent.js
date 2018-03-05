// For user event interactions e.g. register
import { loading, stopLoading } from './loading';
import { fetchHelper, getAPIToken } from './helpers';
import * as types from './types';

/* Registration */
export function registerEvent(eventID, userID) {
  return (dispatch, getState) =>
    receiveRegistrationInfo(() => fetchHelper(`/api/events/${eventID}/register/${userID}`, getAPIToken(getState)), dispatch)
}

export function cancelEvent(eventID, userID) {
  return (dispatch, getState) =>
    receiveRegistrationInfo(() => fetchHelper(`/api/events/${eventID}/cancel/${userID}`, getAPIToken(getState)), dispatch)
}

export function confirmVolunteer(eventID, userID) {
  return (dispatch, getState) => 
    receiveRegistrationInfo(() => fetchHelper(`/api/events/${eventID}/confirm/${userID}`, getAPIToken(getState)), dispatch)
}

// Success callback on fetch for register, cancel, and confirm
function receiveRegistrationInfo(initFetch, dispatch) {
  return initFetch()
    .then(response => response.json())
    .then(json => {
      if (json.status !== "error") { // fail silently for now TODO ERROR TOASTS!
	// Conditionally pack new info
	const userPayload = {
	  ...(json.newEvents ?
	      {events: json.newEvents} : {}),
	  ...(json.pendingEvents ?
	      {pendingEvents: json.newPending} : {})
	};
	const eventPayload = {
	  ...(json.newParticipants ?
	      {participants: json.newParticipants} : {}),
	  ...(json.newVolunteers ?
	      {volunteers: json.newVolunteers} : {})
	}
	dispatch(updateUserEvents(userPayload));
	dispatch(updateEventUsers(eventPayload));
      }
    })
    .then(() => dispatch(stopLoading()));
}

function updateUserEvents(payload) {
  return {
    type: types.USER_EVENT_UPDATE,
    payload
  }
}

function updateEventUsers(payload) {
  return {
    type: types.EVENT_USER_UPDATE,
    payload
  }
}

/* Attendance */
export function markAttending(event, user) {
  return (dispatch, getState) => {
    dispatch(loading());
    return fetchHelper(`/api/events/${event._id}/present/${user._id}`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => dispatch(userMarkedAsAttended(event, user)))
      .then(() => dispatch(stopLoading()));
  }
}

export function markUnattending(event, user) {
  return (dispatch, getState) => {
    dispatch(loading());
    return fetchHelper(`/api/events/${event._id}/absent/${user._id}`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => dispatch(userMarkedAsUnAttended(event, user)))
      .then(() => dispatch(stopLoading()));
  }
}

function userMarkedAsAttended(event, user) {
  return {
    type: types.MARK_ATTENDING,
    event: event,
    user: user
  };
}

function userMarkedAsUnAttended(event, user) {
  return {
    type: types.MARK_UNATTENDING,
    event: event,
    user: user
  };
}
