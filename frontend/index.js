import 'semantic-ui-css/semantic.min.css'

import { render } from 'react-dom'
import React from 'react'

import { AppContainer } from 'react-hot-loader'

import { configureStore, history } from './store/configureStore'
import { loadAuthState, saveAuthState } from './store/localStorage'
import App from './containers/App.js'

const store = configureStore({ user: loadAuthState() })

store.subscribe(() => {
  saveAuthState(store.getState())
})

render(
  <App store={store} history={history} />,
  document.getElementById('root')
)

if (module.hot) module.hot.accept('./containers/Root', () => render(Root))
