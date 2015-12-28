'use strict';
function omnimap() {
  const args = Array.prototype.slice.call(arguments, 0);
  /**
   * If the last element is not a callback,
   * assume that we are currying the mapper.
   * Return a wrapper function
   * */
  if(typeof args[args.length-1] !== 'function') {
    return runwrap(args);
  }

  const callback = args.pop();
  return runwrap(args)(callback);
}

function getEntry(args, idx) {
  return args.map(function(arg) {
    return arg[idx];
  });
}

function createGetEntry(objKeyList) {
  if(typeof objKeyList !== 'undefined') {
    return function getEntryObj(args, idx) {
      return args.map(function(arg) {
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
    const isObjMap = !Array.isArray(args[0]);
    const keys = isObjMap ? Object.keys(args[0]) : [];
    const optimalLength = isObjMap ? keys.length : args[0].length;

    let result;
    let getEntry;
    if(!Array.isArray(args[0]) && typeof args[0] === 'object') {
      getEntry = createGetEntry(Object.keys(args[0]));
      result = new OmnimapObject();
    } else {
      getEntry = createGetEntry();
      result = [];
    }

    for(let iter=0; iter<optimalLength; iter++) {
      const entry = getEntry(args, iter);
      const task = callback(...entry, keys[iter] || iter, args);
      push(result, keys[iter] || iter, task);
    }

    return result;
  };
}

function OmnimapObject() {}
OmnimapObject.prototype.toArray = function toArray() {
  return Object.keys(this).map((key) => {
    return this[key];
  });
};

module.exports = omnimap;
