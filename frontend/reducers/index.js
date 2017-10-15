import * as types from '../actions/types';

function rootReducer(state = require('../static/defaultState'), action) {
    switch (action.type) {
    	case types.TOGGLE_TITLE_STATE:
    		return Object.assign({}, state, {
    			showTitle: !state.showTitle
    		});
    		break;
    	case types.SHOW_LOADING_MODAL:
    		return Object.assign({}, state, {
    			modalLoaderActive: true
    		});
    		break;
    	case types.HIDE_LOADING_MODAL:
    		return Object.assign({}, state, {
    			modalLoaderActive: false
    		});
    		break;

        default:
            return state;
    }
}

export default rootReducer;
