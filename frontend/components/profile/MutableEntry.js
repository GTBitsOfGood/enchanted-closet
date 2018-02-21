import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { startCase } from 'lodash'

const MutableEntry = ( { label, locked, value, onChange } ) => {
  const content = (
    <span contentEditable={!locked}
	  onInput={onChange}
	  suppressContentEditableWarning={true}
    >
      {value ? value : "No data found. (Fill me in!)"}
    </span>
  );
  
  return (
    <div style={styles.main}>
      {startCase(label)}: {content}
    </div>
  );
}

const styles = {
  main: {
    padding: "2px"
  }
}

export default MutableEntry
