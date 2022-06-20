---
title: 手写题目21-30
order: 3
nav:
  title: 每日一题
  order: 0
---

参考文档:

- [JavaScript 深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)

* [32 个手写 JS，巩固你的 JS 基础](https://juejin.cn/post/6875152247714480136?utm_source=gold_browser_extension#heading-29)

## 21.不借助临时变量，进行两个整数的交换

```jsx
import React from 'react';
const swap = (a, b) => {
  b = b - a;
  a = a + b;
  b = a - b;

  return [a, b];
};

const handleSwap = () => {
  console.log('交换变量==', swap(1, 2));
};

export default () => {
  return <div onClick={handleSwap}>交换变量[1,2]</div>;
};
```

## 22.计算数组中的最大差值

```jsx
import React from 'react';
const getMaxProfit = (arr) => {
  let min = arr[0],
    max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max - min;
};

const handleSwap = () => {
  console.log('最大差值==', getMaxProfit([10, 1, 20, 30, 50]));
};

export default () => {
  return <div onClick={handleSwap}>数组的最大差值</div>;
};
```

## 23.生成指定长度的字符串

```tsx
import React from 'react';

export default () => {
  const randomStr = (n) => {
    var str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var tmp = '';
    for (let i = 0; i < n; i++) {
      tmp += str.charAt(Math.round(Math.random() * str.length));
    }
    return tmp;
  };
  const handleRandom = () => {
    // randomStr(8);
    console.log(`指定长度的字符串==${randomStr(8)}`);
  };
  return <div onClick={handleRandom}>生成指定长度的字符串</div>;
};
```
