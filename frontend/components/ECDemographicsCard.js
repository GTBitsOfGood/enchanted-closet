import React, { Component } from 'react'
import { Segment, List, Icon } from 'semantic-ui-react'
import { capitalize, camelCase } from 'lodash'
import moment from 'moment'

const demographicsFields = ['grade', 'birthday', 'race', 'school', 'leader', 'tshirt']

const ECDemographicsCard = (props) => {
  let { user } = props

  if (hasAtLeastOneDemographic(user)) {
    if (user.birthday) user.birthday = moment(user.birthday).format('MMMM Do, YYYY')
    return (
      <Segment>
        <h3>Demographics</h3>
        <List >
          {demographicsFields.map(d => {
            const value = user[camelCase(d)] ? user[camelCase(d)] : <i>&lt;Unknown&gt;</i>
            return (
              <List.Item key={d}>
                <List.Content>
                  <b>{capitalize(d)}: </b>{value}
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </Segment>
    )
  } else {
    return (
      <Segment>
        <h3>Demographics</h3>
        <p><Icon name="triangle exclamation"/> There is no demographic data associated with this user</p>
      </Segment>
    )
  }
}

const hasAtLeastOneDemographic = user => {
  let hasOne = false
  demographicsFields.forEach(e => {
    if (user[e]) hasOne = true
  })
  return hasOne
}

export default ECDemographicsCard
