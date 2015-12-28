'use strict';
var omnimap = require('../index.es6');
var assert = require('chai').assert;

describe('omnimap/object', function() {
  it('should map over an object', function() {
    var src = {
      a: 1,
      b: 2,
      c: 3
    };

    var expectedRes = {
      a: 1,
      b: 4,
      c: 9
    };

    var i = 0;
    var res = omnimap(src, function(a, key, arr) {
      assert.ok(key in expectedRes);
      assert.equal(a, src[key]);
      return a * a;
    });

    Object.keys(expectedRes).forEach(function(keyName) {
      assert.equal(res[keyName], expectedRes[keyName]);
    });
  });

  it('should map over 3 objects', function() {
    var src = [
      { a: 1, b: 2, c: 3 },
      { a: 4, b: 5, c: 6 },
      { a: 7, b: 8, c: 9 }
    ];

    var expectedRes = {
      a: src[0].a + src[1].a + src[2].a,
      b: src[0].b + src[1].b + src[2].b,
      c: src[0].c + src[1].c + src[2].c
    };

    var i = 0;
    var res = omnimap(src[0], src[1], src[2], function(a, b, c, key, arr) {
      assert.ok(key in expectedRes);
      assert.equal(a, src[0][key]);
      assert.equal(b, src[1][key]);
      assert.equal(c, src[2][key]);
      return a + b + c;
    });

    Object.keys(expectedRes).forEach(function(keyName) {
      assert.equal(res[keyName], expectedRes[keyName]);
    });
  });
});
