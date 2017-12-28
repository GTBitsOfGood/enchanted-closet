import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import { FileForm } from '../components/CustomForm';
import EventEntry from '../components/EventEntry';
import Event from '../components/Event';

import LoadingIcon from '../components/LoadingIcon';

import {bindActionCreators} from 'redux';
import {fetchEventsIfNeeded} from '../actions';

import { withRouter } from 'react-router-dom';

import { Segment, Container, Grid, Reveal, Menu, Header, Button, Icon, Image } from 'semantic-ui-react';

class Homepage extends Component {
    constructor(props){
    	super(props);
        const {fetchEventsIfNeeded, events} = this.props;
        fetchEventsIfNeeded();
    }

    render() {
        const LIMIT = 3;
        const {loading, events, history} = this.props;
        const logoSrc = "/images/EC_logo_web.png";
        const img2Src = "/images/EC_dress3-01.png";
        return (
            <Segment textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
                <Container>
                    <Image src={logoSrc} size='large' centered />
                    <Header
                        size='large'
                        content='Event Platform'
                        style={{ fontSize: '1.7em', fontWeight: 'normal' }}/>
                    {/* <Image src={img2Src} size='large' centered /> */}
                    <div style={{textAlign: 'left'}}>
                        <Header
                            size='medium'
                        content='Upcoming Events'/>
                        <LoadingIcon active={loading}/>
                        {events && events.length > 0 ?
                            events.slice(0, LIMIT).map(event => {
                                event.showAdminControls = false;
                                return (<Event data={event} history={history} />);
                            })
                        :
                        <p>No upcoming events</p>
                        }
                    </div>
                </Container>
            </Segment>
        )
    }
};

Homepage.propTypes = {
};

const mapStateToProps = (state) => {
    return {
        events: state.events,
        loading: state.loading
    };
};

const mapDispatchToProps = (dispatch ) => {
    return bindActionCreators({
        fetchEventsIfNeeded: fetchEventsIfNeeded
    }, dispatch);
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage));
