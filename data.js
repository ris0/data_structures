'use strict';
/*
Fill in your own code where you see "your code here".
You can insert new lines at those locations, but you
will not need to edit the lines above and below them.
*/

//-----------------------------------------
// Stacks

function Stack () {
  this.data = [];
}

Stack.prototype.add = function (item) {
  this.data.push(item);
  return this;
};

Stack.prototype.remove = function () {
  return this.data.pop();
};

//-----------------------------------------
// Queues

function Queue () {
  this.data = [];
}

Queue.prototype.add = function (item) {
  this.data.push(item);
  return this;
};

Queue.prototype.remove = function () {
  return this.data.shift();
};

//-----------------------------------------
// Linked lists

function LinkedList () {
  this.head = null;
  this.tail = null;
}

function ListNode (item, prev, next) {
  this.item = item;
  this.next = next || null;
  this.prev = prev || null;
}

LinkedList.prototype.addToTail = function (item) {
  var newListNode = new ListNode(item, this.tail);
  (this.tail) ? this.tail.next = newListNode : this.head = newListNode;
  this.tail = newListNode;
  return this;
};

LinkedList.prototype.removeFromTail = function () {
  if (!this.head) return; // if !head, escape out
  var item = this.tail.item; // save the new value of tail; to be returned later
  this.tail = this.tail.prev; // point in the right direction
  
  // if this.tail exists, this.tail.next = null else this.head = null
  (this.tail) ? this.tail.next = null : this.head = null;
  // pew pew
  return item;  
};

LinkedList.prototype.forEach = function (iterator) {
  var node = this.head;
  while(node){
    if (iterator(node.item)) return node.item;
    node = node.next;
  }
};

//-----------------------------------------
// Association lists

function Alist () {
  this.head = null;
}

function AlistNode (key, value, next) {
  this.key = key;
  this.value = value;
  this.next = next || null;
}

Alist.prototype.set = function (key, value) {
  // set key-val pair to head
  var newNode = new AlistNode(key, value);

  (!this.head) ? this.head = newNode : newNode.next = this.head, this.head = newNode;

  return this;
};

Alist.prototype.get = function (key) {
  var current = this.head;
  
  while (current) {
    if (current.key === key) return current.value;
    else current = current.next;
  }

};


//-----------------------------------------
// Hash tables

function hash (key) {
  var hashedKey = 0;
  for (var i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i);
  }
  return hashedKey % 20;
}

function HashTable () {
  this.buckets = Array(20);
  // array-holes - why forEach and map won't iterate over undefined elements - read more!
  for (var i = 0; i < this.buckets.length; i++) {
    this.buckets[i] = new Alist();
  }

}

HashTable.prototype.set = function (key, value) {
  // Object.prototype.method should only be used when we lose that instance to work with
  // var current is an array of objects, of which, are instances of Alist, thus allowing us to access
  // the method that we need to complete this problem.
  var index = hash(key),
      current = this.buckets[index];

  current = current.set(key, value);
  return this;
};

HashTable.prototype.get = function (key) {
  var index = hash(key);
  return this.buckets[index].get(key);
};

//-----------------------------------------
// Binary search trees

function BinarySearchTree (val) {
  this.value = val;
}

BinarySearchTree.prototype.insert = function (val) {
  var direction = val < this.value ? 'left' : 'right';
  
  if (!this[direction]) {
    this[direction] = new BinarySearchTree(val);
  } else {
    this[direction].insert(val);
  }
  return this;
};

BinarySearchTree.prototype.min = function () {

  var currentNode = this;
  
  while (currentNode.left) {
    currentNode = currentNode.left;
  }
  return currentNode.value;

  // if (!this.left) {
  //   return this.value
  // } else {
  //   return this.left.min();
  // }


};

BinarySearchTree.prototype.max = function () {
  var currentNode = this;
  
  while (currentNode.right) {
    currentNode = currentNode.right;
  }
  return currentNode.value;

};

BinarySearchTree.prototype.contains = function (val) {
  if (this.value === val) return true;
  var direction = val < this.value ? 'left' : 'right';
  
  if (this[direction]) return this[direction].contains(val);
  else return false;
};

BinarySearchTree.prototype.traverse = function (iterator) {
  if (this.left) this.left.traverse(iterator);
  iterator(this.value);
  if (this.right) this.right.traverse(iterator);
};
