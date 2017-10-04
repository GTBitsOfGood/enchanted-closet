import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'elemental';

//display for an event entry - extend generic entry?
const EventEntry = ( props ) => {
    let retBlock = (
	<Row className="EventEntry">
	    <Col sm="1/6"/>
	    <Col sm="2/3">
	    <Card>
	    <Row className="lead">
	    <Col sm="2/3"> {props.title} </Col>
	    <Col sm="1/3"> {props.date} </Col> //make this right aligned
	    </Row>
	    <Row>
	    <Col> {props.desc} </Col>
	    </Row>
	    <Row>
	    <Col> {props.address} </Col>
	    </Row>
	    </Card>
	    </Col>
	    <Col sm="1/6"/>
	</Row>
    );
    return retBlock;
};

export default EventEntry;
