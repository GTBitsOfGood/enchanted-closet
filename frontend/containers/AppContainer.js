import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import { FileForm } from '../components/CustomForm';
import EventEntry from '../components/EventEntry';
import Frame from '../components/Frame';

import { Segment, Container, Grid, Reveal, Menu, Header, Button, Icon, Image } from 'semantic-ui-react';

const AppContainer = () => {
    const logoSrc = "/images/EC_logo_web.png"
    const img2Src = "/images/EC_dress3-01.png"
    return (<Segment
	textAlign='center'
	style={{ minHeight: 700, padding: '1em 0em' }}
	vertical
	    >
        <Container>
	    <Image src={logoSrc} size='large' centered />
            <Header
                as='h2'
                content='Volunteer Registration Platform: Login at the top right'
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
	    <Image src={img2Src} size='large' centered />
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
