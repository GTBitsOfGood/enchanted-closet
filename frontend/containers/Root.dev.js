import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import Home from './Home.js';
import Login from './Login.js';
import Events from './Events.js';
import MissingPage from './MissingPage.js';

import Navigation from './Navigation';

import { AppContainer } from 'react-hot-loader';

import DevTools from './DevTools';
import Helmet from 'react-helmet';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export default function Root({ store }) {
    return (
        <AppContainer>
            <Provider store={store}>
                <div>
                    <Helmet bodyAttributes={{style: 'background-color : #efefef'}}/>
                    <Router>
                        <div>
                            <Navigation />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/login" component={Login} />
                                <Route path="/events" component={Events} />
                                <Route component={MissingPage} />
                            </Switch>
                        </div>
                    </Router>
                    <DevTools/>
                </div>
            </Provider>
        </AppContainer>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
