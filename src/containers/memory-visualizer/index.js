import React from 'react';
import { Line } from 'react-chartjs-2';
import { data } from './mock-data';
import { request } from 'graphql-request';
import ApolloClient, { gql } from 'apollo-boost';

import Layout from 'containers/layout';
import './memory.scss';

const MemoryVisualizer = () => {
  return (
    <div className='memory'>
      <Line data={data} />
    </div>
  );
};
const client = new ApolloClient({
  uri: 'http://localhost:3006/graphql'
});
const query = gql`
  {
    accounts(limit: 5, offset: 0) {
      accountDetails {
        createdOn
        role
        name
        id
      }
    }
  }

  {
    memoriesForUser(id: "3", startTime: 1, endTime: 5, limit: 5, offSet: 1) {
      request
    }
  }
`;
client
  .query({ query })
  .then(({ data }) => console.log('data', data))
  .catch(console.error);

// request('http://localhost:3006/graphql', query)
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

export default Layout(MemoryVisualizer);
