import React from 'react';

import { Typography } from 'antd';

import Layout from 'containers/layout';
import ServicesHealthStatus from 'components/services-health-status';
import TimespanLinegraph from 'components/timespan-linegraph';
import enhance from './enhance-analytics-dashboard';

const AnalyticsDashboard = enhance(({ services }) => (
    <>
        <Typography.Title level={3}> Active Users </Typography.Title>
        <TimespanLinegraph  
            color="20, 120, 240"
            data={[1, 2, 3]}
            fill
        />

        <Typography.Title level={3}> Service Health </Typography.Title>
        
        <ServicesHealthStatus
            services={services}
        />
    </>
));

export default Layout(AnalyticsDashboard);
