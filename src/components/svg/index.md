---
title: 开始
nav:
  path: '/components'
  title: '辅助技能'
  order: 3
---

## 定义

- SVG 文件可以直接插入网页，成为 DOM 的一部分

## svg 属性与 css 属性的不同点

- `fill:` 填充色
- `stroke:` 描边色
- `stroke-width:` 描边色的宽度

## 语法

```js
<svg width="100" height="100">
  <circle id="myClrcle" cx="50" cy="50" r="50"></circle>
</svg>
```

1. svg 代码都放在顶层标签`svg`之中
2. svg 的`width`和`height`指定 svg 元素在 Html 元素中所占据的宽度和高度，如果不指定这 2 个属性，svg 默认图像大小是：`width=300px,height=150px`
3. 如果只展示一部分的 svg 则需要指定`viewBox`属性，`viewBox`属性有 4 个值，分别标识左上角的横坐标和纵坐标，视口的宽度和高度，如`viewBox(50,50, 40,30)`

## SVG 标签

### circle 圆形

1. `circle`代表圆形
2. 有`cx cy r`分别代表为`横坐标 纵坐标 半径`，单位是：像素，坐标都是相对于`svg`的左上角原点的
3. `class`指定对应的`css`类
<!-- <code src="./index.tsx"></code> -->

```tsx
import React from 'react';
import { SVg } from 'dumi-blog-will';

export default () => <SVg />;
```

### line 直线

1. `line`代表直线
2. `line`的`x1 y1`代表线段的起点的横坐标和纵坐标，`x2 y2`代表线段终点的横坐标和纵坐标

```tsx
import React from 'react';
import { Line } from './index.tsx';

export default () => <Line />;
```

### polyline 折线

1. `polyline`代表折线
2. `points`代表每个端点的坐标，横坐标与纵坐标之间用逗号分隔，点与点之间用空格分隔

```tsx
import React from 'react';
import { Polyline } from './index.tsx';

export default () => <Polyline />;
```

### rect 矩形

1. `rect`代表举行
2. `x y`代表矩形左上角端点的横坐标和纵坐标，`width`和`height`指定矩形的宽度和高度（单位像素）

```tsx
import React from 'react';
import { Rect } from './index.tsx';

export default () => <Rect />;
```

### ellipse 椭圆

1. ellipse 属性：`cx cy`指定椭圆的中心点横坐标和纵坐标，`rx ry`指定椭圆的横向轴和纵向轴的`半径`(单位像素)

```tsx
import React from 'react';
import { Ellipse } from './index.tsx';

export default () => <Ellipse />;
```

### Polygon 多边形

1. `points`代表每个端点的坐标，横坐标与纵坐标之间用逗号分隔，点与点之间用空格分隔

```tsx
import React from 'react';
import { Polygon } from './index.tsx';

export default () => <Polygon />;
```

### path 绘制路径

1. `d`: 表示绘制的顺序，值是一个长字符串，每一个字母表示一个绘制动作，后面跟着坐标
2. `M`: 移动到(moveto)
3. `L`: 画直线到(lineto)
4. `Z`: 闭合路径

```tsx
import React from 'react';
import { Path } from './index.tsx';

export default () => <Path />;
```

### text 绘制文本

1. `x y`: 表示文本区块基线起点的横坐标和纵坐标

```tsx
import React from 'react';
import { Text } from './index.tsx';

export default () => <Text />;
```

### use 复制一个形状

1. `href`: 指定要复制的节点
2. `x y`: 是`use`左上角的坐标

```tsx
import React from 'react';
import { UseSvg } from './index.tsx';

export default () => <UseSvg />;
```

### g 组

- 将多个形状组成一个组（group），方便复用

```tsx
import React from 'react';
import { Group } from './index.tsx';

export default () => <Group />;
```

### defs

- `defs`标签用于自定义形状，它的内部代码不会显示，仅供应用

```tsx
import React from 'react';

export default () => {
  return (
    <div>
      <svg width="200" height="100" viewBox="0 0 30 30">
        <defs>
          <g id="myCircle">
            <text x="25" y="20">
              圆形
            </text>
            <circle cx="10" cy="20" r="5" />
          </g>
        </defs>

        <use href="#myCircle" x="0" y="0" />
        <use href="#myCircle" x="12" y="0" fill="blue" />
        <use href="#myCircle" x="22" y="0" fill="white" stroke="blue" />
      </svg>
    </div>
  );
};
```

### pattern

- `pattern`标签用于自定义一个形状，该形状可以被引用来平铺一个区域

```tsx
import React from 'react';

export default () => (
  <div>
    <svg width="500" height="500">
      <defs>
        <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle fill="red" cx="50" cy="50" r="35" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
    </svg>
  </div>
);

// <pattern>标签将一个圆形定义为dots模式。patternUnits="userSpaceOnUse"表示<pattern>的宽度和长度是实际的像素值。然后，指定这个模式去填充下面的矩形。
```

### image

- 用于插入图片文件
- `xlink:href 已弃用`，改用`href`

```tsx
import React from 'react';

export default () => (
  <div>
    <svg viewBox="0 0 50 50" width="50" height="50">
      <image
        href={'https://raw.githubusercontent.com/wxfwill/blog-img/main/logo.png'}
        width="100%"
        // height="50%"
      />
    </svg>
  </div>
);
```

## [参考连接]

1. [SVG 图像入门教程](https://www.ruanyifeng.com/blog/2018/08/svg.html)
2. [mdn](https://developer.mozilla.org/en-US/docs/Web/SVG)
