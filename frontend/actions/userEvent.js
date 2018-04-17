// For user event interactions e.g. register
import { loading, stopLoading } from './loading';
import { safeWrap, fetchHelper, getAPIToken } from './util';
import * as types from './types';

/* Registration */
export function registerEvent(eventID, userID) {
  return (dispatch, getState) =>
    receiveRegistrationInfo(() => fetchHelper(`/api/events/${eventID}/register/${userID}`, getAPIToken(getState)), dispatch, getState)
}

export function cancelEvent(eventID, userID) {
  return (dispatch, getState) =>
    receiveRegistrationInfo(() => fetchHelper(`/api/events/${eventID}/cancel/${userID}`, getAPIToken(getState)), dispatch, getState)
}

export function confirmVolunteer(eventID, userID) {
  return (dispatch, getState) => 
    receiveRegistrationInfo(() => fetchHelper(`/api/events/${eventID}/confirm/${userID}`, getAPIToken(getState)), dispatch, getState)
}

export function denyVolunteer(eventID, userID) {
  return (dispatch, getState) => 
    receiveRegistrationInfo(() => fetchHelper(`/api/events/${eventID}/deny/${userID}`, getAPIToken(getState)), dispatch, getState)
}

// Success callback on fetch for register, cancel, and confirm, deny
function receiveRegistrationInfo(initFetch, dispatch, getState) {
  return initFetch()
    .then(response => response.json())
    .then(json => safeWrap(json, () => {
      // Conditionally pack new info
      const userPayload = {
	userId: json.userId,
	...(json.newEvents ?
	    {events: json.newEvents} : {}),
	...(json.newPending ?
	    {pendingEvents: json.newPending} : {})
      };
      const eventPayload = {
	eventId: json.eventId,
	...(json.newParticipants ?
	    {participants: json.newParticipants} : {}),
	...(json.newVolunteers ?
	    {volunteers: json.newVolunteers} : {}),
	...(json.newPendingVolunteers ?
	    {pendingVolunteers: json.newPendingVolunteers} : {}),
	...(json.newDeniedVolunteers ?
	    {deniedVolunteers: json.newDeniedVolunteers} : {})
      }
      if (getState().user && json.userId === getState().user._id) {
	dispatch(updatePersonalEvents(userPayload));
      }
      dispatch(updateUserEvents(userPayload));
      dispatch(updateEventUsers(eventPayload));
    }, dispatch))
    .then(() => dispatch(stopLoading()));
}

function updateUserEvents(payload) {
  return {
    type: types.USER_EVENT_UPDATE,
    payload
  }
}

function updatePersonalEvents(payload) {
  return {
    type: types.UPDATE_PERSONAL_EVENTS,
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
      .then(json => safeWrap(json, () => dispatch(userMarkedAsAttended(event, user)), dispatch))
      .then(() => dispatch(stopLoading()));
  }
}

export function markUnattending(event, user) {
  return (dispatch, getState) => {
    dispatch(loading());
    return fetchHelper(`/api/events/${event._id}/absent/${user._id}`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => safeWrap(json, () => dispatch(userMarkedAsUnAttended(event, user)), dispatch))
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
