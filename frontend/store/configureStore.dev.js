import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import DevTools from '../containers/DevTools'
import defaultState from '../static/defaultState'
import rootReducer from '../reducers'

let composeResult = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
)

export function configureStore (initialState) {
  return createStore(
    rootReducer,
    Object.assign({}, initialState, defaultState),
    composeResult
  )
}
