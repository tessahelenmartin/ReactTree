/** @jsx React.DOM */
"use strict";
var React = require('react')
var ReactDOM = require('react-dom')
var classNames = require('classnames')
var bubbleFile = require('./bubble_svg')
var component = React.Component
var propTypes = React.PropTypes
var render = ReactDOM.render


var reactTree = React.createClass({
	getInitialState: function(){
		return {
			data: {
				id : root
			}
		};
	},
	render: function(){
		return (
			<div className = {this.state.data[id]}></div>
			);
	}
})

var TreeNode = React.createClass({
	propTypes: {
			nodeId: propTypes.string.isRequired,
	},
	getDefaultProps: function(){
		var idIn = '1';
		if (this.parent != undefined) {
			idIn = this.props.parent
		};
		return {
			nodeId : idIn,
			commentText: "Comment Text"
		}
	},
	getInitialState: function(){
		return {
				numChildren : 0,
				value: 'Comment', //input box
				children: []
		}
	},
	addChild: function() {
		this.setState({numChildren: this.state.numChildren + 1});
		console.log(this.state.numChildren)
		var childNodeId = this.props.nodeId + '.' + (this.state.numChildren + 1);
		var childNodeCommentText = this.state.value;
		var childNode = React.createElement(TreeNode, {nodeId: childNodeId, commentText: childNodeCommentText})
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
		return (
			<div>
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
				<input type="text" value={this.state.value} onChange={this.handleChange}/>
				<button type="button" onClick={this.addChild}>add</button>
				</div>
				<div className="children">{childrenArray}</div>
			</div>
		);
	}
});

var TreeNodeFactory = React.createFactory(TreeNode);

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};


ReactDOM.render(
	React.createElement(TreeNode),
	document.getElementById('treeTest')
);


