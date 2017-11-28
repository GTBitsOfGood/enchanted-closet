import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {List, Checkbox} from 'semantic-ui-react';

import {markAttending, markUnattending} from '../actions/';

class ECUserListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			event: this.props.event,
			userID: this.props.user._id,
			attending: this.props.attending ? this.props.attending : false
		};
		this.attendanceUpdate = this.attendanceUpdate.bind(this);
	}

	attendanceUpdate(updateEvent, data) {
		const { markAttending, markUnattending } = this.props;
		const {event, userID} = this.state;
		this.setState({attending: !this.state.attending}, () => {
			console.log(`${this.state.userID} is now ${this.state.attending}`)
			if (this.state.attending) {
				markAttending(event._id, userID);
			} else {
				markUnattending(event._id, userID);
			}
		});
	}

	render() {
		const {user, filter} = this.props;
		const visible = 'block';
		const hidden = 'none';
		const filteredVisibility = user.name && user.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ? visible : hidden;
		return (
			<List.Item style={{display:filteredVisibility}} onClick={this.attendanceUpdate}>
				<List.Content>
					<List.Header><Checkbox onClick={() => {}} checked={this.state.attending} label={user.name}/></List.Header>
				</List.Content>
			</List.Item>
		)
	}
}

const mapStateToProps = state => {
	return {};
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		markAttending: markAttending,
		markUnattending: markUnattending
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ECUserListItem);
