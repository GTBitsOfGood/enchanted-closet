import React,{ Component } from 'react';
import { connect } from 'react-redux';

import { LoadingIcon } from './';

import { Segment, List } from 'semantic-ui-react';

import ECUserListItem from './ECUserListItem';

const ECUserList = ( props ) => {
  const {users, event, filter} = props;
<<<<<<< HEAD

=======
  
>>>>>>> 74dce4f437961feb1575c17b1d9e2c4db635fd97
  return (
    <Segment>
      {users ?
       <List selection verticalAlign='middle'>
	 {users.map(user => {
	    const isAttending = user.role === 'Volunteer' ?
				event.volunteersAttended.filter(v => v === user._id).length === 1 :
				event.participantsAttended.filter(p => p === user._id).length === 1;
	    return (
	      <ECUserListItem
		initAttending={isAttending}
		event={event}
		key={user._id}
		user={user}
		filter={filter}
	      />);
	 })}
       </List>
       : <LoadingIcon active />}
    </Segment>
  );
}

const styles = {
  "listWrap": {
  }
}


export default ECUserList;
