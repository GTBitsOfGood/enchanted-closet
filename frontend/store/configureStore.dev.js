import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import { composeWithDevTools } from 'redux-devtools-extension';

import defaultState from '../static/defaultState';

export function configureStore(initialState) {
    return createStore(
        rootReducer,
        Object.assign({}, initialState, defaultState),
        composeWithDevTools(
            applyMiddleware(thunkMiddleware)
        ),
    );
}
