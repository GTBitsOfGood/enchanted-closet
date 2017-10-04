import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'elemental';

const Frame = ( props ) => {
    let retBlock = (
	<Row>
	<Col sm="1/5" />
	    <Col sm="3/5">
	{props.data}
	</Col>
	<Col sm="1/5" />
	</Row>
    );
    return retBlock;
};

export default Frame;
