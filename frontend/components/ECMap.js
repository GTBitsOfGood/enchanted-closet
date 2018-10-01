import React, { Component } from 'react'

import { Icon, Segment } from 'semantic-ui-react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const ECMap = props => {
  const { displayMapLocationError } = props
  if (displayMapLocationError) {
    return (
      <Segment>
        <div style={{ textAlign: 'center' }}>
          <Icon name='exclamation triangle'/>
          <h3>An error occurred loading that location</h3>
        </div>
      </Segment>
    )
  } else {
    return (
      <_ECMap
        lat={props.lat}
        long={props.long}
        isMarkerShown={props.isMarkerShown || false}
        loadingElement={<div style={{ height: `100%` }} />}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API}&v=3.exp&libraries=geometry,drawing,places`}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}/>
    )
  }
}

const _ECMap = withScriptjs(withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={props.zoom || 15}
      defaultCenter={{ lat: props.lat, lng: props.long }}
    >
      {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.long }} />}
    </GoogleMap>
  )
}))

export default ECMap
