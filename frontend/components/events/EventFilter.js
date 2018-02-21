import React, { Component } from 'react'
import { Button, Container, Icon, Dimmer, Segment, Header, Input, Loader } from 'semantic-ui-react';

class EventFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      filters: {'name': true, 'location': false}
    }
  }

  changeQuery = (event) => {
    this.setState({query: event.target.value});
  }

  changeFilter = (data) => {
    let filt  = this.state.filters;
    filts[data.label] = !filts[data.label];
    this.setState({filters: filts});
  }
  
  render() {
    return (
      <Input
      placeholder = 'Search'
      type = 'text'
      size = 'big'
      disabled = {!this.state.filters['Name'] && !this.state.filters['Location']}
      onChange={
	(e, data) => this.changeQuery(e)
      }/> 

      <Segment textAlign='left' vertical>
      <Header as="l1">Search By:</Header>
      </Segment>
      <Segment textAlign='left' vertical >
      <Button
      active = {this.state.filters['Name']}
      label = 'Name'
      labelPosition = 'left'
      size = 'small'
      toggle
      onClick={
	(e, data) => this.changeFilter(data)
      }/>
      <Button
      active = {this.state.filters['Location']}
      label = 'Location'
      labelPosition = 'left'
      size = 'small'
      toggle
      onClick={
	(e, data) => this.changeFilter(data)
      }/>
      </Segment>
      
      { processedEvents.length > 0 && 
	<EventTab query = {this.state.query} filterBy = {this.state.filters} events = {processedEvents} isLoading = {isFetchingEvents} />
      }
    );
  }
}

export default EventFilter
