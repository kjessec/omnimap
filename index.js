'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function omnimap() {
  var args = Array.prototype.slice.call(arguments, 0);
  /**
   * If the last element is not a callback,
   * assume that we are currying the mapper.
   * Return a wrapper function
   * */
  if (typeof args[args.length - 1] !== 'function') {
    return runwrap(args);
  }

  var callback = args.pop();
  return runwrap(args)(callback);
}

function getEntry(args, idx) {
  return args.map(function (arg) {
    return arg[idx];
  });
}

function createGetEntry(objKeyList) {
  if (typeof objKeyList !== 'undefined') {
    return function getEntryObj(args, idx) {
      return args.map(function (arg) {
        return arg[objKeyList[idx]];
      });
    };
  }

  return getEntry;
}

function push(target, key, val) {
  target[key] = val;
}

function runwrap(args) {
  return function map(callback) {
    var isObjMap = !Array.isArray(args[0]);
    var keys = isObjMap ? Object.keys(args[0]) : [];
    var optimalLength = isObjMap ? keys.length : args[0].length;

    var result = undefined;
    var getEntry = undefined;
    if (!Array.isArray(args[0]) && typeof args[0] === 'object') {
      getEntry = createGetEntry(Object.keys(args[0]));
      result = new OmnimapObject();
    } else {
      getEntry = createGetEntry();
      result = [];
    }

    for (var iter = 0; iter < optimalLength; iter++) {
      var entry = getEntry(args, iter);
      var task = callback.apply(undefined, _toConsumableArray(entry).concat([keys[iter] || iter, args]));
      push(result, keys[iter] || iter, task);
    }

    return result;
  };
}

function OmnimapObject() {}
OmnimapObject.prototype.toArray = function toArray() {
  var _this = this;

  return Object.keys(this).map(function (key) {
    return _this[key];
  });
};

module.exports = omnimap;

