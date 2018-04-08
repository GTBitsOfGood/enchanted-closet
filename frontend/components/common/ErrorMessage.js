import React from 'react';
import { Container, Message } from 'semantic-ui-react';


const ErrorMessage = ( props ) => {
  const { header, content } = props
  return (
    <Message style={ styles.wrap } error
		    header={ header }
		    content={ content }
	  />
  );
}

const styles = {
  wrap: {
    marginTop: '1em'
  }
}

export default ErrorMessage;
