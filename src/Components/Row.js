import React, { Children } from 'react'
import { Row as AntdRow } from 'antd'
import styled from 'styled-components'

export const Row = (props) => {
  return (
    <StyledRow gutter={props.gutter} style={props.style}>
      {props.children}
    </StyledRow>
  )
}

const StyledRow = styled(AntdRow)`
margin-left:0 !important;
margin-right:0 !important;
`;