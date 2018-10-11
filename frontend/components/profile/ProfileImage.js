import React from 'react'
import { connect } from 'react-redux'
import { Image } from 'semantic-ui-react'
import { UploadModal } from '../'

// User Pfp display/linker
const ProfileImage = ({ imageUrl = 'defaultUserPicture.jpg' }) => {
  let image = ''
  try {
    image = require(`../../../public/uploaded/users/${imageUrl}`)
  } catch (err) {
    image = require(`../../../public/uploaded/users/defaultUserPicture.jpg`)
  }
  return (
    <UploadModal type="user">
      <Image
        style={styles.imageStyle}
        src={image}
        size='medium'
      />
    </UploadModal>
  )
}

const styles = {
  imageStyle: {
    cursor: 'pointer'
  }
}

const mapStateToProps = (state, ownProps) => { // OwnProps todo for default
  return {
    imageUrl: state.user ? state.user.image : 'defaultUserPicture.jpg'
  }
}

export default connect(mapStateToProps)(ProfileImage)
