import React from 'react';
import { compose, withProps, withHandlers, withState } from 'recompose';

import Layout from './layout';

const enhance = compose(
    withProps(({ location }) => {
        return {
            selectedKeys: [location.pathname.split('/')[1]]
        }
    }),
    withHandlers({
        onMenuItemClick: ({ history }) => ({key}) => {
            history.push(`/${key}`)
        }
    }),
);

const LayoutHOC = (Component) => {
    return enhance(({ selectedKeys, onMenuItemClick, ...props }) => (
        <Layout {...{selectedKeys, onMenuItemClick}}>
            <Component {...props} />
        </Layout>
    ));
};

export default LayoutHOC;
