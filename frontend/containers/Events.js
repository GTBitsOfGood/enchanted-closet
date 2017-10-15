import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Container, Icon, Dimmer, Loader, Segment } from 'semantic-ui-react'

import { showLoader, hideLoader } from '../actions/index';

import {uniqueId} from 'lodash';

const Events = ({ modalLoaderActive, events, displayLoader }) => {
    return (
        <Container>
            <h1>Upcoming Events</h1>
            <Dimmer active={modalLoaderActive}>
                <Loader>Loading</Loader>
            </Dimmer>
            { events !== null && events.length > 0 && 
                events.map(Event)
            }
            { events === null && 
                <h1>No events</h1>
            }
        </Container>
    );
};

const Event = ( data ) => {
    return (
        <Segment key={uniqueId('event_')}>
            <h3>{data.name}</h3>
            <p>{data.description}</p>
            <p><Icon name='calendar'/>{data.datetime}</p>
            <p><Icon name='road'/>{data.location}</p>
        </Segment>
    )
}

const mapStateToProps = (state) => {
    return {
        modalLoaderActive: state.modalLoaderActive || false,
        events: state.events || null
    };
};

const mapDispatchToProps = (dispatch ) => ({
    displayLoader() {
        return () => {
            dispatch(showLoader());
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Events);
