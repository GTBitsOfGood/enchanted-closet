// Action Creators

import fetch from 'isomorphic-fetch';
<<<<<<< HEAD
=======
import FormData from 'form-data';
>>>>>>> 2433daea710b59d8c38a88814c673eaf1cded570

import * as types from './types';

export function toggleTitleState() {
    return {
<<<<<<< HEAD
        type: types.TOGGLE_TITLE_STATE,
    };
}

=======
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
        return fetch(`/api/events/`, {
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

>>>>>>> 2433daea710b59d8c38a88814c673eaf1cded570
export function invalidateEvents() {
    return {
        type: types.INVALIDATE_EVENTS
    };
}

<<<<<<< HEAD
=======
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

>>>>>>> 2433daea710b59d8c38a88814c673eaf1cded570
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
