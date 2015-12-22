/** @jsx React.DOM */
"use strict";
var React = require('react')
var ReactDOM = require('react-dom')
var classNames = require('classnames')
var userClass = require('./user_class')
var treeStructure = require('./tree_structure')
var component = React.Component
var propTypes = React.PropTypes
var render = ReactDOM.render

var UserController = React.createClass({
	propTypes: {
			UserObj: propTypes.User.isRequired,
	},
	getDefaultProps: function(){
		return{
			UserObj : React.createElement(User)
		};
	},
	setNavBar: function(){
		if (UserObj.getEditAbility()) {
			return (
				<div>
					<p>{this.props.UserObj.props.username}</p>
				</div>
			);
		}
		else {
			return (
				<div>
					<input type="text"/>
					<input type="text"/>
					<button type="button">Login!</button>
				</div>
			);
		}
	},
	render: function(){
		return{

		};
	},
});
