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

export function createEvent(data) {
    return dispatch => {
        dispatch(loading());
        data.datetime = data.datetime.toDate(); // Convert from Moment object to JS Date Object
        return fetchHelper(`/api/events/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(json => dispatch(processEventCreationAttempt(json)));
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

function fetchHelper(route, obj) {
    if (!apiToken) {
        return fetch(route, obj);
    }
    let headers = {'Authorization': 'Bearer ' + apiToken};
    if (obj && obj.headers) {
        headers = Object.assign({}, headers, obj.headers);
    }
    return fetch(route, Object.assign({}, req, {'headers': headers}))
}

function processAuthenticationAttempt(json) {
    if (json.status === 'ok') {
        return {
            type: types.USER_AUTHENTICATED,
            user: json.user,
            apiToken: json.token
        }
    } else {
        return {
            type: types.USER_NOT_AUTHENTICATED,
            errorMessage: json.msg
        }
    }
}

function processEventCreationAttempt(json) {
    if (json.status === 'ok') {
        return {
            type: types.EVENT_CREATED,
            event: json.event
        }
    } else {
        return {
            type: types.EVENT_NOT_CREATED,
            error: json.msg
        }
    }
}

export function performLogin(data) {
    return dispatch => {
        dispatch(showModalLoader());
        return fetchHelper(`/api/login`, {
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
        return fetchHelper(`/api/events`)
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
