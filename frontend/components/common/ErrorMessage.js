import React from 'react';
import { connect } from 'react-redux';
import { Container, Message } from 'semantic-ui-react';


const ErrorMessage = ( props ) => {
  const { errorMessage } = props

  if (errorMessage) {
    console.log(errorMessage);
    var res = errorMessage.split("^^^");
    var resHeader = res[0];
    var resContent = res[1];

    return (<Message style={ styles.wrap } error
        header= { resHeader }
        content= { resContent }
    />);

  } else {

    return <div></div>;

  }

}

const styles = {
  wrap: {
    marginTop: '1em'
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage
  };
};

export default connect(mapStateToProps)(ErrorMessage);
