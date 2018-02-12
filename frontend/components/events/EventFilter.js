import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Segment } from 'semantic-ui-react'
import { EventBody } from './'

/* EventFilter: Higher Order Component that wraps EventBody with
 *              filter function.              
**/
class EventFilter extends Component {
  constructor( props ) {
    super(props)
    this.state = {
      filterBy: "name",
      query: ""
    }
  }

  render() {
    const { query, filterBy } = this.state
    
    const filter = ( event ) => true
    return (
      <div>
	<Segment> Custom Addends </Segment>
	{ this.props.children }
      </div>
    );
  }
    
}

export default EventFilter;
