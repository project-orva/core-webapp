import React from 'react';
import Rtc from './index';
import Trace from './rtc-network-trace';
import TraceInformation from './trace-information';

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

export const networkTrace = () => (
  <div style={{ height: 200}}>
    <Trace trace={{ totalDuration: 520, services: [{
      name: 'service 1',
      duration: 300,
      error: undefined,
      timeStart: ~~(Date.now() / 1000),
      timeEnd: ~~(Date.now() / 1000) + (300 / 1000),
    }, {
      name: 'service 2',
      duration: 220,      
      timeStart: ~~(Date.now() / 1000),
      timeEnd: ~~(Date.now() / 1000) + (220 / 1000),
      error: "Error: Request Timeout"
    }]}}/>
  </div>
)

export const traceInformation = () => (
  <div style={{ height: 200}}>
    <TraceInformation totalDuration={520} serviceCount={2} serviceTrace={{
      name: 'service 1',
      duration: 300,
      error: undefined,
      timeStart: ~~(Date.now() / 1000),
      timeEnd: ~~(Date.now() / 1000) + (300 / 1000),
    }} />
  </div>
)
