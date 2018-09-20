import React from 'react'
import PropTypes from 'prop-types'
// import { Row, Col } from 'elemental';
import { Grid } from 'semantic-ui-react'

const Frame = (props) => {
  let retBlock = (
    <Grid.Row>
      <Grid.Column width={1}/>
      <Grid.Column width={10}>
        {props.data}
      </Grid.Column>
      <Grid.Column width={1}/>
    </Grid.Row>
  )
  return retBlock
}

export default Frame
