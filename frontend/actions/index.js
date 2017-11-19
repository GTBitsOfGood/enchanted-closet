// Action Creators

import fetch from 'isomorphic-fetch';
import FormData from 'form-data';

import * as types from './types';

export function toggleTitleState() {
    return {
        type: types.TOGGLE_TITLE_STATE
    };
}

export function showModalLoader() {
    return {
        type: types.SHOW_MODAL_LOADER
    };
}

export function deleteEvent(id) {
    return dispatch => {
        dispatch(showModalLoader());
        dispatch(deleteEventLocally(id));
        return fetch(`/api/events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(json => dispatch(hideModalLoader()));
    }
}

function deleteEventLocally(id) {
    return {
        type: types.DELETE_EVENT,
        id: id
    }
}

export function hideModalLoader() {
    return {
        type: types.HIDE_MODAL_LOADER
    }
}

export function loading() {
    return {
        type: types.LOADING
    }
}

export function stopLoading() {
    return {
        type: types.NOT_LOADING
    }
}

export function upsertEvent(data) {
    return dispatch => {
        dispatch(loading());
        data.datetime = data.datetime.toDate(); // Convert from Moment object to JS Date Object
        const url = data._id ? `/api/events/${data._id}` : `/api/events`;
        const method = data._id ? 'PUT' : 'POST';
        const isUpdate = data._id ? true : false;
        delete data._id;
        return fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
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

export function logoutUser() {
    return {
        type: types.LOGOUT_USER
    }
}

function processAuthenticationAttempt(json) {
    if (json.status === 'ok') {
        return {
            type: types.USER_AUTHENTICATED,
            user: json.user
        }
    } else {
        return {
            type: types.USER_NOT_AUTHENTICATED,
            errorMessage: json.msg
        }
    }
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
            type: types.EVENT_NOT_UPSERTED,
            error: json.msg
        }
    }
}

export function performAdminLogin(data) {
    return dispatch => {
        dispatch(showModalLoader());
        return fetch(`/api/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(json => {
                dispatch(hideModalLoader());
                dispatch(processAuthenticationAttempt(json));
            });
    }
}

function requestEvents() {
    return {
        type: types.REQUEST_EVENTS
    };
}

function receieveEvents(json) {
    return {
        type: types.RECEIVE_EVENTS,
        events: json.events,
        receivedAt: Date.now()
    };
}

export function fetchEvents() {
    return dispatch => {
        dispatch(requestEvents());
        return fetch(`/api/events`)
            .then(response => response.json())
            .then(json => dispatch(receieveEvents(json)));
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
            return dispatch(fetchEvents());
        }
    }
}
