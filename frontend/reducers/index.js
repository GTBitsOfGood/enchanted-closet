import * as types from '../actions/types';

function rootReducer(state = require('../static/defaultState'), action) {
    switch (action.type) {
    	case types.TOGGLE_TITLE_STATE:
    		return Object.assign({}, state, {
    			showTitle: !state.showTitle
    		});

        case types.INVALIDATE_EVENTS:
            return Object.assign({}, state, {
                didInvalidateEvents: true
            });

        case types.LOADING:
            return Object.assign({}, state, {
                loading: true
            });

        case types.EVENT_CREATED:
            return Object.assign({}, state, {
                loading: false,
                error: '',
                newEvent: action.event
            });

        case types.EVENT_NOT_CREATED:
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            });

        case types.NOT_LOADING:
            return Object.assign({}, state, {
                loading: false
            });

        case types.RECEIVE_EVENTS:
            return Object.assign({}, state, {
                isFetchingEvents: false,
                didInvalidateEvents: false,
                events: action.events,
                lastUpdatedEvents: action.receivedAt
            });

        case types.REQUEST_EVENTS:
            return Object.assign({}, state, {
                isFetchingEvents: true,
                didInvalidateEvents: false
            });

        case types.SHOW_MODAL_LOADER:
            return Object.assign({}, state, {
                modalLoaderActive: true
            });

        case types.HIDE_MODAL_LOADER:
            return Object.assign({}, state, {
                modalLoaderActive: false
            });

        case types.USER_AUTHENTICATED:
            return Object.assign({}, state, {
                user: action.user,
                apiToken: action.user.token,
                errorMessage: null
            });

        case types.USER_NOT_AUTHENTICATED:
            return Object.assign({}, state, {
                errorMessage: action.errorMessage
            });

        case types.LOGOUT_USER:
            return Object.assign({}, state, {
                user: null,
                apiToken: null
            });

        case types.DELETE_EVENT:
            return Object.assign({}, state, {
                events: state.events.filter(e => e._id !== action.id)
            });

        default:
            return state;
    }
}

export default rootReducer;
