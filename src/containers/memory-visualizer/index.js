import React from 'react';
import { Line } from 'react-chartjs-2';
import { data } from './mock-data';
import { request } from 'graphql-request';

import Layout from 'containers/layout';
import './memory.scss';

const MemoryVisualizer = () => {
  return (
    <div className='memory'>
      <Line data={data} />
    </div>
  );
};

const query = `
  query UserProfile {

  }
`;
request('http://localhost:3006/graphql', query)
  .then(res => console.log(res))
  .catch(err => console.error(err));

export default Layout(MemoryVisualizer);
