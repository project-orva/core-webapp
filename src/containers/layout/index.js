import React from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const LayoutHOC = (Component) => {
    return (props) => (
        <Layout
            style={{ height: '100vh' }}
        >
            <Header className="header">
                <div className="logo" style={{
                    backgroundImage: `url('${process.env.PUBLIC_URL}/assets/logo.png')`,
                    height: 55,
                    width: 55,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    marginTop: 3,
                    marginLeft: 20
                }} />
                
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">
                        <Icon type="profile" />
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={250} style={{ background: '#fff'}}>
                    <Menu
                        mode="inline"
                        defaultOpenKeys={['sub1']}
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%', borderRight: 0, marginTop: 10 }}
                    >
                        <Menu.Item key="1">Analytics Dashboard</Menu.Item>
                        <Menu.Item key="2">Accounts</Menu.Item>
                        <Menu.Item key="3">Core Real-Time-Chat</Menu.Item>
                        <SubMenu
                            key="sub1"
                            title="Visualization Tools"
                        >
                            <Menu.Item key="sub1">Memory Visualizer</Menu.Item>
                            <Menu.Item key="sub2">Profile Visualizer</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Component {...props} />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LayoutHOC;
