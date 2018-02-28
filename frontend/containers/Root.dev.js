import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import Homepage from './Homepage.js';
import Login from './Login.js';
import Logout from './Logout.js';
import Register from './Register';
import Profile from './Profile.js';
import Dashboard from './Dashboard.js';
import Events from './Events.js';
import EventsDetail from './EventsDetail.js';
import MissingPage from './MissingPage.js';

import Navigation from './Navigation';

import DevTools from './DevTools';
import Helmet from 'react-helmet';

import * as Admin from './Admin'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SmartRoute } from '../components';

import { COLORS } from '../constants'

export default function Root({ store }) {  
  return (
    <Provider store={store}>
      <div>
	<Helmet bodyAttributes={styles.helmetStyle} />
	<Router>
	  <div>
	    <Navigation />
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
	      <Route path="/events/:id" component={EventsDetail} />
	      <SmartRoute
		accepts={['Admin']}
		exact path="/admin/events"
		component={Admin.Events}
	      />
	      <SmartRoute
		accepts={['Admin']}
		path="/admin/events/create"
		component={Admin.EventsNew}
	      />	      
	      <SmartRoute
		accepts={['Admin']}
		path="/admin/events/:id/attendance"
		component={Admin.Attendance}
	      />
	      <SmartRoute
		accepts={['Admin']}
		path="/admin/events/:id/edit"
		component={Admin.EventsEdit}
	      />
	      <SmartRoute
		accepts={['Admin']}
		exact path="/admin/events/:id"
		component={Admin.EventsDetail}
	      />
	      <SmartRoute
		accepts={['Admin']}
		exact path="/admin/users"
		component={Admin.Users}
	      />	      
	      <SmartRoute
		accepts={['Admin']}
		exact path="/admin/users/create"
		component={Admin.UsersNew}
	      />
	      <SmartRoute
		accepts={['Admin']}
		path="/admin/users/:id"
		component={Admin.UsersDetail}
	      />
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
