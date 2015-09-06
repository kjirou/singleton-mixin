# singleton-mixin

[![npm version](https://badge.fury.io/js/singleton-mixin.svg)](http://badge.fury.io/js/singleton-mixin)
[![Build Status](https://travis-ci.org/kjirou/singleton-mixin.svg?branch=master)](https://travis-ci.org/kjirou/singleton-mixin)

Attach singleton-pattern by Mix-in


## Installation

```
npm install --save singleton-mixin
```


## Example

```
var SingletonMixin = require('singleton-mixin');

function Foo() {
}

// Or, Object.assign, lodash.assign, etc
var objectAssign = require('object-assign');
objectAssign(Foo, SingletonMixin);


var foo = Foo.getInstance();
var foo2 = Foo.getInstance();
console.log(foo === foo2);  // -> true
var foo3 = new Foo();
console.log(foo === foo3);  // -> false

Foo.clearInstance();

var foo4 = Foo.getInstance();  // Created second instance
console.log(foo4 === foo);  // -> false
```
