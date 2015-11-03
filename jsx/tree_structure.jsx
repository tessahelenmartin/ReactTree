/** @jsx React.DOM */
"use strict";
var React = require('react')
var ReactDOM = require('react-dom')
var bubbleClass = require('./bubble_svg')

var Queue = React.createClass({
	getDefaultProps: function(){
		return {_oldestIndex: 1},{_newestIndex: 1},{_storage: {}};
	},
	statics: {
		size: function(){
			return this._newestIndex - this._oldestIndex;
		},

		enqueue: function(data){
			if (data) {
				this._storage[this._newestIndex] = data;
				this._newestIndex++;
			};
		},

		dequeue: function(){
			var oldestIndex = this._oldestIndex,
				newestIndex = this.newestIndex,
				deletedData;

			if (oldestIndex !== newestIndex) {
				deletedData = this._storage[oldestIndex];
				delete this._storage[oldestIndex];
				this._oldestIndex++;
				return deletedData;
			};
		},
	},
	render: function(){
		return <Queue _oldestIndex={this.props._oldestIndex} _newestIndex={this.props._newestIndex} _storage={this.props._storage} />;
	}
});

/*function Queue() {
	this._oldestIndex = 1;
	this._newestIndex = 1;
	this._storage = {};
}

Queue.prototype.size = function() {
	return this._newestIndex - this._oldestIndex;
}

Queue.prototype.enqueue = function(data){
	this._storage[this._newestIndex] = data
	this._newestIndex++;
}

Queue.prototype.dequeue = function(){
	var oldestIndex = this._oldestIndex,
		newestIndex = this.newestIndex,
		deletedData;

	if (oldestIndex !== newestIndex) {
		deletedData = this._storage[oldestIndex];
		delete this._storage[oldestIndex];
		this._oldestIndex++;
		return deletedData;
	};
}*/

var Node = React.createClass({
	getDefaultProps: function(){
		return {data: 1},{parent: null},{children: []};
	},
	Node: function(data){
		return {data: 1};
	},
	render: function(){
		return <Node data={this.props.data} parent={this.props.parent} children={this.props.children} />;
	}
});

/*
function Node(data) { //holds 3 properties
	this.data = data;
	this.parent = null;
	this.children = [];
	this.circle = new bubbleClass.newCircle;
};
*/

var Tree = React.createClass({
	getDefaultProps: function(){
		var node = React.createElement(Node);
		return {_root: node};
	},
	Node: function(data){
		var node = React.createElement(Node(data));
		return {_root: node};
	},
	statics: {
		trav_DepthFirst: function(callback){
			(function recursion(currentNode) {
				for (var i = 0, length = currentNode.children.length; i < length; i++)
					recursion(currentNode.children[i]);
				callback(currentNode);
			})(this._root);
		},
		trav_BreadthFirst: function(callback){
			var queue = React.createElement(Queue);
			queue.Queue.enqueue(this._root);

			var currentTree = queue.dequeue();
			while(currentTree){
				for(var i = 0, length = currentTree.children.length; i < length; i++)
					queue.enqueue(currentTree.children[i]);
			callback(currentTree);
			currentTree = queue.dequeue();
			}
		},
		contains: function(callback, traversal){
			traversal.call(this, callback);
		},
		addChild: function(toData, traversal){
			var child = new Node(null),
				parent = null,
				callback = function(node) {
					if (node.data == toData) {
						parent = node;
					};
				};

			this.contains(callback,traversal);

			if (parent) {
				parent.children.push(child);
				child.parent = parent;
				child.data = toData + '.' + parent.children.length;
			}
			else{
				throw new Error('Node must have existing parent');
			}
		}
	},
	render: function(){
		return <Tree _root={this.props._root}/>;
	}
});




/*function Tree(data){
	var node = new Node(data); //creates new instance of Node
	this._root = node; //makes node the root of a tree
};

Tree.prototype.trav_DepthFirst = function(callback){
	(function recursion(currentNode) {
		for (var i = 0, length = currentNode.children.length; i < length; i++)
			recursion(currentNode.children[i]);
		callback(currentNode);
	})(this._root);
};

Tree.prototype.trav_BreadthFirst = function(callback){
	var queue = React.createElement(Queue);
	queue.Queue.enqueue(this._root);

	var currentTree = queue.dequeue();
	while(currentTree){
		for(var i = 0, length = currentTree.children.length; i < length; i++)
			queue.enqueue(currentTree.children[i]);
	callback(currentTree);
	currentTree = queue.dequeue();
	}
};

Tree.prototype.contains = function(callback, traversal){
	traversal.call(this, callback);
}

Tree.prototype.addChild = function(toData, traversal){
	var child = new Node(null),
		parent = null,
		callback = function(node) {
			if (node.data == toData) {
				parent = node;
			};
		};

	this.contains(callback,traversal);

	if (parent) {
		parent.children.push(child);
		child.parent = parent;
		child.data = toData + '.' + parent.children.length;
	}
	else{
		throw new Error('Node must have existing parent');
	}
};

/*Tree.prototype.display = function(traversal){
	var callback = function(node) {
			ReactDOM.render(node.circle, document.getElementById('circles'));
			return true;
		};
	this.contains(callback,traversal);
	
}*/

var tree = new Tree();

tree.addChild(1,tree.trav_BreadthFirst);

tree.addChild(1,tree.trav_BreadthFirst);

tree.addChild(1,tree.trav_BreadthFirst);

tree.addChild(1.1,tree.trav_BreadthFirst);

tree.addChild(1.2,tree.trav_BreadthFirst);

tree.addChild(1.3,tree.trav_BreadthFirst);

tree.trav_BreadthFirst(function(node){
	console.log(node.data)
});

/*tree.display(tree.trav_BreadthFirst);*/




