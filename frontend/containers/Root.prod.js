import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import Home from './Home.js';

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
