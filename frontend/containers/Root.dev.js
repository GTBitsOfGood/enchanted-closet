import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer.js';
import Login from './Login.js';
import DevTools from './DevTools';

import { HashRouter as Router, Route } from 'react-router-dom';

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <div>
                <Router>
                    <div>
                        <Route exact path="/" component={AppContainer} />
                        <Route path="/login" component={Login} />
                    </div>
                </Router>
                <DevTools />
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
