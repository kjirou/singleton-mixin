var assert = require('assert');
var objectAssign = require('object-assign');
var util = require('util');

var SingletonMixin = require('../index');


describe('singleton-mixin module', function() {

  it('getInstance, clearInstance', function() {
    var Foo = function() {};
    objectAssign(Foo, SingletonMixin);
    var foo = Foo.getInstance();
    var foo2 = Foo.getInstance();
    var foo3 = new Foo();
    assert(foo instanceof Foo);
    assert.strictEqual(foo, foo2);
    assert.notStrictEqual(foo, foo3);

    Foo.clearInstance();
    assert.strictEqual(Foo._instance, null);

    var foo4 = Foo.getInstance();
    var foo5 = Foo.getInstance();
    assert(foo4 instanceof Foo);
    assert.strictEqual(foo4, foo5);
    assert.notStrictEqual(foo, foo4);
  });

  it('destructInstance hook', function() {
    var Foo = function() {};
    Foo.x = 10;
    objectAssign(Foo, SingletonMixin, {
      destructInstance: function() {
        this.x = 1;
      }
    });

    assert.strictEqual(Foo.x, 10);
    Foo.getInstance();
    assert.strictEqual(Foo.x, 10);
    Foo.clearInstance();
    assert.strictEqual(Foo.x, 1);
  });

  it('should pass arguments to constructor via getInstance', function() {
    var Foo = function(x, y) {
      this.z = x * y;
    };
    objectAssign(Foo, SingletonMixin);

    var foo = new Foo(2, 3);
    assert.strictEqual(foo.z, 6);
  });

  it('should use sub classes by util.inherits', function() {

    var Foo = function(x, y) {
      this._x = x;
      this._y = y;
    };

    var Bar = function(x, y, z) {
      Foo.apply(this, [x, y]);
      this._z = z;
      this.compute = function() {
        return this._x * this._y * this._z;
      };
    };

    util.inherits(Bar, Foo);

    var bar = new Bar(2, 3, 5);
    assert.strictEqual(bar.compute(), 2 * 3 * 5);

    objectAssign(Bar, SingletonMixin);
    var bar2 = Bar.getInstance(3, 5, 7);
    assert.strictEqual(bar2.compute(), 3 * 5 * 7);

    assert('getInstance' in Foo === false);

    Bar.clearInstance();
    assert.strictEqual(Bar._instance, null);
  });
});
