import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
const dateFormat = 'YYYY/MM/DD';

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
export const CLOCK = () => (
  <Space direction="vertical" size={12}>
    <DatePicker defaultValue={dayjs()} format={dateFormat} />
    {/* <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} /> */}
  </Space>
);
