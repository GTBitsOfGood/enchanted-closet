import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import { FileForm } from '../components/CustomForm';
import EventEntry from '../components/EventEntry';
import Frame from '../components/Frame';
import Navigation from './Navigation';

import { Segment, Container, Grid, Reveal, Menu, Header, Button, Icon, Image } from 'semantic-ui-react';

const AppContainer = () => {
    const logoSrc = "/images/EC_logo_web.png"
    
    return (<Segment
	textAlign='center'
	style={{ minHeight: 700, padding: '1em 0em' }}
	vertical
	    >
        <Container>
	    <Image src={logoSrc} size='large' centered />
            <Header
                as='h2'
                content='Volunteer Registration Platform'
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
	    <Header
		as='h2'
		content='Please Log In'
		style={{ fontSize : '1.7em', fontWeight: 'normal' }}
	    />
        </Container>
    </Segment>)
};




AppContainer.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch ) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
