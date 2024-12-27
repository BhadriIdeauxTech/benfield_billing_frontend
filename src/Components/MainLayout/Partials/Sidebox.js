import React, { Children } from 'react'

import { Col, Select } from 'antd';
import { Row } from '../../../Components/Row';
import {TiContacts} from 'react-icons/ti'
import { SideLIst } from './Styled';

const { Option } = Select;

export const Sidebox = ({sideBox}) => {
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function handleBlur() {
    console.log('blur');
  }

  function handleFocus() {
    console.log('focus');
  }

  function handleSearch(val) {
    console.log('search:', val);
  }
  return (
    <SideLIst>
      {sideBox}
    </SideLIst>
  )
}
