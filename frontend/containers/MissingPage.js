import React from 'react'
import { GenericBanner } from '../components/'

const MissingPage = () => {
  return (
    <GenericBanner
      header="404 - Page Not Found"
      message={errorMessage}
      redir='/'
      redirMsg='Home'
    />
  )
}

const errorMessage = 'Oops, it looks like you stumbled onto a broken link or a missing page! Please try reloading the page, or return to the homepage.'

export default MissingPage
