import React from 'react';

import Layout from 'containers/layout';
import enhance from './enhance-analytics-dashboard';

import ServicesHealthDisplay from 'components/services-health-display';

const AnalyticsDashboard = enhance(({ servicesHealth }) => (
    <>
        Analytics Dashboard

        Active Users


        Service Health
        
        <ServicesHealthDisplay
            servicesHealth={servicesHealth}
        />
    </>
));

export default Layout(AnalyticsDashboard);
