'use strict';
import React from 'react';

export default class Clearfix extends React.Component {
  render() {
    const beforeStyle = {
      display: 'table'
    };

    const afterStyle = {
      display: 'table',
      clear: 'both'
    };

    return (
      <div {...this.props}>
          <div style={beforeStyle}/>
          {this.props.children}
          <div style={afterStyle}/>
      </div>
    );
  }
}
