import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer.js';
import Login from './Login.js';
import Events from './Events.js';
import EventsDetail from './EventsDetail.js';
import MissingPage from './MissingPage.js';

import Navigation from './Navigation';

import DevTools from './DevTools';
import Helmet from 'react-helmet';

import AdminDashboard from './Admin/Dashboard';
import AdminEvents from './Admin/Events';
import AdminEventsNew from './Admin/EventsNew';
import AdminEventsEdit from './Admin/EventsEdit';
import AdminEventsDetail from './Admin/EventsDetail';

import { CookiesProvider } from 'react-cookie';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <div>
                <Helmet bodyAttributes={{style: 'background-color : #efefef'}}/>
                <Router>
                    <div>
                        <Navigation />
                        <Switch>
                            <Route exact path="/" component={AppContainer}/>
                            <Route path="/login" component={Login} />
                            <Route exact path="/events" component={Events} />
            			    <Route path="/events/:id" component={EventsDetail} />
                            <Route path="/admin/dashboard" component={AdminDashboard} />
                            <Route exact path="/admin/events" component={AdminEvents} />
                            <Route path="/admin/events/create" component={AdminEventsNew} />
                            <Route exact path="/admin/events/:id" component={AdminEventsDetail} />
                            <Route path="/admin/events/:id/edit" component={AdminEventsEdit} />
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
