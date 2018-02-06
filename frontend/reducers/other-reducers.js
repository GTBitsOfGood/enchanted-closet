import * as types from '../actions/types';

function otherReducers(state = require('../static/defaultState'), action) {
    switch (action.type) {
        case types.TOGGLE_TITLE_STATE:
            return Object.assign({}, state, {
                showTitle: !state.showTitle
            });

        case types.LOADING:
            return Object.assign({}, state, {
                loading: true
            });

        case types.CLEAR_ERRORS:
            return Object.assign({}, state, {
                error: null,
                errorMessage: null
            });

        case types.SHOW_MODAL_LOADER:
            return Object.assign({}, state, {
                modalLoaderActive: true
            });

        case types.HIDE_MODAL_LOADER:
            return Object.assign({}, state, {
                modalLoaderActive: false
            });

        case types.API_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            });

        case types.DELETE_DATA_LOCALLY:
            const mapping = {
                events: state.events,
                users: state.users
            };
            let obj = {};
            obj[action.data_type] = mapping[action.data_type].filter(d => d._id !== action.id);
            return Object.assign({}, state, obj);

        case types.UPDATE_DASHBOARD_CARDS:
            return Object.assign({}, state, {
                dashboardCards: action.cards
            });
            
        default:
            return state;
        }
}
