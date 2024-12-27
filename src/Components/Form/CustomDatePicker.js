import { DatePicker as AntdDatePicker, Form } from 'antd'
import styled from 'styled-components'
import { THEME } from '../../theme'
import Label from './Label'
import { Fragment } from 'react';
import dayjs from 'dayjs';


const dateFormat = 'YYYY/MM/DD';

const { Item } = Form

const StyledItem = styled(Item)`
  > div {
    width: 100%;
    text-align: left;
    /* align-items:center; */
  }
  border-radius: 10px;
    margin-bottom: 5px !important;
    
  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
  }
  & .ant-picker   {
    border: 1px solid ${THEME.primary_color} !important;
    border-radius: 10px;
  } 
  & .ant-form-item-label > label > span {
   
    font-weight: 600 !important;
    position: relative;
    font-size: 14px;
    letter-spacing: 0.01em;
  }
`
const AntdDatePickerStyle = styled(AntdDatePicker)`
width:100%;
height:40px;
`
export const CustomDatePicker = ({
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

    const handleChange = (date, dateString) => {
        onChange(dayjs(dateString).format('YYYY-MM-DD'));
        // onChange(dayjs());
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
            disabled={disabled}
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
            <AntdDatePickerStyle onChange={handleChange} />
        </StyledItem>
    )
}


// If you want Initial Value on Date Picker import following code

// import dayjs from 'dayjs';



// ======  Selected Date ========
//   const [selectedDate, setSelectedDate] = useState(null);

// const handleOnChange = (date) => {
//     setSelectedDate(date);
// };

// initialValues={
//     {
//       selected_date:dayjs()
//     }
//   }

// <Col span={24}>
// <CustomDatePicker
//   label={'Selected Date'}
//   name={'selected_date'}
//   onChange={handleOnChange}
//   rules={[
//     {
//       required: true,
//       message: 'Please select Date!',
//     }
//   ]} />
//   <h1>{selectedDate}</h1>
// </Col>