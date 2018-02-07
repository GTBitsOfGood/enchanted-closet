import * as types from '../actions/types';

export default function userReducers(state = require('../static/defaultState'), action) {
    switch (action.type) {
        case types.USER_UPSERT:
            let { users, user } = state;
            if (!users) users = [];
            let userStateUpdate = {
                loading: false,
                error: '',
                newUser: action.user,
                users: [],
                user: user
            };
            if (action.isUpdate) {
                users = users.map(e => {
                    if (e._id === action.user._id) {
                        return action.user;
                    } else {
                        return e;
                    }
                });
                userStateUpdate.user = Object.assign({}, userStateUpdate.user, action.user);
            } else {
                users.push(action.user);
            }
            userStateUpdate.users = users;
            return Object.assign({}, state, userStateUpdate);

        case types.USER_AUTHENTICATED:
            return Object.assign({}, state, {
                user: action.user,
                errorMessage: null
            });

        case types.USER_NOT_AUTHENTICATED:
            return Object.assign({}, state, {
                errorMessage: action.errorMessage
            });

        case types.LOGOUT_USER:
            return Object.assign({}, state, {
                user: null
            });

        case types.REQUEST_USERS:
            return Object.assign({}, state, {
                isFetchingUsers: true
            });

        case types.RECEIVE_USERS:
            return Object.assign({}, state, {
                isFetchingUsers: false,
                users: action.users
            });

        default:
            return state;
    }
    // export default userReducers;
}
