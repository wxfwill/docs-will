---
title: 作用域
nav:
  title: javascript
  order: 2
group:
  title: javaccript核心知识
  path: /js-core
  order: 2
---

## 作用域

> 本篇是在看完冴羽大佬的博客后，自己手动记一下以便加深理解，[原文地址](https://github.com/mqyqingfeng/Blog/issues/3)

- 作用域是程序源代码中定义变量的区域
- 作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限
- `Javascript`采用词法作用域，也就是静态作用域

## 静态作用域与动态作用域

**`Javascript`采用的是词法作用域，函数的作用域在函数定义的时候就决定了**

而与词法作用域相对的是动态作用域，函数的作用域在函数调用的时候才决定的。

看以下例子的区别：

```js
var value = 1;
function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar();

// 执行结果为 1
```

假设`Javascript`采用静态作用域，分析执行过程：

执行`foo`函数，先从`foo`函数内部查找是否有局部变量`value`，如果没有，就根据书写位置，查找上面一层的代码，也就是`value`等于 1，所以结果会打印 1.

假设`Javascript`采用动态作用域，分析执行过程：

执行`foo`函数，依然从`foo`函数内部查找是否有局部变量`value`，如果没有，就从调用函数的作用域，也就是`bar`函数内部查找`value`变量，所以结果会打印 2.

**前面已经分析`Javascript`采用的是静态作用域，所以例子的最终结果是 1**

`总结：Javascript采用词法作用域（静态作用域）,函数的作用域基于函数创建的位置。`
