import { hot } from 'react-hot-loader'
import React from 'react'
import Root from './Root.js'

class App extends React.Component {
  render () {
    return (<Root history={this.props.history} store={this.props.store} />)
  }
}

export default hot(module)(App)
