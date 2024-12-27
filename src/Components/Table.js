import React from 'react'
import { Table as AntdTable } from 'antd';
import styled from 'styled-components';
import { THEME } from '../theme';

export const Table = ({ columns, data, footer, components, pagination, rowKey }) => {
  return (

    <div style={{ maxWidth: '100%', overflowX: 'auto',padding:'10px 0'}}>
      <StyledTable footer={footer} columns={columns} dataSource={data} key={rowKey} components={components} bordered={true} pagination={pagination} />
    </div>

  )
}

export const DeleteButtonWrapper = styled.div`
  opacity: 0;
  transition:0.5s;
`;

const StyledTable = styled(AntdTable)`
/* width:100% !important; */
tr{
  transition:0.5s;
  border-style: double;
}
tr:hover ${DeleteButtonWrapper} {
    opacity: 1;
  }
.ant-table-thead {
    background: ${THEME.primary_color} !important;
  }
  .ant-table-tbody {
    background: ${THEME.white} !important;
  }
  & .ant-table-thead > tr >th{
    color: ${THEME.white};
    font-weight: 600;
    background: transparent;
    text-align:center !important;
  }
  .ant-table-tbody >tr >td {
    border-style: double;
    color: ${THEME.primary_color};
  }
  .ant-table-tbody >tr  {
    /* border-style: double; */
    color: ${THEME.primary_color};
  }
  .ant-table-content >table {
    border-top: 1px solid ${THEME.primary_color};
    border-style: double;
    border-color: ${THEME.primary_color} !important;
}
`;

