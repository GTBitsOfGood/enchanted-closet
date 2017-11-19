import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Segment, Icon, Grid, Button, Modal } from 'semantic-ui-react';

import { deleteEvent } from '../actions';

import { uniqueId } from 'lodash';

import Clearfix from './Clearfix';
import {Edit} from './Buttons';

class Event extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, deleteEvent, history } = this.props; 

    return (
        <Segment key={uniqueId('event_')}>
            <h3>{data.name}</h3>
            <p>{data.description}</p>
            <p><Icon name='calendar'/>{data.datetime}</p>
            <p><Icon name='road'/>{data.location}</p>
            {data.showAdminControls &&
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
            }
        </Segment>
    )
  }
}

const mapStateToProps = (state) => {
    return {
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