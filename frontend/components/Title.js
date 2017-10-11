import React from 'react';
import PropTypes from 'prop-types';

const Title = ( { applicationName } ) => {
    return (
        <h1>{applicationName}</h1>
    );
};

Title.propTypes = {
    applicationName: PropTypes.string,
};


export default Title;
