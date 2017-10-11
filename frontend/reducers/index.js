import * as types from '../actions/types';

function rootReducer(state = require('../static/defaultState'), action) {
    switch (action.type) {
    	case types.TOGGLE_TITLE_STATE:
    		return Object.assign({}, state, {
    			showTitle: !state.showTitle
    		});
    		break;
        default:
            return state;
    }
}

export default rootReducer;
