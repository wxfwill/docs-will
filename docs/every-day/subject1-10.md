---
title: 手写题目1-10
order: 1
nav:
  title: 每日一题
  order: 0
---

## 1.compose

> 题目描述： 实现一个 compose 函数

```js
function fn1(x) {
  return x + 1;
}

function fn2(x) {
  return x + 2;
}

function fn3(x) {
  return x + 3;
}

function fn4(x) {
  return x + 4;
}

const a = compose(fn1, fn2, fn3, fn4);

console.log(a(1)); // 1+4+3+2+1=11
```

代码实现如下：

```tsx
import React from 'react';
import { Button } from 'antd';

export default () => {
  // 实现代码
  function compose(...fn) {
    if (!fn?.length) {
      return (v) => v;
    }
    if (fn?.length === 1) {
      return fn[0];
    }
    return fn.reduce(
      (pre, cur) =>
        (...args) =>
          pre(cur(...args)),
    );
  }

  function fn3(x) {
    return x + 3;
  }

  function fn4(x) {
    return x + 4;
  }
  const handle = () => {
    let b = compose(fn3, fn4);
    console.log('compose执行结果===', b(1));
  };
  return (
    <Button type="primary" onClick={handle}>
      compose
    </Button>
  );
};
```

## 2.setTimeOut 模拟 setInterval

> 用 setTimeOut 模拟 setInterVal,返回取消函数

```tsx
import React from 'react';
import { Button } from 'antd';

export default () => {
  let cancel = null; // 取消；
  let timer = null;
  const simulationSetinterval = (fn, t) => {
    const interval = () => {
      timer && clearTimeout(timer);
      timer = window.setTimeout(() => {
        fn();
        interval();
      }, t);
      //console.log('timerid', timer);
    };
    interval();
    return () => clearTimeout(timer);
  };
  const handleStart = () => {
    cancel = simulationSetinterval(() => {
      console.log('123');
    }, 1000);
  };

  const handleCancel = () => {
    cancel?.();
  };
  return (
    <div>
      <Button type="primary" onClick={handleStart}>
        开始
      </Button>
      <Button type="primary" style={{ marginLeft: 20 }} onClick={handleCancel}>
        取消
      </Button>
    </div>
  );
};
```

## 3.setInterval 模拟 setTimeOut

> 用 setInterval 模拟 setTimeout， 返回取消函数

```tsx
import React from 'react';
import { Button } from 'antd';

export default () => {
  let timerId = null;
  let cancel = null;
  const simulationSettimeout = (fn, t) => {
    timerId && clearInterval(timerId);
    timerId = setInterval(() => {
      clearInterval(timerId);
      fn();
    }, t);
    return () => clearInterval(timerId);
  };
  const start = () => {
    cancel = simulationSettimeout(() => {
      console.log('timeout');
    }, 1000);
  };
  const stop = () => {
    cancel?.();
  };
  return (
    <div>
      <Button type="primary" onClick={start}>
        开始
      </Button>
      <Button type="primary" style={{ marginLeft: 20 }} onClick={stop}>
        暂停
      </Button>
    </div>
  );
};
```

## 4.多维数组拍平

> 将多维嵌套的数组变成一维数组

```tsx
/**
 * title: flat扁平数组
 * desc: flat描述
 * inline: false
 */

import React from 'react';
import { Button } from 'antd';
// 方法一
const flat1 = (array) => {
  return array.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flat1(cur) : cur);
  }, []);
};
const handleFlat1 = () => {
  let arr = [1, [2, 3], [4, [5, 6, [7, 8]]]];
  console.log(flat1(arr));
  return flat1(arr);
};

// 方法二
const flat2 = (array) => {
  return array.flat(Infinity);
};
const handleFlat2 = () => {
  let arr = [1, [2, 3], [4, [5, 6, [7, 8, 9]]]];
  console.log(flat2(arr));
  return flat2(arr);
};

// 方法三
const flat3 = (array) => {
  const result = [];
  const stack = [...array];

  while (stack?.length !== 0) {
    // debugger;
    const val = stack.pop();
    if (Array.isArray(val)) {
      //   console.log(...val);
      stack.push(...val);
    } else {
      result.unshift(val);
    }
  }
  return result;
};

const handleFlat3 = () => {
  let arr = [1, [2, 3], [4]];
  console.log(flat3(arr));
  return flat3(arr);
};

export default () => {
  return (
    <div>
      <Button type="primary" onClick={handleFlat1}>
        方法一
      </Button>
      <Button type="primary" onClick={handleFlat2} style={{ marginLeft: 20 }}>
        方法二
      </Button>
      <Button type="primary" onClick={handleFlat3} style={{ marginLeft: 20 }}>
        方法三
      </Button>
    </div>
  );
};
```

## 5.手写 call

[参考]('https://github.com/Abiel1024/blog/issues/16')

```tsx
/**
 * title: 手写call
 */

import React from 'react';
import { Button } from 'antd';

Function.prototype.call1 = function (context, ...reset) {
  //   debugger;
  if (typeof context === 'object') {
    context = context || window;
  } else {
    context = Object.create(null);
  }

  let fn = Symbol(); // 防止context本省也有fn属性

  context[fn] = this; // 通过this获取call的函数
  let result = context[fn](...reset);
  delete context[fn];
  return result;
};

function handleCall(name, age) {
  //   console.log('this', this);
  console.log(this.val, name, age);
  return {
    name: name || this.name,
    age: age || this.age,
    val: this.val || '000',
  };
}

const test = () => {
  let obj = { val: 123, name: 'hahh' };
  let res = handleCall.call1(obj, null, 18);
  console.log(res);
};

export default () => {
  return (
    <div>
      <Button type="primary" onClick={test}>
        call
      </Button>
    </div>
  );
};
```

## 6.手写 apply

```jsx
import React from 'react';
import { Button } from 'antd';

Function.prototype.apply1 = function (context, reset) {
  if (typeof context === 'object') {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  //   console.log('Object.prototype.toString.call(reset)', Object.prototype.toString.call(reset));
  if (Object.prototype.toString.call(reset) !== '[object Array]') {
    throw new TypeError('reset must be an array');
  }
  let fn = Symbol();
  context[fn] = this;
  console.log('...reset', ...reset);
  let result = context[fn](reset); //
  delete context[fn];
  return result;
};

function test(reset) {
  console.log('reset', reset);

  return {
    name: reset[0] || this.name,
    age: reset[1] || this.age,
    desc: this.desc || '无',
  };
}

let obj = {
  name: 'zs',
  age: 20,
  desc: 'this is an desc',
};

console.log('apply==', test.apply1(obj, ['ls']));

export default () => {
  return (
    <div>
      <Button type="primary">apply</Button>
    </div>
  );
};
```

## 7.手写 bind

```jsx
import React from 'react';
import { Button } from 'antd';

export default () => {
  Function.prototype.bind1 = function (context, ...reset) {
    var me = this;
    return function (...inner) {
      return me.call(context, ...inner, ...reset);
    };
  };

  let person = {
    name: 'hk',
  };
  function sayHi(age, sex) {
    console.log(this.name, age, sex);
  }

  let result = sayHi.bind1(person, 12);
  result('男');
  return (
    <div>
      <Button type="primary">bind</Button>
    </div>
  );
};
```

## 8. 手写 new

**new 的执行过程**

1.  创建一个对象 obj
2.  将该对象的`_proto_`指向构造函数 Fn 的原型`prototype`
3.  执行构造函数`Fn`的代码,往新创建的对象 obj 上添加属性和方法
4.  返回这个新的对象 obj

> `注意`: 构造函数 Fn 的返回值，如果返回值是一个对象的的话，实例只能访问对象的属性，如果返回值是基本类型则会忽略（默认返回 obj），若没有返回值则默认返回 obj

[参考冴羽博客]('https://github.com/mqyqingfeng/Blog/issues/13')

```jsx
import React from 'react';
import { Button } from 'antd';

export default () => {
  // 手写new
  function objectFactory() {
    var obj = new Object();
    var Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
    // return obj;
  }

  // Person
  function Person(name, age) {
    this.name = name;
    this.age = age;
    // return { desc: '666' };
  }

  Person.prototype.strength = 30;
  Person.prototype.sayHi = function () {
    console.log('i am ' + this.name);
  };

  var person = objectFactory(Person, 'will', '18');

  console.log(person.name, person.age);
  console.log('strength==', person.strength);
  person.sayHi();

  return (
    <div>
      <Button type="primary">手写new</Button>
    </div>
  );
};
```

## 9. 数组去重

[参考]('https://github.com/qianlongo/fe-handwriting/blob/master/8.uniqueArray.js')

```jsx
import React from 'react';
import { Button } from 'antd';
// 方法一
const uniqueArray1 = (array) => {
  console.log(new Set(array));
  return [...new Set(array)];
};
console.log('方法一', uniqueArray1([1, 22, 22, 3, 3]));

// 方法二
const uniqueArray2 = (array) => {
  let result = [];
  array.forEach((item, i) => {
    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  });
  return result;
};
console.log('方法二', uniqueArray2([3, 3, 5, 6, 6]));
// 方法三
const uniqueArray3 = (array) => {
  return array.filter((it, i) => array.indexOf(it) === i);
};
console.log('方法三', uniqueArray3([3, 5, 5, 6, 6]));
// 方法四
const uniqueArray4 = (array) => {
  return Array.from(new Set(array));
};
console.log('方法四', uniqueArray4([5, 5, 5, 6, 6]));

export default () => {
  return (
    <div>
      <Button>方法一(set)</Button>
      <Button style={{ marginLeft: 20 }}>方法二(forEach)</Button>
      <Button style={{ marginLeft: 20 }}>方法三(filter)</Button>
      <Button style={{ marginLeft: 20 }}>方法四(Array Form)</Button>
    </div>
  );
};
```

## 10. 手写一个深拷贝

```jsx
import React from 'react';
import { Button } from 'antd';
const isObject = (obj) => typeof obj === 'object' && obj !== null;
const forEach = (array, cb) => {
  const len = array?.length;
  let i = -1;
  while (++i < len) {
    cb(array[i]);
  }
};
// deepClone 1
const deepClone = (target, cache = new Map()) => {
  if (isObject(target)) {
    // 解决循环引用
    const cacheTarget = cache.get(target);
    if (cacheTarget) {
      return target;
    }

    let cloneTarget = Array.isArray(target) ? [] : {};

    cache.set(target, cloneTarget);

    for (let key in target) {
      //   debugger;
      const value = target[key];
      cloneTarget[key] = isObject(value) ? deepClone(value, cache) : value;
    }

    return cloneTarget;
  } else {
    return target;
  }
};

// deepClone2
const deepClone2 = (target, cache = new Map()) => {
  if (isObject(target)) {
    const cacheObj = cache.get(target);
    // console.log(cacheObj);
    // 解决循环引用
    if (cacheObj) {
      return cacheObj;
    }

    let cloneTarget = Array.isArray(target) ? [] : {};
    let keys = Object.keys(target);

    cache.set(target, cloneTarget);

    forEach(keys, (key) => {
      const value = target[key];
      cloneTarget[key] = isObject(value) ? deepClone2(value, cache) : value;
    });

    return cloneTarget;
  } else {
    return target;
  }
};

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};
target.target = target;

// console.log(target);

const t1 = [{ name: 2 }, 23, { kk: { nn: { vv: 56 } } }];
console.time();
const result1 = deepClone(target);
console.log('result1', result1);
console.timeEnd();

console.time();
const result2 = deepClone2(target);
console.log('result2', result2);
console.timeEnd();

export default () => {
  return (
    <div>
      <Button>手写深拷贝</Button>
    </div>
  );
};
```
