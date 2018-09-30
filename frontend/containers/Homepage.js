import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { fetchEventsIfNeeded } from '../actions';

import { Button, Divider, Segment, Container, Grid, Reveal, Menu, Header, Icon, Image } from 'semantic-ui-react';
import { Event, EventEntry, FileForm, LoadingIcon, Title} from '../components'

import { HOMEPAGE_EVENT_LIMIT } from '../constants';



class Homepage extends Component {
  constructor(props){
    super(props);

    const { events, fetchEventsIfNeeded } = this.props;
    fetchEventsIfNeeded();
  }

  render() {
    const { loading, events, history } = this.props;

    const processedEvents =
      events && events.length > 0 ?
      events.sort((e1, e2) => (new Date(e1.datetime) - new Date(e2.datetime))).slice(0, HOMEPAGE_EVENT_LIMIT).map(event => {
	event.showAdminControls = false;
	return <Event
		 data={event}
		 history={history}
		 key={`home_event_${event._id}`}
	/>;
      }) :
      <p>No upcoming events</p>;
			    
    const eventsBlock = loading ?
			<LoadingIcon active={loading}/> :
			processedEvents
    
    return (
      <Segment textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
	<Container>
	  <Segment>
	    <Image src={images.logo} size='large' centered />
	    <Header
	      size='large'
	      content='Event Platform'
	      style={styles.headline}
	    />
	  </Segment>
	  <Segment style={styles.body}>
	    <Header
	      floated="left"
	      as="h3"
	      content='Upcoming Events'
	    />
	    <Button
	      floated="right"
	      color="violet"
	      compact
	      as={Link}
	      to={'/events'}
	    >
	      See All Events
	    </Button>
	    <Divider style={styles.mainDivider} />
	    { eventsBlock }
	  </Segment>
	  <Divider />

        </Container>
      </Segment>
    )
  }
};

Homepage.propTypes = {
};


const styles = {
  body: {
    textAlign: 'left'
  },
  headline: {
    fontSize: '4em',
    fontWeight: '600'
  },
  mainDivider: {
    clear: "both"
  }
}

const images = {
  logo: "/images/EC_logo_web.png"
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user,
    events: state.events,
    loading: state.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchEventsIfNeeded: fetchEventsIfNeeded
  }, dispatch);
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage));
