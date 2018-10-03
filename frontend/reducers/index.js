import * as types from '../actions/types'

function rootReducer (state = require('../static/defaultState'), action) {
  switch (action.type) {
    case types.INVALIDATE_EVENTS:
      return Object.assign({}, state, {
        didInvalidateEvents: true
      })

    case types.LOADING:
      return Object.assign({}, state, {
        loading: true
      })

    case types.CLEAR_ERRORS:
      return Object.assign({}, state, {
        error: null,
        errorMessage: null
      })

    case types.CLEAR_ALL_MESSAGES:
      return Object.assign({}, state, {
        error: null,
        errorMessage: null,
        message: null
      })

    case types.SET_MESSAGE: {
      return Object.assign({}, state, {
        error: null,
        errorMessage: null,
        message: action.message
      })
    }

    case types.SET_ERROR_MESSAGE: {
      return Object.assign({}, state, {
        error: null, // hmmm
        errorMessage: action.message,
        message: null
      })
    }

    case types.EVENT_UPSERT:
      let { events = [] } = state
      let eventStateUpdate = {
        loading: false,
        errorMessage: '',
        newEvent: action.event,
        events: []
      }
      if (action.isUpdate) {
        events = events.map(e => {
          if (e._id === action.event._id) {
            return action.event
          } else {
            return e
          }
        })
      } else {
        events.push(action.event)
      }
      eventStateUpdate.events = events
      return Object.assign({}, state, eventStateUpdate)
    case types.USERS_UPSERT:
      let { users = [] } = state
      let userStateUpdate = {
        loading: false,
        errorMessage: '',
        newUser: action.user,
        users: []
      }
      if (action.isUpdate) {
        users = users.map(e => { // make sure users list also updates
          if (e._id === action.user._id) {
            return action.user
          } else {
            return e
          }
        })
      } else {
        users.push(action.user)
      }
      userStateUpdate.users = users
      return { ...state, ...userStateUpdate }
    case types.API_ERROR:
      return Object.assign({}, state, {
        loading: false,
        errorMessage: action.error,
        message: null
      })
    case types.NOT_LOADING:
      return Object.assign({}, state, {
        loading: false
      })
    case types.RECEIVE_EVENTS:
      return Object.assign({}, state, {
        isFetchingEvents: false,
        didInvalidateEvents: false,
        events: action.events, // [ ...state.events, ...action.events],
        lastUpdatedEvents: action.receivedAt
      })
    case types.RECEIVE_MORE_EVENTS: // Merge
      const newEvents = action.events
      const alreadyInEvents = newEvents.map(e => e._id)
      const persistEvents = state.events ? state.events.filter(e => !alreadyInEvents.includes(e._id)) : []
      return Object.assign({}, state, {
        events: [...newEvents, ...persistEvents],
        lastUpdatedEvents: action.receivedAt
      })
    case types.REQUEST_PAST_EVENTS:
      return Object.assign({}, state, {
        isFetchingEvents: true,
        didInvalidateEvents: false
      })
    case types.REQUEST_FUTURE_EVENTS:
      return Object.assign({}, state, {
        isFetchingEvents: true,
        didInvalidateEvents: false
      })
    case types.SHOW_MODAL_LOADER:
      return Object.assign({}, state, {
        modalLoaderActive: true
      })
    case types.HIDE_MODAL_LOADER:
      return Object.assign({}, state, {
        modalLoaderActive: false
      })
      // TODO FINISH!
      /* case types.VOLUNTEER_UPDATE:
       *   return Object.assign({}, state, {

       *   })
       *   break */
    case types.USER_EVENT_UPDATE: {
      const { pendingEvents, events, userId } = action.payload
      const { users = [] } = state
      const user = users.find(u => u._id === userId)
      const newUser = user ? { ...user, pendingEvents, events } : null
      let newUsers
      if (newUser) {
        newUsers = Array.from(users)
        newUsers[users.indexOf(user)] = newUser
        // users[users.indexOf(user)] = newUser;
      }
      return { ...state,
        users: newUsers,
        errorMessage: null }
    }
    case types.UPDATE_PERSONAL_EVENTS: {
      const { pendingEvents, events } = action.payload
      const { user } = state
      const newUser = user ? { ...user, pendingEvents, events } : null
      return { ...state,
        user: newUser,
        errorMessage: null }
    }

    case types.EVENT_USER_UPDATE: { // TODO: make users ref event store array
      const { eventId, participants, volunteers, pendingVolunteers, deniedVolunteers } = action.payload
      // find old event
      const { events = [] } = state
      // const eventsFiltered = events ? events.filter( e => e._uid === eventID ) : [];
      const event = events.find(e => e._id === eventId)
      const newEvent = event ? { ...event, participants, volunteers, pendingVolunteers, deniedVolunteers } : null
      let newEvents
      if (newEvent) {
        newEvents = Array.from(events)
        newEvents[events.indexOf(event)] = newEvent // be very careful...
        // events[events.indexOf(event)] = newEvent; // freaking AHHH
      }
      return { ...state,
        events: newEvents,
        errorMessage: null }
    }
    case types.USER_UPDATE:
      return Object.assign({}, state, {
        user: { ...(state.user ? state.user : null), ...action.user },
        errorMessage: null
      })

    case types.USER_AUTHENTICATED:
      return Object.assign({}, state, {
        user: action.user,
        errorMessage: null
      })

    case types.USER_NOT_AUTHENTICATED:
      return Object.assign({}, state, {
        errorMessage: action.errorMessage,
        message: null
      })

    case types.LOGOUT_USER:
      return Object.assign({}, state, {
        user: null
      })

    case types.DELETE_DATA_LOCALLY:
      const mapping = {
        events: state.events,
        users: state.users
      }
      let obj = {}
      obj[action.data_type] = mapping[action.data_type].filter(d => d._id !== action.id)
      return Object.assign({}, state, obj)

    case types.REQUEST_USERS:
      return Object.assign({}, state, {
        isFetchingUsers: true
      })

    case types.RECEIVE_USERS:

      return Object.assign({}, state, {
        isFetchingUsers: false,
        users: action.users
      })

    case types.RECEIVE_MORE_USERS:
      const newUsers = action.users
      const alreadyInUsers = newUsers.map(e => e._id)
      const persistUsers = state.users ? state.users.filter(e => !alreadyInUsers.includes(e._id)) : []
      return Object.assign({}, state, {
        users: [...newUsers, ...persistUsers],
        lastUpdatedUsers: action.receivedAt
      })

    case types.UPDATE_DASHBOARD_CARDS:
      return Object.assign({}, state, {
        dashboardCards: action.cards
      })

    case types.MARK_ATTENDING:
      /* // There is no user map
      const userMap = state.users.map(u => {
        if (u._id === action.user._id) {
          u.events.push(action.event); // No past future distinction
        }
        return u;
      });
      */
      const eventRemap = state.events.map(e => {
        if (action.user.role === 'participant') {
          if (e._id === action.event._id && e.participantsAttended.findIndex(u => { return u === action.user._id }) === -1) { e.participantsAttended.push(action.user) } else {
            if (e._id === action.event._id && e.volunteersAttended.findIndex(u => { return u === action.user._id }) === -1) { e.volunteersAttended.push(action.user) }
          }
        }
        return e
      })
      return Object.assign({}, state, {
        // users: userMap,
        events: eventRemap
      })

    case types.MARK_UNATTENDING:
      /* // It ain't real
      const userRebuild = state.users.map(u => {
        if (u._id === action.user._id) {
          const i = u.pastEvents.findIndex( e => {return e === action.event._id});
          if (i > -1) u.pastEvents.splice(i, 1);
        }
        return u;
      });
      */
      const eventRebuild = state.events.map(e => {
        if (e._id === action.event._id) {
          if (action.user.role === 'participant') {
            const i = e.participantsAttended.findIndex(u => { return u === action.user._id })
            if (i > -1) e.participantsAttended.splice(i, 1)
          } else {
            const i = e.volunteersAttended.findIndex(u => { return u === action.user._id })
            if (i > -1) e.volunteersAttended.splice(i, 1)
          }
        }
        return e
      })
      return Object.assign({}, state, {
        // users: userRebuild,
        events: eventRebuild
      })

    default:
      return state
  }
}

export default rootReducer
