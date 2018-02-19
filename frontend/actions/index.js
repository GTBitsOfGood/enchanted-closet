// Action Creators

import fetch from 'isomorphic-fetch';
import FormData from 'form-data';

import * as types from './types';

const DEFAULT_CARDS = [
  {
    content: null,
    title: 'Users',
    url: 'admin/users'
  },
  {
    content: null,
    title: 'Events',
    url: 'admin/events'
  },
  {
    content: null,
    title: 'Participants',
    url: 'admin/users'
  },
  {
    content: null,
    title: 'Volunteers',
    url: 'admin/users'
  },
  {
    content: null,
    title: 'Admins',
    url: 'admin/users'
  }
];

const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export function toggleTitleState() {
  return {
    type: types.TOGGLE_TITLE_STATE
  };
}

export function showModalLoader() {
  return {
    type: types.SHOW_MODAL_LOADER
  };
}

export function clearErrors() {
  return {
    type: types.CLEAR_ERRORS
  }
}

export function deleteEvent(id) {
  return (dispatch, getState) => {
    dispatch(showModalLoader());
    dispatch(deleteLocalData('events', id));
    return fetchHelper(`/api/events/${id}`, getAPIToken(getState), {
      method: 'DELETE',
      headers: DEFAULT_HEADERS
    }, getState().apiToken)
      .then(response => response.json())
      .then(json => dispatch(hideModalLoader()));
  }
}

function deleteLocalData(type, id) {
  return {
    type: types.DELETE_DATA_LOCALLY,
    data_type: type,
    id: id
  }
}

export function hideModalLoader() {
  return {
    type: types.HIDE_MODAL_LOADER
  }
}

export function loading() {
  return {
    type: types.LOADING
  }
}

export function stopLoading() {
  return {
    type: types.NOT_LOADING
  }
}

export function upsertEvent(data) {
  return (dispatch, getState) => {
    dispatch(loading());
    data.datetime = data.datetime.toDate(); // Convert from Moment object to JS Date Object
    const url = data._id ? `/api/events/${data._id}` : `/api/events`;
    const method = data._id ? 'PUT' : 'POST';
    const isUpdate = data._id ? true : false;
    delete data._id;
    return fetchHelper(url, getAPIToken(getState), {
      method: method,
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => dispatch(processEventUpsert(json, isUpdate)));
  }
}

export function upsertUser(data) {
  return (dispatch, getState) => {
    dispatch(loading());
    console.log(data);
    const url = data._id ? `/api/users/${data._id}` : `/api/users`;
    const method = data._id ? 'PUT' : 'POST';
    const isUpdate = data._id ? true : false;
    delete data._id;
    return fetchHelper(url, getAPIToken(getState), {
      method: method,
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => dispatch(processUserUpsert(json, isUpdate)))
  }
}

export function invalidateEvents() {
  return {
    type: types.INVALIDATE_EVENTS
  };
}

export function logoutUser() {
  return {
    type: types.LOGOUT_USER
  }
}

function fetchHelper(route, apiToken, obj) {
  if (!apiToken) {
    return fetch(route, obj);
  }
  let headers = {'Authorization': 'Bearer ' + apiToken};
  if (obj && obj.headers) {
    obj.headers = Object.assign({}, obj.headers, headers);
  } else {
    if (!obj) obj = {};
    obj.headers = Object.assign({}, obj.headers || {}, headers);
  }
  return fetch(route, obj)
}

function processAuthenticationAttempt(json) {
  if (json.status === 'ok') {
    return {
      type: types.USER_AUTHENTICATED,
      user: json.user
    }
  } else {
    return {
      type: types.USER_NOT_AUTHENTICATED,
      errorMessage: json.msg
    }
  }
}

function processEventUpsert(json, isUpdate) {
  if (json.status === 'ok') {
    return {
      type: types.EVENT_UPSERT,
      event: json.event,
      isUpdate: isUpdate
    }
  } else {
    return {
      type: types.API_ERROR,
      error: json.msg
    }
  }
}

function processUserUpsert(json, isUpdate) {
  if (json.status === 'ok') {
    return {
      type: types.USER_UPSERT,
      user: json.user,
      isUpdate: isUpdate
    };
  } else {
    return {
      type: types.API_ERROR,
      error: json.msg
    }
  }
}

export function performLogin(data) {
  return (dispatch, getState) => {
    dispatch(showModalLoader());
    return fetchHelper(`/api/login`, null, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(hideModalLoader());
        dispatch(processAuthenticationAttempt(json));
      });
  }
}

export function performRegistration(data) {
  console.log(data);
  return (dispatch, getState) => {
    dispatch(showModalLoader());
    return fetchHelper(`/api/register`, null, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(hideModalLoader());
        dispatch(processAuthenticationAttempt(json));
      });
  }
}

function requestFutureEvents() {
  return {
    type: types.REQUEST_FUTURE_EVENTS
  };
}

function requestPastEvents() {
  return {
    type: types.REQUEST_PAST_EVENTS
  }; 
}

function receiveEvents(json) {
  return {
    type: types.RECEIVE_EVENTS,
    events: json.events,
    receivedAt: Date.now()
  };
}

export function fetchFutureEvents() {
  return (dispatch, getState) => {
    dispatch(requestFutureEvents());
    return fetchHelper(`/api/events`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
      .then(() => dispatch(stopLoading()));
  }
}

export function fetchPastEvents() {
  return (dispatch, getState) => {
    dispatch(requestPastEvents());
    return fetchHelper(`/api/eventsPast`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
      .then(() => dispatch(stopLoading()));
  }
}

function requestUsers() {
  return {
    type: types.REQUEST_USERS
  }
}

function receieveUsers(json) {
  return {
    type: types.RECEIVE_USERS,
    users: json.users
  }
}

export function fetchUsers() {
  return (dispatch, getState) => {
    dispatch(requestUsers());
    return fetchHelper(`/api/users`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => dispatch(receieveUsers(json)));
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
      dispatch(loading());
      return dispatch(fetchFutureEvents());
    }
  }
}

export function updateDashboardCards(cards) {
  return {
    type: types.UPDATE_DASHBOARD_CARDS,
    cards: cards
  }
}

function formatCards(cards) {
  return dispatch => {
    if (cards) {
      const formatted = [
        {
          content: Object.values(cards.users).reduce((a, b) => a + b),
          title: 'Users',
          url: '/admin/users'
        },
        {
          content: cards.events,
          title: 'Events',
          url: '/admin/events'
        },
        {
          content: cards.users.participant,
          title: 'Participants',
          url: '/admin/users'
        },
        {
          content: cards.users.volunteer,
          title: 'Volunteers',
          url: '/admin/users'
        },
        {
          content: cards.users.admin,
          title: 'Admins',
          url: '/admin/users'
        }
      ];
      dispatch(updateDashboardCards(formatted));
    } else {
      return {
        type: types.API_ERROR,
        error: 'An error occurred pulling that information'
      }
    }
  }
}

function updateUser(user) {
  return (dispatch, getState) => {
    dispatch(loading());
  }
}

function userMarkedAsAttended(event, user) {
  return {
    type: types.MARK_ATTENDING,
    event: event,
    user: user
  };
}

function userMarkedAsUnAttended(event, user) {
  return {
    type: types.MARK_UNATTENDING,
    event: event,
    user: user
  };
}

export function loadDashboardCards() {
  return (dispatch, getState) => {
    dispatch(loading());
    dispatch(updateDashboardCards(DEFAULT_CARDS));
    return fetchHelper(`/api/dashboard`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => json.cards)
      .then(cards => dispatch(formatCards(cards)))
      .then(() => dispatch(stopLoading()));
  }
}

export function markAttending(event, user) {
  return (dispatch, getState) => {
    dispatch(loading());
    return fetchHelper(`/api/events/${event._id}/present/${user._id}`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => dispatch(userMarkedAsAttended(event, user)))
      .then(() => dispatch(stopLoading()));
  }
}

export function markUnattending(event, user) {
  return (dispatch, getState) => {
    dispatch(loading());
    return fetchHelper(`/api/events/${event._id}/absent/${user._id}`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => dispatch(userMarkedAsUnAttended(event, user)))
      .then(() => dispatch(stopLoading()));
  }
}

function getAPIToken(getState) {
  return getState().user ? getState().user.token : null;
}
