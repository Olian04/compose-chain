# compose-chain

```js
const cc = require('compose-chain');

const composition = cc
  .map(v => v * v)
  .map(v => v + 1)
  .filter(v => v % 2 === 0)
  .compose();

const result = composition([1, 2, 3]);
```

In normal js this would loop over the array 3 times, once for each operation.
Using `compose-chain` this will loop over the array once.

```js
//This is equivalent to the above

[1, 2, 3].reduce((res, v) => {
  v = v * v;
  v = v + 1;
  if (v % 2 === 0) return res;
  return [...res, v];
}, []);
```

# API

## `.map( v => any )`

```js
cc([1, 2, 3])
  .map(v => v * 2);
// [2, 4, 6]
```

## `.filter( v => bool )`

```js
cc([1, 2, 3])
  .filter(v => v > 1);
// [2, 3]
```

## `.each( v => void )`

```js
cc([1, 2, 3])
  .each(v => console.log(v + 1)); // 2, 3, 4
// [1, 2, 3]
```

## `.reduce( (res, v) => any , initial)`

```js
cc([1, 2, 3])
  .reduce((res, v) => res + v, 0);
// 6
```

## `.sort( (a,b) => number )`
_Warning: sort will end the current composition, then sort the data, then start another composition_ 

```js
cc([1, 2, 3])
  .sort((a, b) => b - a);
// [3, 2, 1]
```
