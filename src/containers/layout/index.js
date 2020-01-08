import React from 'react';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import Layout from './layout';

const enhance = compose(
    connect(({ }) => ({}), {
        clearCreds: () => ({
            type: 'CLEAR_CREDS'
        })
    }),
    withProps(({ location }) => ({
        selectedKeys: [location.pathname.split('/')[1]]
    })),
    withHandlers({
        onMenuItemClick: ({ history }) => ({ key }) => {
            history.push(`/${key}`);
        },
        logout: ({ history, clearCreds }) => () => {
            clearCreds();
            history.push('/login');
            debugger;
        }
    }),
);

const LayoutHOC = (Component) => {
    return enhance(({ selectedKeys, onMenuItemClick, logout, ...props }) => (
        <Layout {...{ selectedKeys, onMenuItemClick, logout }}>
            <Component {...props} />
        </Layout>
    ));
};

export default LayoutHOC;
