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

    case types.CLEAR_ERRORS:
      return Object.assign({}, state, {
        error: null,
        errorMessage: null
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

    case types.API_ERROR:
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
      
    case types.USER_UPDATE:
      return Object.assign({}, state, {
	user: action.user,
	errorMessage: null
      });
      
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

    case types.DELETE_DATA_LOCALLY:
      const mapping = {
        events: state.events,
        users: state.users
      };
      let obj = {};
      obj[action.data_type] = mapping[action.data_type].filter(d => d._id !== action.id);
      return Object.assign({}, state, obj);

    case types.REQUEST_USERS:
      return Object.assign({}, state, {
        isFetchingUsers: true
      });

    case types.RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetchingUsers: false,
        users: action.users
      });

    case types.UPDATE_DASHBOARD_CARDS:
      return Object.assign({}, state, {
        dashboardCards: action.cards
      });

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

export default rootReducer;
