import React, { useMemo } from 'react';
import { Table } from 'antd';

export default ({ serviceTrace, totalDuration, serviceCount }) => {
  const dataSource = useMemo(() => {
    return Object.keys(serviceTrace).map((key) => ({
      key,
      value: serviceTrace[key]
    }));

  }, [serviceTrace])

  return (
    <div className="trace-information">
      <Table
        pagination={false}
        title={() => (<center> Service Trace Information </center>)}
        dataSource={dataSource}
        columns={[{
          title: '', dataIndex: 'key', key: 'key'
        },
        {
          title: '', dataIndex: 'value', key: 'value'
        }]}
      />
    </div>
  )
}