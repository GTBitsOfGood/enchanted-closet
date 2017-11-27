import React,{Component} from 'react';

import {connect} from 'react-redux';

import LoadingIcon from './LoadingIcon';

import {Segment, List, Checkbox} from 'semantic-ui-react';

import ECUserListItem from './ECUserListItem';

class ECUserList extends Component {
	constructor(props) {
		super(props);
	}

    render() {
		const {users, event} = this.props;
        return (
			<Segment>
				{users &&
					<List selection verticalAlign='middle'>
						{users.map(user => {
							const attending = user.pastEvents.indexOf(event._id) > -1;
							return (<ECUserListItem attending={attending} event={event} key={user._id} user={user}/>);
						})}
					</List>
				}
				{!users &&
					<LoadingIcon active />
				}
			</Segment>
        );
    }
}

export default ECUserList;
