/** @jsx React.DOM */
"use strict";
var React = require('react')
var ReactDOM = require('react-dom')
var classNames = require('classnames')
var userClass = require('./user_class')
var userControl = require('./user_control')
var bubbleFile = require('./bubble_svg')
var component = React.Component
var propTypes = React.PropTypes
var render = ReactDOM.render


var ReactTree = React.createClass({
	getDefaultProps: function(){
		return {
			id : 'root'
		};
	},
	render: function(){
		return (
			<div className = {this.props.id}></div>
			);
	}
})

var TreeNode = React.createClass({
	propTypes: {
			nodeId: propTypes.string.isRequired,
	},
	getDefaultProps: function(){
		var idIn = '1';
		var BGBlueValueIn = 100;
		if (this.parent != undefined) {
			idIn = this.props.parent;
			BGBlueValueIn = this.props.parent;
		};
		return {
			nodeId : idIn,
			commentText: "Comment Text",
			BGBlueValue: BGBlueValueIn
		}
	},
	getInitialState: function(){
		return {
				numChildren : 0,
				value: 'Share your thoughts!', //input box
				children: []
		}
	},
	addChild: function() {
		this.setState({numChildren: this.state.numChildren + 1});
		console.log(this.state.numChildren)
		var childNodeId = this.props.nodeId + '.' + (this.state.numChildren + 1);
		var childNodeCommentText = this.state.value;
		var childNodeBGBlueValue = this.props.BGBlueValue + 25;
		if (childNodeBGBlueValue > 255) {childNodeBGBlueValue = 255};
		console.log(childNodeBGBlueValue)
		var childNode = React.createElement(TreeNode, {nodeId: childNodeId, commentText: childNodeCommentText, BGBlueValue: childNodeBGBlueValue})
		console.log(childNode.props.nodeId)
		this.state.children.push(childNode);
		console.log(this.props.nodeId)
	},
	handleChange: function(event) {
		this.setState({value: event.target.value});
	},
	render: function(){
		var childrenArray = React.Children.toArray(this.state.children);
		var bubble = new bubbleFile.newCircle;
		var divStyle = {
		  backgroundColor: 'rgba(0,100,'+this.props.BGBlueValue+',.1)',
		  borderRadius: '5vh',
		  marginBottom: '2%',
		};
		var inputStyle = {
			borderRadius: '1vh',
			borderColor: 'rgba(247,191,191,1)',
			borderStyle: 'solid',
			boxShadow: 'none',
			borderWidth: '1vh',
			height: '5vh',
			fontFamily: 'Arial, Helvetica, sans-serif',
			color: 'rgba(222,171,171,1)',
			backgroundColor: 'rgba(252,229,229,1)',
		};
		return (
			<div style={divStyle}>
				{bubble}
				<div>
					<p>
						ID: {this.props.nodeId}, CHILDREN: {this.state.numChildren}
					</p>
				</div>
				<div>
					<p>
						{this.props.commentText}
					</p>
				</div>
				<div>
				<input type="text" value={this.state.value} style={inputStyle} onChange={this.handleChange}/>
				<button type="button" onClick={this.addChild}>Comment</button>
				</div>
				<div className="children">{childrenArray}</div>
			</div>
		);
	}
});

var TreeNodeFactory = React.createFactory(TreeNode);

ReactDOM.render(
	React.createElement(TreeNode),
	document.getElementById('treeTest')
);


