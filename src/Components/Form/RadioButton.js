/* eslint-disable */
import React, { useState } from 'react'
import { Radio as AntdRadio } from 'antd'
import { THEME } from '../../theme'
import styled from 'styled-components'

const StyledRadio = styled(AntdRadio)`
  width: 100%;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${THEME.HEADING};
  .ant-radio-input:focus + .ant-radio-inner {
    box-shadow: none !important;
  }
`

const Radio = ({ onChange, data,name, ...rest }) => {

  const [checked, setChecked] = useState(data[0].value)

  const handleOnChange = (e) => {
    onChange(e)
    setChecked(e.target.value)
  }

  console.log(checked,'checked')

  return (
    // <StyledRadio {...rest} onChange={onChange}>
    //   {label}
    // </StyledRadio>
    <StyledRadio.Group name={name} onChange={handleOnChange} >
      {data.map((radio) => (
        <StyledRadio key={radio.value} value={radio.value}>{radio.label}</StyledRadio>
      ))}
    </StyledRadio.Group>
  )
}
export default Radio
