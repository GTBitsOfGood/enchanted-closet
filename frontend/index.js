import '../node_modules/semantic-ui-css/semantic.min.css'
//import './assets/stylesheets/base'

import { render } from 'react-dom'
import React from 'react'

import { AppContainer } from 'react-hot-loader'

import { configureStore, history } from './store/configureStore'
import { loadAuthState, saveAuthState } from './store/localStorage'
import Root from './containers/Root.js'

const store = configureStore({ user: loadAuthState() })

store.subscribe(() => {
  saveAuthState(store.getState())
})

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
