---
title: 手写题目11-20
order: 2
nav:
  title: 每日一题
  order: 0
---

## 11.模拟 Instanceof

> `instanceof`操作符用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上

参考:

- [JavaScript 深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)

* [32 个手写 JS，巩固你的 JS 基础](https://juejin.cn/post/6875152247714480136?utm_source=gold_browser_extension#heading-29)

```jsx
import React from 'react';
import { Button } from 'antd';

export default () => {
  const myInstanceof = (left, right) => {
    //left: 基本数据类型和null返回false
    // if (typeof left !== 'object' || left === null) {
    //   return false;
    // }
    if (!(left && ['object', 'function'].includes(typeof left))) {
      return false;
    }

    // debugger;
    let proto = Object.getPrototypeOf(left);
    while (true) {
      if (proto === null) {
        return false;
      }
      if (proto === right.prototype) {
        return true;
      }
      proto = Object.getPrototypeOf(proto);
    }
  };

  let Fn = function () {};
  let p1 = new Fn();

  // console.log('s1===', myInstanceof(p1, Fn));
  // console.log('s2===', myInstanceof({}, Fn));
  // console.log('s3===', myInstanceof({}, Object));
  // console.log('s4===', myInstanceof(null, Fn));
  // console.log('s5===', myInstanceof(1, Fn));
  console.log(
    's6===',
    myInstanceof(function () {}, Function),
  );
  return (
    <div>
      <Button type="primary">模拟instanceof</Button>
    </div>
  );
};
```

## 12.debounce(防抖)

> 防抖的原理: 频换的触发事件，但我一定在事件触发 n 秒后才执行，如果在一个事件触发的 n 秒内又触发了这个事件，那就以新的事件时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不在触发事件，我才执行。

```js
const debounce3 = (fn, wait, immediate = false) => {
  let timeout = null;
  let debouned = function (e) {
    e.persist();
    timeout && clearTimeout(timeout);

    if (immediate) {
      // 以执行就不在执行
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      callNow && fn.apply(e.target, arguments);
    } else {
      timeout = setTimeout(() => {
        return fn.apply(e.target, arguments);
      }, wait);
    }
  };
  debouned.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debouned;
};
```

```jsx
import React, { useState } from 'react';
import { Input, Button, Col, Row, Space } from 'antd';

export default () => {
  const [inputVal, setInputVal] = useState('');
  // 第一版
  const debounce = (fn, wait) => {
    let timeout = null;
    return function (e) {
      e.persist();
      timeout && clearTimeout(timeout);
      // setInputVal(e.target.value);
      timeout = setTimeout(() => {
        // console.log('event.target', e.target);
        return fn.apply(e.target, arguments);
      }, wait);
    };
  };

  // 第二版 （添加是否立即执行）
  const debounce2 = (fn, wait, immediate = false) => {
    let timeout = null;
    return function (e) {
      e.persist();
      timeout && clearTimeout(timeout);

      if (immediate) {
        // 以执行就不在执行
        let callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
        callNow && fn.apply(e.target, arguments);
      } else {
        timeout = setTimeout(() => {
          return fn.apply(e.target, arguments);
        }, wait);
      }
    };
  };

  // 第三版 （immediate为true,添加cancel）
  const debounce3 = (fn, wait, immediate = false) => {
    let timeout = null;
    let debouned = function (e) {
      e.persist();
      timeout && clearTimeout(timeout);

      if (immediate) {
        // 以执行就不在执行
        let callNow = !timeout;
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
        callNow && fn.apply(e.target, arguments);
      } else {
        timeout = setTimeout(() => {
          return fn.apply(e.target, arguments);
        }, wait);
      }
    };
    debouned.cancel = function () {
      clearTimeout(timeout);
      timeout = null;
    };
    return debouned;
  };

  const handleChange = debounce2(
    function (e) {
      console.log('this==', this);
      const val = e.target.value;
      console.log('val==', val);
    },
    500,
    false,
  );

  const handleChange2 = debounce3(
    function (e) {
      const val = e.target.value;
      console.log('val==', val);
    },
    3000,
    true,
  );

  const cancel = () => {
    handleChange2.cancel();
  };

  const handleChange1 = (e) => {
    e.persist();
    const val = e.target.value;
    setInputVal(val);
    console.log('val==', val);
  };
  // Input 组件
  // defaultValue: 对应原生input的value,react自己添加的，非受控属性，即状态不受react控制
  // value: 受控属性，值收到react控制

  return (
    <div>
      <Space direction="vertical" size={20} style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col span={10}>
            <Input onChange={handleChange} />
          </Col>
          <Col span={4} offset={2}>
            <Space size={20}>
              <Button type="primary">不受控</Button>
            </Space>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Input onChange={handleChange1} value={inputVal} />
          </Col>
          <Col span={4} offset={2}>
            <Space size={20}>
              <Button type="primary">受控</Button>
            </Space>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Input onChange={handleChange2} />
          </Col>
          <Col span={4} offset={2}>
            <Space size={20}>
              <Button type="primary" onClick={cancel}>
                immediate为true时取消防抖
              </Button>
            </Space>
          </Col>
        </Row>
      </Space>
    </div>
  );
};
```

## 13.throttle 节流

> 节流原理: 持续触发事件，每隔一段时间，只执行一次事件

节流的 2 种实现方式： 一种是使用`时间戳`，一种是`设置定时器`

```js
const throttle3 = (fun, wait) => {
  var timeout,
    startTime = +new Date();
  var throttle = function () {
    var lastTime = Date.now();
    // 下次触发 func 剩余的时间
    var remaining = wait - (lastTime - startTime);
    console.log('remaining <= 0 ', remaining);
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      fun.apply(this, arguments);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        fun.apply(this, arguments);
        timeout = null;
      }, remaining);
    }
  };
  return throttle;
};
```

```tsx
import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';

export default () => {
  let [count, setCount] = useState(0);
  // 第一版时间戳
  const throttle = function (fun, wait) {
    var stratTime = +new Date();
    return function () {
      var lastTime = +new Date();
      // console.log(lastTime - stratTime);
      // console.log(lastTime - stratTime > wait);
      if (lastTime - stratTime > wait) {
        fun.apply(this, arguments);
        // stratTime = lastTime;
      }
    };
  };

  // 第二版定时器
  const throttle2 = (fun, wait) => {
    var timer = null;
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          fun.apply(this, arguments);
          timer = null;
        }, wait);
      }
    };
  };

  // 双剑合璧版本
  const throttle3 = (fun, wait) => {
    var timeout,
      startTime = +new Date();
    var throttle = function () {
      var lastTime = Date.now();
      // 下次触发 func 剩余的时间
      var remaining = wait - (lastTime - startTime);
      console.log('remaining <= 0 ', remaining);
      // 如果没有剩余的时间了或者你改了系统时间
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        fun.apply(this, arguments);
      } else if (!timeout) {
        timeout = setTimeout(() => {
          fun.apply(this, arguments);
          timeout = null;
        }, remaining);
      }
    };
    return throttle;
  };

  const move = throttle3(function (msg) {
    console.log('move33==', msg);
    setCount(++count);
  }, 1000);
  return (
    <div>
      <Row
        gutter={24}
        style={{ height: '120px', background: 'hotpink' }}
        justify="center"
        align="middle"
        onMouseMove={() => move('msg999')}
      >
        <Col span={2}>{count}</Col>
      </Row>
    </div>
  );
};
```

## 14. list2tree

> 数组转成树状结构

```js
const arrToTree = (arr) => {
  const hashMap = {};
  let result = [];
  arr.forEach((item) => {
    let { id, pid } = item;
    if (!hashMap[id]) {
      hashMap[id] = {
        ...item,
        children: [],
      };
    }
    let treeIt = hashMap[id];

    if (pid === 0) {
      result.push(treeIt);
    } else {
      hashMap[pid].children.push(treeIt);
    }
  });
  return result;
};
```

```jsx
import React from 'react';
import { Button } from 'antd';

let parentObj = {
  id: 0,
  label: '最高级',
  children: [],
};
let arr = [
  [
    { id: 1, label: 'yi' },
    { id: 2, label: 'er' },
    { id: 3, label: 'san' },
    { id: 4, label: 'four' },
  ],
  [
    { id: 1, label: 'one' },
    { id: 2, label: 'two' },
    { id: 3, label: 'three' },
    { id: 4, label: '4' },
  ],
];

// 二维数组转Tree
const digui = (obj, item, index) => {
  if (index === 0) {
    obj = item;
  } else {
    if (!obj.children) {
      obj.children = [];
      obj.children.push(item);
    } else {
      if (obj.label === item.label) return;
      obj.children.map((el) => {
        digui(el, item, index);
      });
    }
  }
  return obj;
};
arr.forEach((list) => {
  let obj = null;
  list?.length > 0 &&
    list.forEach((item, index) => {
      obj = digui(obj, item, index);
    });
  parentObj.children.push(obj);
});
// console.log('parentObj', parentObj);

// 一维数组转tree
let arr1 = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
];

const arrToTree = (arr) => {
  const hashMap = {};
  let result = [];
  arr.forEach((item) => {
    let { id, pid } = item;
    if (!hashMap[id]) {
      hashMap[id] = {
        ...item,
        children: [],
      };
    }
    let treeIt = hashMap[id];

    if (pid === 0) {
      result.push(treeIt);
    } else {
      hashMap[pid].children.push(treeIt);
    }
  });
  return result;
};

console.log(arrToTree(arr1));

export default () => {
  return (
    <div>
      <Button>list2tree</Button>
    </div>
  );
};
```

## 15.tree2List

> 树结构转成一维数组

```js
const treeTwoList = (tree) => {
  const result = [];
  let queue = [...tree];
  while (queue?.length) {
    // 取出第一项
    let node = queue.shift();
    let nodeChildren = node.children;
    if (nodeChildren?.length) {
      queue.push(...nodeChildren);
    }
    delete node.children;
    result.push(node);
  }
  return result;
};
```

```jsx
import React from 'react';
import { Button } from 'antd';

const tree = [
  {
    id: 1,
    name: '部门1',
    pid: 0,
    children: [
      {
        id: 2,
        name: '部门2',
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: '部门3',
        pid: 1,
        children: [
          {
            id: 4,
            name: '部门4',
            pid: 3,
            children: [
              {
                id: 5,
                name: '部门5',
                pid: 4,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
const treeTwoList = (tree) => {
  const result = [];
  let queue = [...tree];
  while (queue?.length) {
    // 取出第一项
    let node = queue.shift();
    let nodeChildren = node.children;
    if (nodeChildren?.length) {
      queue.push(...nodeChildren);
    }
    delete node.children;
    result.push(node);
  }
  return result;
};

console.log('tree2list', treeTwoList(tree));

export default () => {
  return (
    <div>
      <Button>Tree2List</Button>
    </div>
  );
};
```

## 16.EventEmitter

> 手写发布订阅模式

```tsx
/**
 * title: 发布订阅
 * desc: 支持发布，订阅，删除，只订阅一次
 */
import React from 'react';
import { Button } from 'antd';

export default () => {
  class EventEmitter {
    static instance: any;
    event = {};
    // 单例模式
    construtor() {
      if (!EventEmitter.instance) {
        EventEmitter.instance = this;
        // 存储订阅者
        this.event = {};
      }
      return EventEmitter.instance;
    }
    // 订阅者
    on(eventName, callback) {
      // debugger;
      console.log('this.event', this.event);
      this.event[eventName] = this.event[eventName] || [];
      this.event[eventName].push(callback);
    }
    // 发布者
    emit(eventName, ...reset) {
      const callbacks = this.event[eventName];
      if (callbacks) {
        const handles = [...callbacks];
        handles.forEach((cb) => cb(...reset));
      }
    }
    // 删除订阅者
    remove(eventName, callback) {
      let callbacks = this.event[eventName];
      // 不存在callback，则删除所有
      if (!callback) {
        delete this.event[eventName];
        return;
      }
      if (!callbacks || callbacks?.length === 0) return;
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
    // 执行一次
    once(eventName, cb) {
      const wrap = (...args) => {
        cb(...args);
        this.remove(eventName, wrap);
      };
      this.on(eventName, wrap);
    }
  }

  let em = new EventEmitter();

  const callback1 = (msg) => {
    console.log(`name1, msg===${msg}`);
  };
  const callback2 = (msg) => {
    console.log(`name2, msg===${msg}`);
  };
  const callback3 = (msg) => {
    console.log(`我是只订阅一次的, msg===${msg}`);
  };
  em.on('evt1', callback1);
  em.on('evt1', callback2);

  em.once('evt2', callback3);

  const startEmit = () => {
    em.emit('evt1', 'hi, 我是test');
  };

  const startEmitOne = () => {
    em.emit('evt2', '我只来一次额');
  };

  const remove1 = () => {
    em.remove('evt1', callback1);
    console.log('删除evt1,callback1');
  };
  const remove2 = () => {
    em.remove('evt1', callback2);
    console.log('删除evt2,callback2');
  };
  const remove = () => {
    em.remove('evt1');
    console.log('删除evt1,全部callback');
  };

  return (
    <div>
      <Button type="primary" onClick={startEmit} style={{ marginLeft: 20 }}>
        开始发布
      </Button>
      <Button type="primary" onClick={startEmitOne} style={{ marginLeft: 20 }}>
        1次就好
      </Button>
      <Button type="primary" onClick={remove1} style={{ marginLeft: 20 }}>
        删除callback1
      </Button>
      <Button type="primary" onClick={remove2} style={{ marginLeft: 20 }}>
        删除callback2
      </Button>
      <Button type="primary" onClick={remove} style={{ marginLeft: 20 }}>
        删除全部
      </Button>
    </div>
  );
};
```

## 17.curry 柯里化

- 定义：`柯里化是一种将多个参数的一个函数转换成一系列使用一个参数的函数的技术`
- 用途： `参数复用`，降低通用性，提高适用性

```tsx
import React from 'react';
import { Button } from 'antd';

export default () => {
  // 第一版
  var curry = function (fn) {
    var args = [].slice.call(arguments, 1);
    return function () {
      var newArgs = args.concat([].slice.call(arguments));
      return fn.apply(this, newArgs);
    };
  };
  var add = function (a: number, b: number): number {
    return a + b;
  };
  add('4', 5);
  var addCurry = curry(add, 33, 3);

  console.log('addCurry()==', addCurry());

  return (
    <div>
      <Button type="primary">curry柯里化</Button>
    </div>
  );
};
```
