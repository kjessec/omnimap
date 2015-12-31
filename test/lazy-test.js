'use strict';
var omnimap = require('../index');
var assert = require('chai').assert;

describe('omnimap/lazyEvaluation', function() {
  it('should return a function when no callback is given', function() {
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
    var runner = omnimap(src);

    assert.equal(typeof runner, 'function');

    var res = runner(function(a, key, arr) {
      assert.ok(key in expectedRes);
      assert.equal(a, src[key]);
      return a * a;
    });

    Object.keys(expectedRes).forEach(function(keyName) {
      assert.equal(res[keyName], expectedRes[keyName]);
    });
  });
});
