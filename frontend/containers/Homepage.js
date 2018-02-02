import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';

import {fetchEventsIfNeeded} from '../actions';

import { Segment, Container, Grid, Reveal, Menu, Header, Button, Icon, Image } from 'semantic-ui-react';
import { Event, EventEntry, FileForm, LoadingIcon, Title} from '../components'

class Homepage extends Component {
  constructor(props){
    super(props);
    const {fetchEventsIfNeeded, events} = this.props;
    fetchEventsIfNeeded();
  }

  render() {
    const LIMIT = 3;
    const {loading, events, history} = this.props;
    const processedEvents =
      events && events.length > 0 ?
      events.slice(0, LIMIT).map(event => {
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
	  <Image src={images.logo} size='large' centered />
	  <Header
	  size='large'
	  content='Event Platform'
	  style={styles.headline}
	  />
	  <div style={styles.body}>
	    <Header
	      size='medium'
	      content='Upcoming Events'
	    />
	    { eventsBlock }            
          </div>
        </Container>
      </Segment>
    )
  }
};

Homepage.propTypes = {
};


const styles = {
  headline: {
    fontSize: '1.7em',
    fontWeight: 'normal'
  },
  body: {
    textAlign: 'left'
  }
}

const images = {
  logo: "/images/EC_logo_web.png"
}

const mapStateToProps = (state) => {
  return {
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
