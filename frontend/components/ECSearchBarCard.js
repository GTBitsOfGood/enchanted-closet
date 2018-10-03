import React, { Component } from 'react'

import { Segment, Input, Icon } from 'semantic-ui-react'

export default class ECSearchBarCard extends Component {
  constructor (props) {
    super(props)
    if (!this.props.filterFunction) {
      throw new Error('`filterFunction` is a required prop')
    }
    this.state = {
      filterFunction: this.props.filterFunction
    }
    this.inputChange = this.inputChange.bind(this)
  }

  inputChange (event, data) {
    const { filterFunction } = this.state
    return filterFunction(data.value)
  }

  render () {
    return (
      <Segment>
        <Input fluid onChange={this.inputChange} iconPosition='left' icon={<Icon name='search' inverted circular link/>} placeholder=' Search Attendees...'/>
      </Segment>
    )
  }
}
