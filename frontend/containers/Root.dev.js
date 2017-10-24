import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer.js';
import Login from './Login.js';
import Events from './Events.js';
import DevTools from './DevTools';

import Navigation from './Navigation';

import { HashRouter as Router, Route } from 'react-router-dom';

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <div>
                <Router>
                    <div>
                        <Navigation />
                        <Route exact path="/" component={AppContainer} />
                        <Route path="/login" component={Login} />
                        <Route path="/events" component={Events} />
                    </div>
                </Router>
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
