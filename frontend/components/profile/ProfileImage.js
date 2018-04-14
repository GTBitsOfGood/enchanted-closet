import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react'

// User Pfp display/linker / TODO: 
const ProfileImage = ({ imageUrl }) => (
  <div>
    { imageUrl ?
      <Image
	src={`/uploaded/users/${imageUrl}`}
	as='a'
	size='medium'
	href='/uploadProfile'
      /> :
      <Image
        src='/uploaded/users/defaultUserPicture.jpg'
        as='a'
        size='medium'
        href='/uploadProfile'
      />
    }
  </div>
);

const mapStateToProps = state => {
  return {
    imageUrl: state.user ? state.user.image : ""
  }
}

export default connect(mapStateToProps)(ProfileImage);
// TODO: Style
