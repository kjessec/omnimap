'use strict';
var omnimap = require('../index.es6');
var assert = require('chai').assert;

describe('omnimap/array', function() {
  it('should map over an array', function() {
    var src = [1, 2, 3];
    var expectedRes = src.map(function(e) { return e * e });
    var i = 0;
    var res = omnimap([1, 2, 3], function(a, idx, arr) {
      assert.equal(idx, i++);
      assert.equal(a, src[idx]);
      return a * a;
    });

    assert.deepEqual(res, expectedRes);
  });

  it('should map over 3 arrays', function() {
    var src = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    var expectedRes = [
      src[0][0] + src[1][0] + src[2][0],
      src[0][1] + src[1][1] + src[2][1],
      src[0][2] + src[1][2] + src[2][2],
    ]
    var i = 0;
    var res = omnimap(src[0], src[1], src[2], function(a, b, c, idx, arr) {
      assert.deepEqual(arr, src);
      assert.equal(idx, i++);
      assert.equal(a, src[0][idx]);
      assert.equal(b, src[1][idx]);
      assert.equal(c, src[2][idx]);
      return a + b + c;
    });

    assert.deepEqual(res, expectedRes);
  });
});
