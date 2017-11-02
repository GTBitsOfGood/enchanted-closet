// Action Creators

import fetch from 'isomorphic-fetch';

import * as types from './types';

export function toggleTitleState() {
    return {
        type: types.TOGGLE_TITLE_STATE,
    };
}

export function invalidateEvents() {
    return {
        type: types.INVALIDATE_EVENTS
    };
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
