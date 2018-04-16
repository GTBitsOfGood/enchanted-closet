import React,{ Component } from 'react';
import { connect } from 'react-redux';

import { LoadingIcon } from './';

import { Container, List } from 'semantic-ui-react';

import ECUserListItem from './ECUserListItem';

const ECUserList = ( props ) => {
  const {users, event, filter} = props;

  return (
    <div>
      {users ?
       <List selection verticalAlign='middle'>
	 {users.length != 0 ? users.map(user => {
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
	 }) : (
	    <Container>
	      ~ Nobody here  ~
	    </Container>
	 )}
       </List>
       : <LoadingIcon active />}
    </div>
  );
}

const styles = {
  "listWrap": {
  }
}


export default ECUserList;
