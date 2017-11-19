import React, { Component } from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const ECMap = props => {
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
};

const _ECMap = withScriptjs(withGoogleMap(props => {
	return (
	<GoogleMap
		defaultZoom={props.zoom || 15}
		defaultCenter={{ lat: props.lat, lng: props.long }}
	>
		{props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.long }} />}
	</GoogleMap>
	);
}))

export default ECMap;
