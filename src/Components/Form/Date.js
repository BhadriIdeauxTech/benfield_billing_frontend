import React from 'react'
import { DatePicker as AntdDatePicker } from 'antd'
import styled from 'styled-components'
import moment from 'moment';

const StyledDatePicker = styled(AntdDatePicker)`
width:100%;
height:40px;

`;
export const Date = ({ value, onChange, ...props }) => {

    const handleChange = (date, dateString) => {
        onChange(moment(dateString));
      };
  return (
    <StyledDatePicker onChange={handleChange} {...props}/>
  )
}


