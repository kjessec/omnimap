Omnimap
=======

Map over multiple arrays/object without thinking too much. Callback function follows the general input arguments of `Array.prototype.map`.

## Usage
### Array
````javascript
'use strict';
const omnimap = require('omnimap');
const result = omnimap([1,2,3], [4,5,6], function(a, b, idx, arr) {
  // idx is the current idx iteration index
  return a + b;
});
console.log(result); // [5, 7, 9];
````

You can do three arrays as well. Well, just give it any number of enumerable things, and it'll map through.
````javascript
'use strict';
const omnimap = require('omnimap');
const result = omnimap([1,2,3], [4,5,6], [7,8,9], function(a, b, c, idx, arr) {
  // idx is the current idx iteration index
  return a + b + c;
});
console.log(result); // [12, 15, 18];
````

### Object
As with all object looping in js, the order of the outcome is not guaranteed.
````javascript
'use strict';
const omnimap = require('omnimap');
const a = { a: 1, b: 2, c: 3 };
const b = { a: 4, b: 5, c: 6 };
const result = omnimap(a, b, function(a, b, key, arr) {
  // key is the currently iterating object key
  return a + b;
});
console.log(result); // { a: 5, b: 7, c: 9 };
````

For object mapping, we have a convenient tool that converts the result object into a key-less array.
````javascript
console.log(result.toArray()); // [5, 7, 9];
````

### Optional lazy evaluation
If you don't pass a function as the last element, it will return a runner function which you can invoke later by giving a mapper function.

````javascript
'use strict';
const omnimap = require('omnimap');
const map = omnimap([1,2,3], [4,5,6]);
const result = map(function(a, b, idx, arr) {
  // idx is the current idx iteration index
  return a + b;
});
console.log(result); // [5, 7, 9];
````

## The real reason why I made this
````javascript
const omnimap = require('omnimap');
const controllers = [
  promiseControllerInstanceA,
  promiseControllerInstanceB,
  promiseControllerInstanceC,
];
const payloads = [
  payloadForA,
  payloadForB,
  payloadForC
];

const task = omnimap(controllers, payloads, function(controller, payload, idx) {
  payload.taskId = idx;
  return controller(payload);
});

Promise.all(task).then(function(results) {
  /* Consume results here */
});
````

## Caveats
1. The maximum iteration count is always the `length` of the first enumerable given. Make sure that the length of following enumerables are less than or equal to the length of the first enumerable. It would fail node.js VM (undefined reference errors).
2. Object mapping returns its own instance, `OmnimapObject`, rather than a plain object. This is to hide `.toArray()` method behind the prototype. However, it still is compatible with all `Object.prototype` methods.
3. Because of the Caveat#2, testing methods such as `chai.assert.deepEqual` would fail. You will have to iterate over each key manually, and assert each member individually.
