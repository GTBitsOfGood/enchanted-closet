import React from 'react'
import PropTypes from 'prop-types'

import { Loader } from 'semantic-ui-react'

const LoadingIcon = (props) => {
  const { text, active } = props
  return (
    <Loader {...props} inline='centered'>{text || 'Loading'}</Loader>
  )
}

export default LoadingIcon
