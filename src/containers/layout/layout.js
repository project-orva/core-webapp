import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';

const { Header, Content, Sider } = Layout;

const DefaultLayout = ({ children: Children, breadcrumbs = ['Home'], selectedKeys, onMenuItemClick, logout = () => {} }) => (
    <Layout
        style={{ height: '100vh' }}
    >
        <Header className="header">
            <div className="logo" style={{
                backgroundImage: `url('${process.env.PUBLIC_URL}/assets/logo.png')`,
                height: 50,
                width: 50,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                marginTop: 5,
                marginLeft: 20
            }} />
            <div style={{ position: 'absolute', right: 25, top: 0, size: 20 }}>
                <Dropdown overlay={(
                    <Menu>
                        <Menu.Item onClick={logout}>
                            Log out
                        </Menu.Item>
                    </Menu>
                )}>
                    <div style={{ color: 'white', fontSize: 20, cursor: 'pointer'}}>
                        <Icon type="user" />
                    </div>
                </Dropdown>
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
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
                    {
                        breadcrumbs.map(breadcrumb => (
                            <Breadcrumb.Item key={breadcrumb}>{breadcrumb}</Breadcrumb.Item>
                        ))
                    }
                </Breadcrumb>
                <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        position: 'relative',
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
