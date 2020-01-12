import React from 'react';
import Rtc from './index';

export default {
  title: 'RTC',
};

export const populatedMessages = () => (
  <div style={{ height: '100vh'}}>
    <Rtc messages={[{
      sender: 'orva',
      message: 'What is up?'
    },
    {
      sender: 'bob',
      message: 'Nothing much'
    },
    {
      sender: 'orva',
      message: 'Awesome that is great'
    },
    {
      sender: 'orva',
      message: 'Awesome that is great'
    },
    {
      sender: 'orva',
      message: 'Awesome that is great'
    },
    {
      sender: 'bob',
      message: 'Awesome that is great'
    },
    {
      sender: 'orva',
      message: 'Awesome that is great'
    },
    {
      sender: 'orva',
      message: 'Awesome that is great'
    },{
      sender: 'bob',
      message: 'Please come and feed me meat'
    }]} />
  </div>
);

export const noMessages = () => (
  <div style={{ height: '100vh'}}>
     <Rtc />
  </div>
)
