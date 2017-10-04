import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import FileForm from '../components/CustomForm';
import EventEntry from '../components/EventEntry';
import Frame from '../components/Frame';
import { Row, Col, Card } from 'elemental';


const AppContainer = ({ name }) => {
    return (
	<div>
	    
	    <Row>
	    <Col sm="1/5" />
	    <Col sm="3/5">
	    //<Card>
            <Title name={name} />
    	    <FileForm type="survey"/>
	    <FileForm type="login" />
	    //<EventEntry title="a" date="b" desc="c" address="d" />
	    //</Card>
	    </Col>
	    <Col sm="1/5" />
	    </Row>
        </div>
    );
};

AppContainer.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        name: state.name
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
