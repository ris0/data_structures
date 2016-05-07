'use strict';
/* global Alist */
// An association list is a singly-linked list which adds to the head only,
// and whose nodes contain not just values but rather key-value pairs.
// It is a DS which very simply implements an Associative Array ADT.

describe('An association list', function(){

  var alist;
  beforeEach(function(){
    alist = new Alist();
  });

  it('can set a value for a key', function(){
    expect(alist.head).toBe(null);
    alist.set('color', 'brown');
    expect(alist.head).toEqual({
      key: 'color',
      value: 'brown',
      next: null
    });
  });

  it('can get a value for a key', function(){
    alist.set('color', 'blue');
    expect(alist.get('color')).toBe('blue');
  });

  it('can set multiple key-val pairs', function(){
    alist
    .set('color', 'white')
    .set('name', 'Saruman')
    .set('title', 'Lord of Isengard');
    expect(alist.head.key).toBe('title');
    expect(alist.head.value).toBe('Lord of Isengard');
    expect(alist.head.next.key).toBe('name');
    expect(alist.head.next.value).toBe('Saruman');
    expect(alist.head.next.next.key).toBe('color');
    expect(alist.head.next.next.value).toBe('white');
  });

  it('can get multiple vals by key', function(){
    alist
    .set('color', 'grey')
    .set('name', 'Gandalf')
    .set('nickname', 'Mithrandir');
    expect(alist.get('color')).toBe('grey');
    expect(alist.get('name')).toBe('Gandalf');
    expect(alist.get('nickname')).toBe('Mithrandir');
  });

  it('can set a new value for a key', function(){
    alist
    .set('color', 'grey')
    .set('name', 'Gandalf')
    .set('nickname', 'Mithrandir')
    .set('color', 'white') // setting color to a new value
    .set('race', 'Maia');
    expect(alist.get('color')).toBe('white');
  });

});
