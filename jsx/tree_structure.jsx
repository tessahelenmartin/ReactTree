/** @jsx React.DOM */
"use strict";
var React = require('react')
var ReactDOM = require('react-dom')
var classNames = require('classnames')
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
			commentText: "Let's talk about React.",
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
		var childNode = React.createElement(TreeNode, {nodeId: childNodeId, commentText: childNodeCommentText, BGBlueValue: childNodeBGBlueValue})
		this.state.children.push(childNode);
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
			marginTop: '2vh',
		};
		var inputStyle = {
			borderRadius: '1vh',
			borderStyle: 'solid',
			boxShadow: 'none',
			width: '60vw',
			height: '2vh',
			padding: '1vh',
			marginRight: '2vh',
		};
		return (
			<div className="commentDiv" style={divStyle}>
				<div>
					<p>
						Comment Number: {this.props.nodeId}, Number of Children: {this.state.numChildren}
					</p>
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


