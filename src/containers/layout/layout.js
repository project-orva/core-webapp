import React from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const DefaultLayout = ({ children: Children, selectedKeys, onMenuItemClick }) => (
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
            <Sider width={250} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    selectedKeys={selectedKeys}
                    defaultSelectedKeys={['dashboard']}
                    style={{ height: '100%', borderRight: 0, marginTop: 10 }}
                >
                    <Menu.Item onClick={onMenuItemClick} key="dashboard">Analytics Dashboard</Menu.Item>
                    <Menu.Item onClick={onMenuItemClick} key="accounts">Accounts</Menu.Item>
                    <Menu.Item onClick={onMenuItemClick} key="skills">Skills</Menu.Item>
                    <Menu.Item onClick={onMenuItemClick} key="orva-rtc">Core Real-Time-Chat</Menu.Item>
                    <Menu.Item onClick={onMenuItemClick} key="profile-visualizer">Memory Visualizer</Menu.Item>
                    <Menu.Item onClick={onMenuItemClick} key="memory-visualizer">Profile Visualizer</Menu.Item>
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
                    {
                        Children
                    }
                </Content>
            </Layout>
        </Layout>
    </Layout>
)

export default DefaultLayout;
