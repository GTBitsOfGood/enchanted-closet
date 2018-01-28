import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Container, Card } from 'semantic-ui-react';

import { fetchEventsIfNeeded } from '../../actions';

import PageTitle from '../../components/PageTitle';
import LoadingIcon from '../../components/LoadingIcon';

import Event from '../../components/Event';
import { withRouter } from 'react-router-dom';

class AdminEvents extends Component {
  constructor(props) {
    super(props);

    if (this.props.user.role !== 'Volunteer' && this.props.user.role !== 'Admin') {
      this.props.history.goBack();
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEventsIfNeeded());
  }

  render() {
    const { isFetchingEvents, history } = this.props;
    let { events } = this.props;
    events = events.map(e => {
      e.showAdminControls = true;
      return e;
    });
    return (
      <Container>
	<PageTitle title="Events" link="admin/events/create" linkTitle="Create New"/>
	<div style={{paddingTop:50}}>
	  {isFetchingEvents &&
	   <LoadingIcon active/>
	  }
	  { !isFetchingEvents && events.length > 0 &&
	    events.map(e => {
	      return <Event key={e._id} data={e} history={history}/>
	    })
	  }
	  {!isFetchingEvents && events.length === 0 &&
	   <h1>No events!</h1>
	  }
	</div>
      </Container>
    );
  }
}

AdminEvents.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  events: PropTypes.array,
  isFetchingEvents: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    isFetchingEvents: state.isFetchingEvents,
    user: state.user
  }
};

const mapDispatchToProps = dispatch => {
  return {};
}

export default withRouter(connect(
  mapStateToProps
)(AdminEvents));
