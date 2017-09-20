import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import { ButtonGroup, Button } from 'elemental';
import LoginForm from '../components/CustomForm';

//<Button>Test2</Button>


const AppContainer = ({ name }) => {
    return (
        <div>
            <Title name={name} />
	    <ButtonGroup>
	    <Button type="default">Left</Button>
	    <Button type="default">Middle</Button>
	    <Button type="default">Right</Button>
	    </ButtonGroup>	    
	    <LoginForm />
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
