import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import Homepage from './Homepage.js';
import Login from './Login.js';
import Register from './Register';
import Profile from './Profile.js';
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

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export default function Root({ store }) {
  return (
    <Provider store={store}>
      <div>
	<Helmet bodyAttributes={{style: 'background-color : #E2D0F1'}}/>
	<Router>
	  <div>
	    <Navigation />
	    <Switch>
	      <Route exact path="/" component={Homepage}/>
	      <Route path="/login" component={Login} />
	      <Route path="/register" component={Register} />
	      <Auth>
		<Route path="/profile" component={Profile} />
		<Route exact path="/events" component={Events} />
		<Route path="/events/:id" component={EventsDetail} />
		<Route path="/admin/dashboard" component={AdminDashboard} />
		<Route exact path="/admin/events" component={AdminEvents} />
		<Switch>
		  <Route path="/admin/events/create" component={AdminEventsNew} />
		  <Route path="/admin/events/:id/attendance" component={EventsAttendance} />
		  <Route path="/admin/events/:id/edit" component={AdminEventsEdit} />
		  <Route exact path="/admin/events/:id" component={AdminEventsDetail} />
		</Switch>
		<Route exact path="/admin/users" component={AdminUsers} />
		<Switch>
		  <Route exact path="/admin/users/create" component={AdminUsersNew} />
		  <Route path="/admin/users/:id" component={AdminUsersDetail} />
		</Switch>
	      </Auth>
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
