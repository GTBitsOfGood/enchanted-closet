import React, { Component } from 'react'
import { Segment, List, Icon } from 'semantic-ui-react'

const ECEmergencyContactCard = (props) => {
  const { user } = props

  if (!hasECData(user)) {
    return (
      <Segment color='red'>
        <h3>Emergency Contact</h3>
        <p><Icon name="triangle exclamation"/> There is no Emergency Contact data associated with this individual</p>
      </Segment>
    )
  } else {
    const emergencyFields = ['Name', 'Phone', 'Relation']
    return (
      <Segment>
        <h3>Emergency Contact</h3>
        <List >
          {emergencyFields.map(d => {
            return (
              <List.Item key={d}>
                <List.Content>
                  <b>{d}: </b>{nullCheck(user[`emergencyContact${d}`])}
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </Segment>
    )
  }
}

const hasECData = (user) => {
  return user.emergencyContactName || user.emergencyContactPhone || user.emergencyContactRelation
}

const nullCheck = (data) => {
  return data || (<i>&lt;Unknown&gt;</i>)
}

export default ECEmergencyContactCard
