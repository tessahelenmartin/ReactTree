/** @jsx React.DOM */
"use strict";
var ReactDOM = require('react-dom')

    class Circle extends React.Component {

      render() {
        return <svg {...this.props}>
              <circle cx="50" cy="50" r="25" />;
        </svg>;
      }
    }

function newCircle(){
  return <Circle width="600" height="400" />;
}

var circle1 = new newCircle;

ReactDOM.render(circle1, document.getElementById('circles'));