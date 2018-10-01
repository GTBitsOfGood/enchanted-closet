import PropTypes from 'prop-types'
import React from 'react'
import { Provider } from 'react-redux'
import Homepage from './Homepage.js'
import Login from './Login.js'
import Logout from './Logout.js'
import Register from './Register'
import Profile from './Profile.js'
import Dashboard from './Dashboard.js'
import Events from './Events.js'
import EventsDetail from './EventsDetail.js'
import MissingPage from './MissingPage.js'

import Navigation from './Navigation'

import Helmet from 'react-helmet'

import * as Admin from './Admin'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SmartRoute, GlobalDimmer, GlobalError, GlobalMessage } from '../components'

import { COLORS } from '../constants'

export default function Root ({ store }) {
  return (
    <Provider store={store}>
      <div>
        <Helmet bodyAttributes={styles.helmetStyle} />
        <Router>
          <div>
            <Navigation />
            <GlobalDimmer />
            <GlobalError />
            <GlobalMessage />
            <Switch>
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
      </div>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

const styles = {
  helmetStyle: {
    style: `background-color : ${COLORS.BODY_BACKGROUND}`
  }
}
