import * as types from '../actions/types';

function events(state = require('../static/defaultState'), action) {
    switch (action.type) {
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

        case types.INVALIDATE_EVENTS:
            return Object.assign({}, state, {
                didInvalidateEvents: true
            });

        case types.EVENT_UPSERT:
            let { events } = state;
            if (!events) events = [];
            let eventStateUpdate = {
                loading: false,
                error: '',
                newEvent: action.event,
                events: []
            };
            if (action.isUpdate) {
                events = events.map(e => {
                    if (e._id === action.event._id) {
                        return action.event;
                    } else {
                        return e;
                    }
                })
            } else {
                events.push(action.event);
            }
            eventStateUpdate.events = events;
            return Object.assign({}, state, eventStateUpdate);
case types.MARK_ATTENDING:
            const userMap = state.users.map(u => {
                if (u._id === action.userID) {
                    u.pastEvents.push(action.event);
                }
                return u;
            });
            const eventRemap = state.events.map(e => {
                if (e._id === action.eventID) {
                    e.participants.push(action.user);
                }
                return e;
            });
            return Object.assign({}, state, {
                users: userMap,
                events: eventRemap
            });

        case types.MARK_UNATTENDING:
            const userRebuild = state.users.map(u => {
                if (u._id === action.userID) {
                    const i = u.pastEvents.findIndex(e => e._id === action.event._id);
                    if (i > -1) u.pastEvents.splice(i, 1);
                }
                return u;
            });
            const eventRebuild = state.events.map(e => {
                if (e._id === action.eventID) {
                    const i = e.participants.findIndex(u => u._id === action.user._id);
                    if (i > -1) e.participants.splice(i, 1);
                }
                return e;
            });
            return Object.assign({}, state, {
                users: userRebuild,
                events: eventRebuild
            });

        default:
            return state;
    }
}
