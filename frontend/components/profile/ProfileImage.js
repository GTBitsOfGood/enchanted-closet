import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react'

// User Pfp display/linker / TODO: 
const ProfileImage = ({ imageUrl = "defaultUserPicture.jpg" }) => (
  <Image
    src={`/uploaded/users/${imageUrl}`}
    as='a'
    size='medium'
    href='/uploadProfile'
  />
);
const mapStateToProps = (state, ownProps) => { // OwnProps todo for default
  return {
    imageUrl: state.user ? state.user.image : "defaultUserPicture.jpg"
  }
}

export default connect(mapStateToProps)(ProfileImage);
// TODO: Style
