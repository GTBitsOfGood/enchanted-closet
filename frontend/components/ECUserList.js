import React,{Component} from 'react';
import {connect} from 'react-redux';

import { LoadingIcon } from './';

import {Segment, List, Checkbox} from 'semantic-ui-react';

import ECUserListItem from './ECUserListItem';

const ECUserList = ( props ) => {
  const {users, event, filter} = props;
  console.log('user list');
  console.log(users);
  return (
    <Segment>
      {users &&
       <List selection verticalAlign='middle'>
	 {users.map(user => {
<<<<<<< HEAD
	    //const attending = user.pastEvents.filter(e => e._id === event._id).length === 1;
=======
	    const attending = user.events.filter(e => e._id === event._id).length === 1;
>>>>>>> 75c00bd08b8c10abb30973f59599bdb3ef25a346
	    return (<ECUserListItem
		  //    attending={attending}
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
