/** @jsx React.DOM */
"use strict";
var React = require('react')
var ReactDOM = require('react-dom')
var classNames = require('classnames')
var userClass = require('./user_class')
var treeStructure = require('./tree_structure')
var component = React.Component
var render = ReactDOM.render

var UserController = React.createClass({
	getDefaultProps: function(){
		return{
			UserObj : new userClass.PageUser
		};
	},
	setNavBar: function(){
		if (UserObj.getEditAbility()) {
			return (
				<div>
					<p>{this.props.UserObj.props.pageusername}</p>
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
	}
})

