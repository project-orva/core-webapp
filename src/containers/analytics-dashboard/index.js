import React from 'react';

import { Typography } from 'antd';

import Layout from 'containers/layout';
import ServicesHealthStatus from 'components/services-health-status';
import enhance from './enhance-analytics-dashboard';

const AnalyticsDashboard = enhance(({ services }) => (
    <>
        <Typography.Title level={3}> Service Health </Typography.Title>
        
        <div style={{ width: '40%', minWidth: 200 }}>
            <ServicesHealthStatus
                services={services}
            />
        </div>
    </>
));

export default Layout(AnalyticsDashboard);
