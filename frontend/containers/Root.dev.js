import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'
import { hot } from 'react-hot-loader'
import DevTools from './DevTools'
import { COLORS } from '../constants'
import { SmartRoute, GlobalDimmer, GlobalError, GlobalMessage } from '../components'
import * as Admin from './Admin'
import Loadable from 'react-loadable'
const Events = Loadable({
  loader: () => import('./Events.js'),
  loading () { return (<div> Loading... </div>) }
})
const EventsDetail = Loadable({
  loader: () => import('./EventsDetail.js'),
  loading () { return (<div> Loading... </div>) }
})
const Homepage = Loadable({
  loader: () => import('./Homepage.js'),
  loading () { return (<div> Loading... </div>) }
})
const Login = Loadable({
  loader: () => import('./Login.js'),
  loading () { return (<div> Loading... </div>) }
})
const Logout = Loadable({
  loader: () => import('./Logout.js'),
  loading () { return (<div> Loading... </div>) }
})
const MissingPage = Loadable({
  loader: () => import('./MissingPage.js'),
  loading () { return (<div> Loading... </div>) }
})
const Navigation = Loadable({
  loader: () => import('./Navigation'),
  loading () { return (<div> Loading... </div>) }
})
const Profile = Loadable({
  loader: () => import('./Profile.js'),
  loading () { return (<div> Loading... </div>) }
})
const Register = Loadable({
  loader: () => import('./Register'),
  loading () { return (<div> Loading... </div>) }
})

const Dashboard = Loadable({
  loader: () => import('./Dashboard.js'),
  loading () { return (<div>Loading...</div>) }
})

const FormDemo = Loadable({
  loader: () => import('./FormDemo'),
  loading () { return (<div>Loading...</div>) }
})

class Root extends React.Component {
  render () {
    return (
      <Provider store={this.props.store}>
        <div>
          <Helmet bodyAttributes={styles.helmetStyle} />
          <Router>
            <div>
              <Navigation />
              <GlobalDimmer />
              <GlobalError />
              <GlobalMessage />
              <Switch>
                <Route
                  path="/formDemo"
                  componet={FormDemo}
                />
                <SmartRoute
                  accepts={['loggedOut', 'loggedIn']}
                  path="/formDemo"
                  component={FormDemo}
                  redirect="/"
                />
                <SmartRoute
                  accepts={['loggedOut']}
                  exact path="/"
                  component={Homepage}
                  redirect="/dashboard"
                />
                <SmartRoute
                  accepts={['loggedOut']}
                  path="/login"
                  component={Login}
                  redirect="/"
                />
                <SmartRoute
                  accepts={['loggedOut']}
                  path="/register"
                  component={Register}
                  redirect="/"
                />
                <SmartRoute
                  accepts={['loggedIn']}
                  path="/profile"
                  component={Profile}
                  redirect="/login"
                />
                <SmartRoute
                  accepts={['loggedIn']}
                  path="/dashboard"
                  component={Dashboard}
                  redirect="/login"
                />
                <SmartRoute
                  accepts={['loggedIn']}
                  path="/logout"
                  component={Logout}
                  redirect="/"
                />
                <Route exact path="/events" component={Events} />
                <SmartRoute
                  accepts={['Admin']}
                  exact path="/events/create"
                  component={Admin.EventsNew}
                />
                <SmartRoute
                  accepts={['Admin']}
                  path="/events/:id/edit"
                  component={Admin.EventsEdit}
                />
                <SmartRoute
                  accepts={['Admin', 'Volunteer']}
                  path="/events/:id/attendance"
                  component={Admin.Attendance}
                />
                <Route path="/events/:id" component={EventsDetail} />
                <SmartRoute
                  accepts={['Admin']}
                  exact path="/users"
                  component={Admin.Users}
                />
                <SmartRoute
                  accepts={['Admin']}
                  exact path="/users/create"
                  component={Admin.UsersNew}
                />
                <SmartRoute
                  accepts={['Admin']}
                  path="/users/:id"
                  component={Admin.UsersDetail}
                />
                <Route path="/error" component={MissingPage} />
                <Route component={MissingPage} />
              </Switch>
            </div>
          </Router>
          {(process.env.REDUX_DEV_TOOL !== 'BROWSER') && <DevTools/>}
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

const styles = {
  helmetStyle: {
    style: `background-color : ${COLORS.BODY_BACKGROUND}`
  }
}

export default hot(module)(Root)
