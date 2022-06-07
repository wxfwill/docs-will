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
