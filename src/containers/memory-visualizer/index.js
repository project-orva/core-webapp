import React from 'react';
import { Line } from 'react-chartjs-2';
import { data } from './mock-data';

import Layout from 'containers/layout';
import './memory.scss';

const MemoryVisualizer = () => {
  return (
    <div className='memory'>
      <Line data={data} />
    </div>
  );
};

export default Layout(MemoryVisualizer);
