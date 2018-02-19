import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import Homepage from './Homepage.js';
import Login from './Login.js';
import Register from './Register';
import Profile from './Profile.js';
import Dashboard from './Dashboard.js';
import Events from './Events.js';
import EventsDetail from './EventsDetail.js';
import MissingPage from './MissingPage.js';

import Navigation from './Navigation';

import DevTools from './DevTools';
import Helmet from 'react-helmet';

import AdminDashboard from './Admin/Dashboard';
import AdminEvents from './Admin/Events';
import AdminUsers from './Admin/Users';
import AdminUsersNew from './Admin/UsersNew';
import AdminUsersDetail from './Admin/UsersDetail';
import AdminEventsNew from './Admin/EventsNew';
import AdminEventsEdit from './Admin/EventsEdit';
import AdminEventsDetail from './Admin/EventsDetail';

import EventsAttendance from './Admin/Attendance';

import Auth from './Auth';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SmartRoute } from '../components';

import { COLORS } from '../constants'

export default function Root({ store }) {
  return (
    <Provider store={store}>
      <div>
	<Helmet bodyAttributes={styles.helmetStyle}/>
	<Router>
	  <div>
	    <Navigation />
	    <Switch>
	      <Route exact path="/" component={Homepage}/>
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
	      <Route path="/profile" component={Profile} />
	      <Route path="/dashboard" component={Dashboard} />
	      <Route exact path="/events" component={Events} />
	      <Route path="/events/:id" component={EventsDetail} />
	      <Route path="/admin/dashboard" component={AdminDashboard} />
	      <Route exact path="/admin/events" component={AdminEvents} />
	      <Route path="/admin/events/create" component={AdminEventsNew} />
	      <Route path="/admin/events/:id/attendance" component={EventsAttendance} />
	      <Route path="/admin/events/:id/edit" component={AdminEventsEdit} />
	      <Route exact path="/admin/events/:id" component={AdminEventsDetail} />		
	      <Route exact path="/admin/users" component={AdminUsers} />
	      <Route exact path="/admin/users/create" component={AdminUsersNew} />
	      <Route path="/admin/users/:id" component={AdminUsersDetail} />		
	      <Route path="/error" component={MissingPage} />
	      <Route component={MissingPage} />
	    </Switch>
	  </div>
	</Router>
	<DevTools/>
      </div>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

const styles = {
  helmetStyle: {
    style : `background-color : ${COLORS.BODY_BACKGROUND}`
  }
}
