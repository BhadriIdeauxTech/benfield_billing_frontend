import React from 'react'
import { Tabs as AntdTabs } from 'antd';
import styled from 'styled-components';

export const Tabs = ({ items, onChange, defaultActiveKey }) => {

    console.log(defaultActiveKey, 'dddddddddddddd')
    return (
        <StyledTabs defaultActiveKey={defaultActiveKey} items={items} onChange={onChange} />
    )
}


const StyledTabs = styled(AntdTabs)`
/* margin-top:50px; */
& .ant-tabs-tab-btn{
    font-size:1rem;
    font-weight:600;
}

@media screen {
    
}
`