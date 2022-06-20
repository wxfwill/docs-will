import * as React from 'react';
import { Button } from 'antd';
import './svg.css';

export interface CurryProps {
  x: number;
  y: number;
}

const SVg: React.FC = () => {
  var add = function ({ x, y }: CurryProps): number {
    return x + y;
  };
  let res = add({ x: 3, y: 5 });
  console.log(res);
  return (
    <div>
      <svg width={100} height={100}>
        <circle cx={20} cy={20} r={10} className="circle"></circle>
      </svg>
      <Button type="primary">circle圆</Button>
    </div>
  );
};

const Line: React.FC = () => {
  return (
    <div>
      <svg width={300} height={150}>
        <line x1={0} y1={0} x2="120" y2={0} className="line"></line>
      </svg>
      <Button type="primary">line直线</Button>
    </div>
  );
};

const Polyline: React.FC = () => {
  return (
    <div>
      <svg width={300} height={180}>
        <polyline points="3,3 30,28 3,53" fill="red" stroke="block" strokeWidth={2}></polyline>
      </svg>
      <Button type="primary">Polyline折线</Button>
    </div>
  );
};

const Rect: React.FC = () => {
  return (
    <div>
      <svg width={300} height={180}>
        <rect
          x={10}
          y={10}
          width={120}
          height={100}
          style={{ stroke: '#70d5dd', fill: '#dd524b', strokeWidth: 5 }}
        ></rect>
      </svg>
      <Button type="primary">rect矩形</Button>
    </div>
  );
};

const Ellipse: React.FC = () => {
  return (
    <div>
      <svg width={300} height={180}>
        <ellipse
          cx={60}
          cy={60}
          rx={40}
          ry={20}
          stroke="black"
          strokeWidth={2}
          fill={'red'}
        ></ellipse>
      </svg>
      <div className="test-flex">
        <span className="left">左边</span>
        <span className="left">左边</span>
        <span className="right">右边</span>
        <span className="right">右边</span>
      </div>
      <Button type="primary">ellipse椭圆</Button>
    </div>
  );
};

const Polygon: React.FC = () => {
  return (
    <div>
      <svg width={300} height={180}>
        <polygon
          points="0,0 80,0 100,90 40,10 0,0"
          fill="red"
          stroke="orange"
          strokeWidth={3}
        ></polygon>
      </svg>
      <Button type="primary">polygon多边形</Button>
    </div>
  );
};

const Path: React.FC = () => {
  return (
    <div>
      <svg width={300} height={180}>
        <path
          d="M 18,3 L 46,3 L 46,40 L 61,40 L 32,68 L 3,40 L18,40 Z"
          stroke="red"
          fill="silver"
          strokeWidth={3}
        ></path>
      </svg>
      <svg width={300} height={180}>
        <path
          d="M 20,6 L 63,3 L 36,45 L 62,40 L 32,35 L 3,40 L18,40 Z"
          stroke="red"
          fill="hotpink"
          strokeWidth={2}
        ></path>
      </svg>
      <Button type="primary">path绘制路径</Button>
    </div>
  );
};

const Text: React.FC = () => {
  return (
    <div>
      <svg width={300} height={180}>
        <text x={20} y={25} style={{ stroke: 'blue', strokeWidth: 1 }}>
          hello will
        </text>
      </svg>
      <Button type="primary">text绘制文字</Button>
    </div>
  );
};

const UseSvg: React.FC = () => {
  return (
    <div>
      <svg width={300} height={180} viewBox="0 0 50 20">
        <circle id="myCircle" cx={5} cy={5} r={4}></circle>
        <use href="#myCircle" x="12" y="0" fill="blue"></use>
        <use href="#myCircle" x={30} y={10} fill="white" stroke="blue"></use>
      </svg>
      {/* <svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
        <circle id="myCircle" cx="5" cy="5" r="4" />

        <use href="#myCircle" x="10" y="0" fill="blue" />
        <use href="#myCircle" x="20" y="0" fill="white" stroke="blue" />
      </svg> */}
      <Button type="primary">use复制一个形状</Button>
    </div>
  );
};

const Group: React.FC = () => {
  return (
    <div>
      <svg width={300} height={100}>
        <g id="myCircle">
          <text x="25" y="20">
            圆形
          </text>
          <circle cx="50" cy="50" r="20" fill="red" />
        </g>
        <use href="#myCircle" x={100} y={0} fill="blue"></use>
        <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
      </svg>
      <svg width="300" height="100">
        <g id="myCircle">
          <text x="25" y="20">
            圆形
          </text>
          <circle cx="50" cy="50" r="20" />
        </g>

        <use href="#myCircle" x="100" y="0" fill="blue" />
        <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
      </svg>
      <Button type="primary">g组</Button>
    </div>
  );
};

export { Line, Polyline, Rect, Ellipse, Polygon, Path, Text, UseSvg, Group };

export default SVg;
