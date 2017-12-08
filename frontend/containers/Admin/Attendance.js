import React,{Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Container, Segment} from 'semantic-ui-react';

import {withRouter} from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import ErrorComponent from '../../components/ErrorComponent';
import LoadingIcon from '../../components/LoadingIcon';
import ECUserList from '../../components/ECUserList';
import ECSearchBarCard from '../../components/ECSearchBarCard';

import {fetchEvents, fetchUsers} from '../../actions/';

class AdminAttendance extends Component {
	constructor(props) {
		super(props);

		const { match, users, events, user, history } = this.props;

		if (user.role !== 'Volunteer' && user.role !== 'Admin') {
			history.goBack();
		}

		this.state = {
			event_id: match.params.id,
			users: users || [],
			hasAttemptedRefresh: false,
			loading: false,
			filter: ''
		};

		if (events && events.length > 0) {
			const event = events.filter(e => e._id === this.state.event_id);
			if (event && event.length === 1) {
				this.state.event = event[0];
			}
		}

		this.searchFilterUsers = this.searchFilterUsers.bind(this);
	}

	componentDidMount() {
		const {event_id} = this.state;
		const {fetchEvents, fetchUsers, events, users} = this.props;
		let event = events.filter(e => e._id === event_id);
		if (!event || event.length === 0) {
			this.setState({loading: true, hasAttemptedRefresh: true});
			fetchEvents();
		} else {
			this.setState({event: event[0]});
		}

		if (!users || users.length === 0) {
			this.setState({loading: true});
			fetchUsers();
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({loading: false});

		const {event_id} = this.state;
		const {events, users} = nextProps;

		if (events) {
			let event = events.filter(e => e._id === event_id);
			if (event && event.length === 1) {
				this.setState({events, event: event[0]});
			}
		}
		if (users) {
			this.setState({users});
		}
	}

	searchFilterUsers(filterString) {
		this.setState({filter: filterString});
	}

    render() {
		const { loading, event, users, hasAttemptedRefresh, filter } = this.state;
		if (event) {
	        return (
				<Container>
					<PageTitle title={event.name} showLoadingIcon link="admin/users/create" linkTitle="Register" />
					<ECSearchBarCard filterFunction={this.searchFilterUsers}/>
					<ECUserList event={event} users={users} filter={filter} />
				</Container>
	        );
		} else {
			if (!loading && hasAttemptedRefresh) {
				return (
					<ErrorComponent redir='#/events/' redirMsg='Return to all events' errMsg='404 - Event not Found'/>
				)
			} else {
				return (
					<LoadingIcon active />
				)
			}
		}
    }
}

const mapStateToProps = state => {
	return {
		user: state.user,
		users: state.users,
		events: state.events
	};
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchEvents: fetchEvents,
		fetchUsers: fetchUsers
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminAttendance));
