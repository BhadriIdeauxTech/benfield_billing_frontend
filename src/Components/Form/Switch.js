import React from 'react'
import { Switch as AntdSwitch, Form } from 'antd'
import styled, { css } from 'styled-components'
import Flex from '../Flex'

const FlexWrapper = styled(Flex)`

`;

const StyledSwitch = styled(AntdSwitch)`
  box-shadow: none !important;
  background:red;
`
const LabelWrapper = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin:auto 10px ;
`;

const Switch = ({ label2, label, name, defaultChecked, checked, onChange, state, valuePropName, ...rest }) => {

  return (
    <Form.Item name={name} valuePropName={valuePropName} style={{ margin: 'auto 0' }}>
        <StyledSwitch onChange={onChange} checked={checked} defaultChecked={defaultChecked} {...rest} />
    </Form.Item>
  )
}

export default Switch
