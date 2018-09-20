import React from 'react'
import { render } from 'react-dom'
import { configureStore, history } from './store/configureStore'
import Root from './containers/Root'

import { loadAuthState, saveAuthState } from './store/localStorage'

import '../node_modules/semantic-ui-css/semantic.min.css'

import './assets/stylesheets/base'

const store = configureStore({ user: loadAuthState() })

store.subscribe(() => {
  saveAuthState(store.getState())
})

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
