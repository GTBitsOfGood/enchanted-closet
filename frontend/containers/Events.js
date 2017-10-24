import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Button, Container, Icon, Dimmer, Loader, Segment } from 'semantic-ui-react';

import { REQUEST_EVENTS, RECEIVE_EVENTS } from '../actions/types';

import { fetchEventsIfNeeded, invalidateEvents } from '../actions/index';

import {uniqueId} from 'lodash';

class Events extends Component {
    constructor(props) {
        super(props);
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchEventsIfNeeded());
    }

    handleRefreshClick(e) {
        e.preventDefault()

        const { dispatch } = this.props;
        dispatch(invalidateEvents())
        dispatch(fetchEventsIfNeeded());
    }

    render() {
        const { events, isFetchingEvents, lastUpdatedEvents } = this.props
        return (
            <Container>
                <h1>Upcoming Events</h1>
                {lastUpdatedEvents &&
                    <span>Last updated at {new Date(lastUpdatedEvents).toLocaleTimeString()}.{' '}</span>
                }
                {!isFetchingEvents &&
                  <a href="#" onClick={this.handleRefreshClick}>
                    Refresh
                  </a>}
                <Dimmer active={isFetchingEvents}>
                    <Loader>Loading</Loader>
                </Dimmer>
                { events.length > 0 && 
                    events.map(Event)
                }
                { !isFetchingEvents && events.length === 0 && 
                    <h1>No events</h1>
                }
            </Container>
        );
    }
}

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

Events.propTypes = {
  events: PropTypes.array.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  lastUpdatedEvents: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {
        isFetchingEvents,
        lastUpdatedEvents,
        events
    } = state;

    return {
        events,
        isFetchingEvents,
        lastUpdatedEvents
    }
}

export default connect(mapStateToProps)(Events)


// const Events = ({ modalLoaderActive, events, displayLoader }) => ({
//     componentDidMount() {
//         this.props.displayLoader();
//     },
//     render() {
//         return (
//             <Container>
//                 <h1>Upcoming Events</h1>
//                 <Button onClick={displayLoader()}>Show loader</Button>
//                 <Dimmer active={modalLoaderActive}>
//                     <Loader>Loading</Loader>
//                 </Dimmer>
//                 { events !== null && events.length > 0 && 
//                     events.map(Event)
//                 }
//                 { events === null && 
//                     <h1>No events</h1>
//                 }
//             </Container>
//         );
//     }
// });

// const Event = ( data ) => {
//     return (
//         <Segment key={uniqueId('event_')}>
//             <h3>{data.name}</h3>
//             <p>{data.description}</p>
//             <p><Icon name='calendar'/>{data.datetime}</p>
//             <p><Icon name='road'/>{data.location}</p>
//         </Segment>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         modalLoaderActive: state.modalLoaderActive  ? state.modalLoaderActive : false,
//         events: state.events || null
//     };
// };

// const mapDispatchToProps = (dispatch ) => ({
//     displayLoader() {
//         return () => {
//             dispatch(showLoader());
//         }
//     }
// });

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Events);
