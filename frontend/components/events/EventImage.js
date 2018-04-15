import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react'

// User Pfp display/linker / lock if not admin
const EventImage = ({ imageUrl, lock }) => (
  <div>
    { imageUrl ?
      <Image
	src={`/uploaded/events/${imageUrl}`}
	as='a'
	size='medium'
	href='/events/upload'
      /> :
      <Image
        src='/uploaded/events/defaultEventPicture.png'
        as='a'
        size='medium'
        href='/events/upload'
      />
    }
  </div>
);

const mapStateToProps = state => {
  return {
    imageUrl: state.event ? state.event.image : ""
  }
}

export default connect(mapStateToProps)(EventImage);
// TODO: Style
