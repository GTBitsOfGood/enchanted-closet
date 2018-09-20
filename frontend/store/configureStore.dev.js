import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

import defaultState from '../static/defaultState'

export function configureStore (initialState) {
  return createStore(
    rootReducer,
    Object.assign({}, initialState, defaultState),
    composeWithDevTools(
      applyMiddleware(thunkMiddleware)
    )
  )
}
