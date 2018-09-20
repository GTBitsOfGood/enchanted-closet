import React, { Component } from 'react';
import { Segment, List } from 'semantic-ui-react';

const ECContactCard = ( props ) => {
  const {user} = props;

  const contactFields = ['email', 'phone'];

  return (
    <Segment>
      <h3>Contact Information</h3>
      <List >
  {contactFields.map(d => {
     return (
       <List.Item key={d}>
         <List.Content>
     <b>{`${d.charAt(0).toUpperCase()}${d.substr(1)}`}: </b>{nullCheck(user[d.toLowerCase()])}
         </List.Content>
       </List.Item>
     )
  })}
      </List>
    </Segment>
  )
}

const nullCheck = (data) => {
  return data ? data : (<i>&lt;Unknown&gt;</i>);
}

export default ECContactCard;
