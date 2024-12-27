import React from 'react'
import { Divider as AntdDivider} from 'antd';
import styled from 'styled-components';

export const Divider = ({type}) => {
  return (
    <StyledDivider type={type}/>
  )
}


const StyledDivider = styled(AntdDivider)`
`
