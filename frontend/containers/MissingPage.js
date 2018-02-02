import React, { Component } from 'react';
import { Container, Card } from 'semantic-ui-react';
import { ErrorComponent } from '../components/';

const MissingPage = () => {
  return (
    <ErrorComponent
      message={errorMessage}
      redir='/'
      redirMsg='Home'
      errMsg='404 - Page Not Found'
    />
  );
}

const errorMessage = 'Oops, it looks like you stumbled onto a broken link or a missing page! Please try reloading the page, or return to the homepage.';

export default MissingPage;
