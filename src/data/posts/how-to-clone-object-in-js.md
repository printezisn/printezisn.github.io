---
title: How to clone an object in JS
description: Regardless if it's for testing or actual implementation, there are many cases where we want to deep clone a JS object. There are 4 very neat ways to do so.
excerpt: Regardless if it's for testing or actual implementation, there are many cases where we want to deep clone a JS object. There are 4 very neat ways to do so.
categories:
  - js
date: 2024-09-03
image:
  href: '../../assets/posts/how-to-clone-object-in-js/cloned-object.png'
  alt: Two objects looking identical
---

Regardless if it's for testing or actual implementation, there are many cases where we want to deep clone a JS object. There are 4 very neat ways to do so.

**1. Create a custom function to handle the deep cloning**

```js
const deepClone = (obj) => {
  if (obj == null || obj instanceof Date || typeof obj !== 'object') {
    return obj;
  }

  const result = Array.isArray(obj) ? [] : {};
  for (const prop in obj) {
    result[prop] = deepClone(obj[prop]);
  }

  return result;
};
```

However, it may be difficult to maintain a custom function, especially with all the different kinds of objects you have to take into account.

**2. Use JSON.parse with JSON.stringify**

This has been in my opinion, the most classic way to handle this case so far. And it's as simple as this one line:

```js
const clone = JSON.parse(JSON.stringify(obj));
```

The drawback though is the way it handles certain object types. For example:

```js
const obj = {
  prop1: 2,
  prop2: 'Test string',
  prop3: {
    prop31: new Date(),
    prop32: {
      prop321: null,
      prop322: false,
      prop323: undefined,
    },
    prop33: [1, 5, new Date(), true],
  },
};

const clone = JSON.parse(JSON.stringify(obj));
console.log(clone);
```

The result is the following:

```js
{
  prop1: 2,
  prop2: 'Test string',
  prop3: {
    prop31: '2024-09-09T06:28:49.734Z',
    prop32: { prop321: null, prop322: false },
    prop33: [ 1, 5, '2024-09-09T06:28:49.734Z', true ]
  }
}
```

As you can see, the dates are serialized as strings.

**3. Use lodash/cloneDeep**

If you're already using the <a href="https://lodash.com/" target="_blank" rel="nofollow noreferrer">lodash</a> library, you can use its `cloneDeep` function. For example:

```js
import cloneDeep from 'lodash/cloneDeep.js';

const obj = {
  prop1: 2,
  prop2: 'Test string',
  prop3: {
    prop31: new Date(),
    prop32: {
      prop321: null,
      prop322: false,
      prop323: undefined,
    },
    prop33: [1, 5, new Date(), true],
  },
};

const clone = cloneDeep(obj);
console.log(clone);
```

```js
{
  prop1: 2,
  prop2: 'Test string',
  prop3: {
    prop31: 2024-09-09T06:36:13.152Z,
    prop32: { prop321: null, prop322: false, prop323: undefined },
    prop33: [ 1, 5, 2024-09-09T06:36:13.152Z, true ]
  }
}
```

**4. Use structuredClone**

As mentioned in <a href="https://developer.mozilla.org/en-US/docs/Web/API/structuredClone" target="_blank" rel="nofollow noreferrer">MDN</a>, the global `structuredClone` method creates a deep clone of a given value using the structured clone algorithm. It's supported in all major browsers (<a href="https://caniuse.com/?search=structuredClone" target="_blank" rel="nofollow noreferrer">caniuse</a>) and NodeJS >= 17. Here's an example:

```js
const obj = {
  prop1: 2,
  prop2: 'Test string',
  prop3: {
    prop31: new Date(),
    prop32: {
      prop321: null,
      prop322: false,
      prop323: undefined,
    },
    prop33: [1, 5, new Date(), true],
  },
};

const clone = structuredClone(obj);
console.log(clone);
```

```js
{
  prop1: 2,
  prop2: 'Test string',
  prop3: {
    prop31: 2024-09-09T06:48:29.267Z,
    prop32: { prop321: null, prop322: false, prop323: undefined },
    prop33: [ 1, 5, 2024-09-09T06:48:29.267Z, true ]
  }
}
```
