import { errorWrap, showModalLoader, hideModalLoader, loading, stopLoading } from './loading'
import { safeWrap, fetchHelper, getAPIToken, DEFAULT_HEADERS, deleteLocalData } from './util'
import { receiveEvents, receiveMoreEvents } from './'
import * as types from './types'

export function requestUsers () {
  return {
    type: types.REQUEST_USERS
  }
}

export function receiveUsers (json) {
  return {
    type: types.RECEIVE_USERS,
    users: json.users
  }
}

export function receiveMoreUsers (users) {
  return {
    type: types.RECEIVE_MORE_USERS,
    users
  }
}

export function upsertUser (data) {
  return (dispatch, getState) => {
    dispatch(loading())
    const url = data._id ? `/api/users/${data._id}` : `/api/users`
    const method = data._id ? 'PUT' : 'POST'
    const isUpdate = !!data._id
    delete data._id
    return fetchHelper(url, getAPIToken(getState), {
      method: method,
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => safeWrap(json, () => dispatch(processUserUpsert(json, isUpdate)), dispatch))
      .then(() => stopLoading())
  }
}

function processUserUpsert (json, isUpdate) { // updates users array as well (only relevant for admin)
  return (dispatch, getState) => {
    if (json.status === 'ok') {
      dispatch(updateUserWithEvents(json.user)) // whatever, not gonna strip users array
      dispatch({
        type: types.USERS_UPSERT,
        user: json.user,
        isUpdate: isUpdate
      })
    } else {
      errorWrap(dispatch, json.msg)
    }
  }
}

export function fetchUsers () {
  return (dispatch, getState) => {
    dispatch(loading())
    dispatch(requestUsers())
    return fetchHelper(`/api/users`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => safeWrap(json, () => dispatch(receiveUsers(json)), dispatch))
      .then(() => dispatch(stopLoading()))
  }
}

// probably repeat of refreshUser in auth
export function fetchUserById (id) {
  return (dispatch, getState) => {
    return fetchHelper(`/api/users/${id}`, getAPIToken(getState), {
      header: DEFAULT_HEADERS
    })
      .then(response => response.json())
      .then(json => safeWrap(json, () => dispatch(updateUser(json.user)), dispatch))
      .then(() => dispatch(stopLoading()))
  }
}

export function updateUserWithEvents (user) {
  return (dispatch, getState) => {
    const events = user.events ? user.events.map(e => e._id) : []
    const pendingEvents = user.pendingEvents ? user.pendingEvents.map(e => e._id) : []
    const newUser = { ...user, events, pendingEvents }
    dispatch(updateUser(newUser))
    dispatch(receiveEvents(user.events)) // these are unstripped
    dispatch(receiveMoreEvents(user.pendingEvents))
    dispatch(stopLoading())
  }
}

function updateUser (user) {
  return {
    type: types.USER_UPDATE,
    user
  }
}

export function deleteUser (id) {
  return (dispatch, getState) => {
    dispatch(showModalLoader())
    return fetchHelper(`/api/users/${id}`, getAPIToken(getState), {
      method: 'DELETE',
      headers: DEFAULT_HEADERS
    }, getState().apiToken)
      .then(response => response.json())
      .then(json => {
        return safeWrap(json, () => {
          dispatch(deleteLocalData('users', id))
        }, dispatch)
      })
      .then(() => dispatch(hideModalLoader()))
  }
}


export function promoteUser (id) {
  return (dispatch, getState) => {
    dispatch(loading())
    return fetchHelper(`/api/users/admin/${id}`, getAPIToken(getState))
      .then(response => response.json())
      .then(json => safeWrap(json, () => dispatch(receiveMoreUsers([json.user])), dispatch))
      .then(() => dispatch(stopLoading()))
  }
}
