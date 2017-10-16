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

        default:
            return state;
    }
}

export default rootReducer;
