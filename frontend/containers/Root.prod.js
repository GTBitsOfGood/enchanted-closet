import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import Homepage from './Homepage.js';

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <Homepage />
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
