import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, Checkbox } from 'semantic-ui-react';

import { markAttending, markUnattending } from '../actions/';

class ECUserListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attending: this.props.initAttending
    };
    this.attendanceUpdate = this.attendanceUpdate.bind(this);
  }
  
  attendanceUpdate(updateEvent, data) {
    const { markAttending, markUnattending, event, user } = this.props;
    const isAttending = user.role === 'Volunteer' ?
			event.volunteersAttended.filter(v => v._id === user._id).length === 1 :
			event.participantsAttended.filter(p => p._id === user._id).length === 1; // only optimistic updates :)
    this.setState({attending: !this.state.attending}, () => {
      if (this.state.attending) {
	markAttending(event, user);
      } else {
	markUnattending(event, user);
      }
      
    });
  }

  render() {
    const { user, event, filter } = this.props;
    const name = user.firstName + " " + user.lastName;
    const visible = 'block';
    const hidden = 'none';
    const filteredVisibility = name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ? visible : hidden;
    const isAttending = user.role === 'Volunteer' ?
			event.volunteersAttended.filter(v => v._id === user._id).length === 1 :
			event.participantsAttended.filter(p => p._id === user._id).length === 1;
    return (
      <List.Item style={{display:filteredVisibility}} onClick={this.attendanceUpdate}>
	<List.Content>
	  <List.Header><Checkbox checked={this.state.attending} label={name}/></List.Header>
	</List.Content>
	
      </List.Item>
    )
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    markAttending: markAttending,
    markUnattending: markUnattending
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ECUserListItem);
