import { DatePicker as AntdDatePicker, Form } from 'antd'
import styled from 'styled-components'
import { THEME } from '../../theme'
import Label from './Label'
import { Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const dateFormat = 'YYYY-MM-DD';
const ResultDateFormat = 'YYYY-MM-DD';
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

const { RangePicker } = AntdDatePicker;
const { Item } = Form

const StyledItem = styled(Item)`
  > div {
    width: 100%;
    text-align: left;
    /* align-items:center; */
  }
  border-radius: 10px;
  margin-bottom: -5px !important;
  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
  }
  & .ant-form-item-label > label > span {
   
    font-size: 0.95rem;
    font-weight: 500 !important;
  }
`
const AntdDateRangePickerStyle = styled(RangePicker)`
width:100%;
height:40px;
`
export const CustomDateRangePicker = ({
    initialValue,
    label,
    type,
    name,
    rules,
    onChange,
    placeholder,
    required,
    disabled,
    width,
    minWidth,
    height,
    value,
    showSearch,
    marginRight,
    labelStyle,
    defaultValue,
    optional,
    format,
    noStyle = undefined,
    ...rest
}) => {

    const [dateRange, setDateRange] = useState([]);

    useEffect(() => {
        if (value) {
            setDateRange(value);
        }
    }, [value]);

    const handleChange = (dates, dateStrings) => {
        // const startDate = dayjs(dateStrings[0], dateFormat);
        // const endDate = dayjs(dateStrings[1], dateFormat);
        // const range = [startDate.format(ResultDateFormat)+ ',' + endDate.format(ResultDateFormat)];
        // setDateRange(range);
        const startDate = dayjs(dateStrings[0]).format('YYYY-MM-DD');
        const endDate = dayjs(dateStrings[1]).format('YYYY-MM-DD');
        // const range = [`${startDate},${endDate}`];
        const range = startDate+ ',' + endDate;

        console.log('range',range)
        const rangeArray = range.split(",");
        console.log('rangeArray',rangeArray)
        setDateRange(rangeArray);
        onChange(rangeArray);
    };

    return (
        <StyledItem
            style={{
                width: width,
                marginRight: marginRight,
                minWidth: minWidth
            }}
            rules={rules}
            noStyle={noStyle}
            name={name}
            colon={false}
            required={false}
            label={
                label && (
                    <Fragment>
                        <Label required={required} labelStyle={labelStyle}>
                            {label} <span>{optional}</span>
                        </Label>
                    </Fragment>
                )
            }
        >
            <AntdDateRangePickerStyle value={dateRange} onChange={handleChange} />
        </StyledItem>
    )
}


//  ==================  Working with Date Range Picker

// import { CustomDateRangePicker } from '../../../Components/Form/CustomDateRangePicker'
// import dayjs from 'dayjs';

// const [dateRange, setDateRange] = useState([]);

// ==========  Date Range Change =======

//   const handleDateRangeChange = (dates) => {
//     setDateRange(dates);
//   };
//   console.log(dateRange, 'range   ==')


// ======  Setting initial Value  =========

// const rangeValue = [dayjs('2022-01-01'), dayjs('2022-01-07')];


// initialValues={
//     {
//       range:rangeValue,
//     }
//   }

{/* <CustomDateRangePicker
    onChange={handleDateRangeChange}
    value={dateRange}
    label={'Range'}
    name={'range'}
    rules={[{ required: true, message: 'Please enter a number' }]} /> */}