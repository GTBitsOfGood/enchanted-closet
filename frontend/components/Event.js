import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Segment, Icon, Grid, Button, Modal, Header, Popup, Container } from 'semantic-ui-react';

import { deleteEvent } from '../actions';

import { uniqueId } from 'lodash';

import moment from 'moment';

import Clearfix from './Clearfix';
import {Edit} from './Buttons';

class Event extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, deleteEvent, history, user } = this.props;
    const link = `${data.showAdminControls ? '/admin' : ''}/events/${data._id}`;

    const adminAllowed = this.props.user &&
			 this.props.user.role === 'Admin';
    return (
      <div key={uniqueId('event_')} style={{paddingTop: 10, paddingBottom: 10}}>
        <div onClick={() => history.push(link)} style={{cursor:'pointer'}}>
          <Segment.Group key={uniqueId('event_')}>
            <Segment.Group horizontal>
              <Segment style={style.cardLeft}>
                <Header as='h3' inverted>{data.name}</Header>
                <Popup inverted
                       trigger={(
                           <Container style={style.whiteText}>
                             <Icon name='calendar'/>
                             {moment(new Date(data.datetime)).format('MMMM Do YYYY, h:mm a')}
                           </Container>
                       )}
                       content="Date"
                />
                <Popup inverted
                       trigger={(
                           <Container style={style.whiteText}>
                             <Icon name='road' inverted/>
                             {data.location}
                           </Container>
                       )}
                       content="Address"
                />
              </Segment>
              <Segment style={style.cardRight}>
                <Container textAlign="right" style={{paddingRight: 10, paddingTop: 10}}>
                  <p>{pruneDescription(data.description)}</p>
                </Container>
              </Segment>
            </Segment.Group>
            {data.showAdminControls && adminAllowed &&
             <Segment>
               <Clearfix>
                 <Button.Group floated='right'>
                   <Edit history={history} route={`admin/events/${data._id}/edit`}/>
                   <Modal
                     trigger={
                       <Button animated="vertical" color="red">
                         <Button.Content visible>Delete</Button.Content>
                         <Button.Content hidden>
                           <Icon name='trash' />
                         </Button.Content>
                       </Button>
                     }
                     header='Confirm Delete'
                     content='Are you sure you want to delete this event?'
                     actions={[
                       'Cancel',
                       { key: 'done', content: 'Delete', negative: true },
                     ]}
                     onActionClick={() => deleteEvent(data._id)}
                   />
                 </Button.Group>
               </Clearfix>
             </Segment>
            }
          </Segment.Group>
        </div>
      </div>
    )
  }
}

const pruneDescription = (description) => {
  const cutoff = 20; // 20 words;
  const split = description.split(' ');
  if (split.length > cutoff) return `${split.splice(0, 20).join(' ')}...`;
  return description;
}

const style = {
  cardLeft: {
    backgroundColor: '#733D9D',
    padding: '2em',
    paddingLeft: '2em'
  },
  whiteText: {
    color: '#FFFFFF'
  },
  cardRight: {
    backgroundColor: 'white'
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteEvent: deleteEvent
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
