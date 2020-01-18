import React from 'react';

import { Table, Tag } from 'antd';

export default ({ services }) => (
    <Table loading={services === undefined} pagination={false} dataSource={services} columns={[
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { 
            title: 'Status',
            dataIndex: 'isUp',
            key: 'isUp', 
            render: isUp => isUp ? <Tag color="green">Up</Tag> : <Tag color="red">Down</Tag>
        }
    ]}/>
)