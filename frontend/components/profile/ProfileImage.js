import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import { UploadModal } from '../';

// User Pfp display/linker 
const ProfileImage = ({ imageUrl = "defaultUserPicture.jpg" }) => (
  <UploadModal type="user">
    <Image
      style={styles.imageStyle}
      src={`/uploaded/users/${imageUrl}`}
      size='medium'
    />
  </UploadModal>
);

const styles = {
  imageStyle: {
    cursor: 'pointer'
  }
}

const mapStateToProps = (state, ownProps) => { // OwnProps todo for default
  return {
    imageUrl: state.user ? state.user.image : "defaultUserPicture.jpg"
  }
}

export default connect(mapStateToProps)(ProfileImage);
