import React from 'react'
import { connect } from 'react-redux'
import { Container, Image, Reveal } from 'semantic-ui-react'
import { UploadModal } from '../'

// User Pfp display/linker / lock if not admin - id of event
const EventImage = ({ imageUrl = 'defaultEventPicture.png', role, id }) => {
  let image = ''
  try {
    image = require(`../../../public/uploaded/events/${imageUrl}`)
  } catch (err) {
    image = require(`../../../public/uploaded/events/defaultEventPicture.png`)
  }
  if (role !== 'Admin') {
    return (
      <Image
        centered
        src={image}
        size='medium'
      />
    )
  } else {
    return (
      <UploadModal type="event" id={id}>
        <Image
          style={styles.imageStyle}
          centered
          src={image}
          size='medium'
        />
      </UploadModal>
    )
  }
}

const styles = {
  imageStyle: {
    cursor: 'pointer'
  }
}

const mapStateToProps = state => {
  return {
    role: state.user ? state.user.role : 'loggedOut'
  }
}

export default connect(mapStateToProps)(EventImage)
// TODO: Style
