/** @jsx React.DOM */
"use strict";
var ReactDOM = require('react-dom')

class Circle extends React.Component {

  render() {
      return (
        <svg {...this.props}>
              <circle cx="50" cy="50" r="25" />
        </svg>
      )
  }
}

function newCircle(){
  return <Circle width="100" height="100" />
}

module.exports = {
  Circle,
  newCircle
}