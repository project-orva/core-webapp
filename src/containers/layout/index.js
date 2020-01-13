import React from 'react';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import Layout from './layout';

const enhance = compose(
    connect(undefined, {
        clearCreds: () => ({
            type: 'CLEAR_CREDS'
        })
    }),
    withProps(({ location }) => {
        const breadcrumbs = location.pathname.split('/');
        return {
            breadcrumbs: ['Home', ...breadcrumbs],
            selectedKeys: [breadcrumbs[1]],
        }
    }),
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
    return enhance(({ breadcrumbs, selectedKeys, onMenuItemClick, logout, ...props }) => (
        <Layout {...{ breadcrumbs, selectedKeys, onMenuItemClick, logout }}>
            <Component {...props} />
        </Layout>
    ));
};

export default LayoutHOC;
