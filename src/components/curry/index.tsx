import * as React from 'react';
import { Button } from 'antd';

export interface CurryProps {
  x: number;
  y: number;
}

const Curry: React.FC = () => {
  var add = function ({ x, y }: CurryProps): number {
    return x + y;
  };
  let res = add({ x: 3, y: 5 });
  console.log(res);
  return (
    <div>
      <Button type="primary">Curry测试</Button>
    </div>
  );
};

export default Curry;
