import React, { Component } from 'react'
import { Input, Label } from 'semantic-ui-react'
import { startCase } from 'lodash'

const MutableEntry = ( props ) => {
  const { isLegal, label, value = "", initialValue = "", onChange, ...other } = props;
  const hasNewInfo = value !== initialValue; // Do something more pleasing with this

  // do something with status  
  
  const content = (
    <Input
      label={startCase(label)}
      transparent
      onChange={onChange}
      placeholder={initialValue ? initialValue : "No data found. (Fill me in!)"}
      value={value}
      {...other}
    />
  );
  return (
    <div style={styles.main}>
      {hasNewInfo && "!"} | {!isLegal && "Improper format"}
      {content}
    </div>    
  );
}

const styles = {
  main: {
    padding: "2px"
  }
}

export default MutableEntry;
