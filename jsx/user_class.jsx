/** @jsx React.DOM */
"use strict";
var React = require('react')
var ReactDOM = require('react-dom')
var classNames = require('classnames')
var userControl = require('./user_control')
var treeStructure = require('./tree_structure')
var component = React.Component
var propTypes = React.PropTypes
var render = ReactDOM.render

var PageUser = React.createClass({
	propTypes: {
			pageusername: propTypes.string.isRequired,
	},
	getDefaultProps: function(){
		return {
			pageusername : 'Guest'
		};
	},
	getEditAbility: function(){
		if (pageusername != 'Guest') {
			return true;
		}
		else {
			return false;
		}
	},
	render: function(){
		return;
	}
})
