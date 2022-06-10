---
title: 常用方法
order: 1
nav:
  title: 常用工具
  order: 3
---

## 环境判断

```js
const UA = window.navigator.userAgent.toLowerCase();

// Android
const isAndroid = /android/.test(UA);

// IOS
const isIos = /iphone|ipad|ipod|ios/.test(UA);

// 浏览器环境
const isBrowser = typeof window !== 'undefined';

// IE
const isIe = /mise|trident/.test(UA);

// Edge
const isEdge = UA.indexOf('edge/') > 0;

// chrome
const isChrome = /chrome\/\d+/.test(UA) && !isEdge;

// 微信
const isWeChat = /micromessenger/.test(UA);

// 移动端
const isMobile = 'ontouchstart' in window;
```

## 解析 url 参数

```js {6}
/**
 *  ?id=123&a=b
 *  Object {id:123, a=b}
 */

const urlParse = () => {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let temArr = item.substring(1).split('=');
      let key = docodeURIComponent(temArr[0]);
      let val = docodeURIComponent(temArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};
```

## 格式化时间戳

```js
/**
 * formatDate(Date, 'yyyy-MM-dd hh:mm:ss')
 */

function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
```

```jsx
import React, { useState, useRef } from 'react';
import { Button } from 'antd';

function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    x: date.getDay(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      // console.log('RegExp.$1', RegExp.$1);
      // console.log(RegExp.$1.includes('x'));
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 && RegExp.$1 !== 'x'
          ? str
          : RegExp.$1.includes('x')
          ? fmtDay(str)
          : padLeftZero(str),
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

function fmtDay(num) {
  let obj = {
    0: '天',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  };
  return obj[String(num)] || '星期日';
}

export default () => {
  let [today, setToday] = useState('');
  const interval1 = useRef(null);

  const start = () => {
    interval1.current && clearInterval(interval1.current);
    interval1.current = setInterval(() => {
      console.log('console.log(interVal);', interval1.current);
      setToday(formatDate(new Date(Date.now()), 'yyyy年MM月dd日hh时mm分ss秒  星期x'));
      start();
    }, 1000);
  };

  const stop = () => {
    console.log(interval1.current);
    clearInterval(interval1.current);
  };
  return (
    <div>
      <Button type="primary">今天是{today || '****年**月**日**时**分**秒'}</Button>
      <Button type="primary" onClick={start} style={{ marginLeft: 20 }}>
        开始
      </Button>
      <Button type="primary" onClick={stop} style={{ marginLeft: 20 }}>
        停止
      </Button>
    </div>
  );
};
```
