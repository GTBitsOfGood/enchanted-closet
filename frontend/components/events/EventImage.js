import React from 'react';
import { connect } from 'react-redux';
import { Container, Image, Reveal } from 'semantic-ui-react'
import { UploadModal } from '../';

// User Pfp display/linker / lock if not admin - id of event
const EventImage = ({ imageUrl = "defaultEventPicture.png", role, id }) => {
  if (role !== 'Admin') 
    return (
      <Image
  centered     
  src={`/uploaded/events/${imageUrl}`}
  size='medium'
      />
    );
  else
    return (
      <UploadModal type="event" id={id}>
  <Image
    style={styles.imageStyle}
    centered  
    src={`/uploaded/events/${imageUrl}`}
    size='medium'
  />
      </UploadModal>
    );
}

const styles = {
  imageStyle: {
    cursor: 'pointer'
  }
}

const mapStateToProps = state => {
  return {
    role: state.user ? state.user.role : "loggedOut"
  }
}

export default connect(mapStateToProps)(EventImage);
// TODO: Style
