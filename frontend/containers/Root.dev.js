import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer.js';
import Login from './Login.js';
import Events from './Events.js';
<<<<<<< HEAD
=======
import MissingPage from './MissingPage.js';

import Navigation from './Navigation';

>>>>>>> 2433daea710b59d8c38a88814c673eaf1cded570
import DevTools from './DevTools';
import Helmet from 'react-helmet';

import AdminDashboard from './Admin/Dashboard';
import AdminEvents from './Admin/Events';
import AdminEventsNew from './Admin/EventsNew';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { HashRouter as Router, Route } from 'react-router-dom';

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <div>
<<<<<<< HEAD
                <Router>
                    <div>
                        <Route exact path="/" component={AppContainer} />
                        <Route path="/login" component={Login} />
                        <Route path="/events" component={Events} />
                    </div>
                </Router>
                <DevTools />
=======
                <Helmet bodyAttributes={{style: 'background-color : #efefef'}}/>
                <Router>
                    <div>
                        <Navigation />
                        <Switch>
                            <Route exact path="/" component={AppContainer} />
                            <Route path="/login" component={Login} />
                            <Route path="/events" component={Events} />
                            <Route path="/admin/dashboard" component={AdminDashboard} />
                            <Route exact path="/admin/events" component={AdminEvents} />
                            <Route path="/admin/events/create" component={AdminEventsNew} />
                            <Route component={MissingPage} />
                        </Switch>
                    </div>
                </Router>
                <DevTools/>
>>>>>>> 2433daea710b59d8c38a88814c673eaf1cded570
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
