import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Segment, Icon, Grid, Button, Modal } from 'semantic-ui-react';

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
    const { data, deleteEvent, history } = this.props;
    const link = `${data.showAdminControls ? '/admin' : ''}/events/${data._id}`;
    return (
        <div key={uniqueId('event_')} style={{paddingTop: 10, paddingBottom: 10}}>
            <div onClick={() => history.push(link)} style={{cursor:'pointer'}}>
                <Segment key={uniqueId('event_')}>
                    <h3>{data.name}</h3>
                    <p>{pruneDescription(data.description)}</p>
                    <p><Icon name='calendar'/>{moment(new Date(data.datetime)).format('MMMM Do YYYY, h:mm a')}</p>
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
