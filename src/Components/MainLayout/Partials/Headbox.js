import React, { useState } from 'react'
import { Date } from '../../../Components/Form/Date'
import moment from 'moment';
import { TopLIst } from './Styled';

export const Headbox = ({ headBox }) => {
  return (
    <TopLIst>
      {headBox}
    </TopLIst>
  )
}
