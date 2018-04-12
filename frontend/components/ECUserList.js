import React,{Component} from 'react';
import {connect} from 'react-redux';

import { LoadingIcon } from './';

import {Segment, List, Checkbox} from 'semantic-ui-react';

import ECUserListItem from './ECUserListItem';

const ECUserList = ( props ) => {
  const {users, event, filter} = props;
  return (
    <Segment>
      {users &&
       <List selection verticalAlign='middle'>
	 {users.map(user => {
	 	const attending = event.participantsAttended.filter(u => u === user._id).length === 1;
	    return (<ECUserListItem
		      attending={attending}
		      event={event}
		      key={user._id}
		      user={user}
		      filter={filter}
	    />);
	 })}
       </List>
      }
      {!users && <LoadingIcon active />}
    </Segment>
  );
}

export default ECUserList;
