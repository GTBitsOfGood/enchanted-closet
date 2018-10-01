import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'

// GlobalDimmer that connects to store, dims screen when modal loading
const GlobalDimmer = ({ modalLoaderActive }) => (
  <Dimmer active={modalLoaderActive}>
    <Loader>Loading</Loader>
  </Dimmer>
)

const mapStateToProps = state => {
  return {
    modalLoaderActive: state.modalLoaderActive
  }
}
export default connect(mapStateToProps)(GlobalDimmer)
