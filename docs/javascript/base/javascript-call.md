---
title: call
nav:
  title: javascript
  order: 3
group:
  title: javascript基础知识
  path: /js-base
  order: 1
---

## call() 和 apply()

众所周知，call 和 apply 都能改变调用者指针指向，唯一的区别就是，call() 方法接受的是若干个参数的列表，而 apply() 方法接受的是一个包含多个参数的数组。<br>

实际上，call 和 apply 都是 Function 原型中的方法:

```js
Function.prototype.call();
Function.prototype.apply();
```

举个例子：

```js
var func = function(arg1, arg2) {
     ...
};

func.call(this, arg1, arg2); // 使用 call，参数列表
func.apply(this, [arg1, arg2]) // 使用 apply，参数数组
```

## 使用场景

**1、合并两个数组**

```js
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);
// 4

vegetables;
// ['parsnip', 'potato', 'celery', 'beetroot']
```

当第二个数组(如示例中的 moreVegs )太大时不要使用这个方法来合并数组，因为**一个函数能够接受的参数个数是有限制的**。不同的引擎有不同的限制，JS 核心限制在 65535，有些引擎会抛出异常，有些不抛出异常但丢失多余参数。<br>

如何解决呢？方法就是**将参数数组切块后循环传入目标方法**

```js
function concatOfArray(arr1, arr2) {
  var QUANTUM = 32768;
  for (var i = 0, len = arr2.length; i < len; i += QUANTUM) {
    Array.prototype.push.apply(arr1, arr2.slice(i, Math.min(i + QUANTUM, len)));
  }
  return arr1;
}

// 验证代码
var arr1 = [-3, -2, -1];
var arr2 = [];
for (var i = 0; i < 1000000; i++) {
  arr2.push(i);
}

Array.prototype.push.apply(arr1, arr2);
// Uncaught RangeError: Maximum call stack size exceeded

concatOfArray(arr1, arr2);
// (1000003) [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...]
```

**2、获取数组中的最大值和最小值**

```js
var numbers = [5, 458, 120, -215];
Math.max.apply(Math, numbers); //458
Math.max.call(Math, 5, 458, 120, -215); //458

// ES6
Math.max.call(Math, ...numbers); // 458
```

为什么要这么用呢，因为数组 numbers 本身没有 max 方法，但是 Math 有呀，所以这里就是借助 call / apply 使用 Math.max 方法

**3、验证是否是数组**

```js{2}
function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]';
}
isArray([1, 2, 3]);
// true

// 直接使用 toString()
[1, 2, 3].toString(); 	// "1,2,3"
"123".toString(); 		// "123"
123.toString(); 		// SyntaxError: Invalid or unexpected token
Number(123).toString(); // "123"
Object(123).toString(); // "123"
```

可以通过`toString()` 来获取每个对象的类型，但是不同对象的 `toString()`有不同的实现，所以通过 `Object.prototype.toString()` 来检测，需要以 `call() / apply()` 的形式来调用，传递要检查的对象作为第一个参数。

另一个**验证是否是数组**的方法

```js
var toStr = Function.prototype.call.bind(Object.prototype.toString);
function isArray(obj) {
  return toStr(obj) === '[object Array]';
}
isArray([1, 2, 3]);
// true

// 使用改造后的 toStr
toStr([1, 2, 3]); // "[object Array]"
toStr('123'); // "[object String]"
toStr(123); // "[object Number]"
toStr(Object(123)); // "[object Number]"
```

上面方法首先使用 `Function.prototype.call`函数指定一个 `this` 值，然后 `.bind` 返回一个新的函数，始终将 `Object.prototype.toString `设置为传入参数。其实等价于 `Object.prototype.toString.call()` 。

:::warning 这里有一个前提是 toString()方法没有被覆盖 :::

```js
Object.prototype.toString = function () {
  return '';
};
isArray([1, 2, 3]);
// false
```
