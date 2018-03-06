import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Icon, Grid, Button, Modal, Header, Popup, Container, Card } from 'semantic-ui-react';
import { COLORS } from '../../constants'
import moment from 'moment';

import { DashboardCard } from './'


class ParticipantDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { events = [] } = this.props.user;
    console.log(events);
    const data = {
      description: "Hello There"
    }

    const upcomingEvents = (events.map(event => (<Segment.Group>
            <Segment.Group horizontal>
              <Segment style={style.SegmentLeft}>
              <div style={style.header}>
                <Header as='h3' inverted>{event.name}</Header>
                </div>
                
              </Segment>
              <Segment style={style.SegmentRight}>
                <Container textAlign="right" style={{paddingRight: 10, paddingTop: 10}}>
                  <p>{pruneDescription(event._id)}</p>
                </Container>
              </Segment>
            </Segment.Group>
      </Segment.Group>)));

    return (
      <div>


    <Container style={ style.eventsContainer }>

    <h1 style={style.header} > Upcoming Events </h1>
    <div style={ style.overflowDiv }>
    { upcomingEvents }
    { upcomingEvents }
    { upcomingEvents }
    </div>

    </Container>

    <Container style={ style.eventsContainer }>

    <h1 style={style.header} > Past Events </h1>
    <div style={ style.overflowDiv }>
    { upcomingEvents }
    { upcomingEvents }
    { upcomingEvents }
    </div>
    
    </Container>

    <DashboardCard {...profilePage} />

      
      </div>
    );
  }
}

  const profilePage = {
    content: "Here is the link to your profile",
    title: "My Profile",
    url: "/profile"
  }

const style = {
  eventsContainer: {
    backgroundColor: COLORS.WHITE,
    marginTop: '1em',
    paddingBottom: '1em'

  },
  overflowDiv: {
    overflow: 'auto',
    height: '20em'
  },
  SegmentLeft: {
    backgroundColor: COLORS.BRAND,
    padding: '2em',
    paddingLeft: '2em'
  },
  whiteText: {
    color: COLORS.WHITE
  },
  SegmentRight: {
    backgroundColor: COLORS.WHITE
  },
  header: {
    padding: '0.5em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrap: {
    padding: '1em'
  }
}



const pruneDescription = (description) => {
  const cutoff = 20; // 20 words;
  const split = description.split(' ');
  if (split.length > cutoff) return `${split.splice(0, 20).join(' ')}...`;
  return description;
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantDashboard);
