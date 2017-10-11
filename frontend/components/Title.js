import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {Button} from 'semantic-ui-react';

import { toggleTitleState } from '../actions/index';

const Title = ( { toggleState, showTitle, title } ) => {
	let titleElement = <h1>{title}</h1>;
	if (!showTitle) titleElement = <h1>Not {title}</h1>;
    return (
    	<div>
	    	<Button onClick={toggleState()}>Toggle Title State</Button>
	    	{titleElement}
	    </div>
    );
};

Title.propTypes = {
    applicationName: PropTypes.string
};

const mapStateToProps = state => {
    return {
        title: state.applicationName,
        showTitle: state.showTitle
    };
};

const mapDispatchToProps = dispatch => ({
	toggleState() {
		return () => {
			dispatch(toggleTitleState());
		}
	}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Title);
