import React, { Fragment } from 'react'
import { Select as AntdSelect, Form } from 'antd'
import styled from 'styled-components'
import { THEME } from '../../theme'
import Label from './Label'

const { Item } = Form
const { Option } = AntdSelect;

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
    font-weight: 600 !important;
    position: relative;
    font-size: 14px;
    letter-spacing: 0.01em;
  }
`
const AntdSelectStyle = styled(AntdSelect)`
margin-bottom:5px;
font-family:  'Poppins', sans-serif;
font-weight:600;
::placeholder {
  font-size: 16px;
}
height: ${props => (props.height ? props.height : '40px')};
border-radius: 10px;
box-shadow: none;
border-color: ${props => (props.error ? 'red' : '#e9e9e9')};
:focus {
  border-color: #e9e9e9;
  box-shadow: none;
}
:hover {
  border-color: #e9e9e9;
}
& .ant-select-selector {
    height:100% !important;
    border: 1px solid ${THEME.primary_color} !important;
    & input{
    height:100% !important;
    }
  }
  &.ant-input[disabled] {
    color: ${THEME.black};
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
  }
  & .ant-select-selection-item{
    margin:auto;
    font-size: 1rem;
    font-weight: 600;
  }
  & .ant-select-selection-placeholder { 
    margin:auto;
  }
`
export const Select = ({
  initialValue,
  label,
  type,
  name,
  rules,
  onChange,
  placeholder,
  required,
  disabled,
  options,
  width,
  minWidth,
  height,
  notFoundContent,
  value,
  showSearch,
  marginRight,
  labelStyle,
  defaultValue,
  optional,
  noStyle = undefined,
  ...rest
}) => {
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
      initialValue={initialValue}
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
     <AntdSelectStyle value={value} onChange={onChange} defaultValue={defaultValue} showSearch={showSearch} notFoundContent={notFoundContent} placeholder={placeholder} >
  {options.map((option, index) => (
    <Option key={`${option.value}_${index}`} value={option.value}>
      {option.label}
    </Option>
  ))}
</AntdSelectStyle>
    </StyledItem>
  )
}



{/* <Select options={GstOptions} label={'GST Type'} name={'gst_type'} placeholder={"GST Type"} defaultValue={'Unregistered/Consumer'} />         >>> FUTURE USE      */ }

{/* <Col lg={8} md={12} span={24}>                >>>  FUTURE USE
            <Select
              options={option}
              placeholder={'Party Group'}
              label={'Party Group'}
              name={'party_group'}
              showSearch={true}
              rules={[
                {
                  required: true,
                  message: 'Please enter Phone Party Group!',
                }
              ]}
              notFoundContent={<Button style={{ border: `1px solid ${THEME.PRIMARY}`, width: '100%', color: `${THEME.PRIMARY}`, }}
                onClick={() => {
                  setModalTitle("Add Party Group");
                  setModalContent(<ModalViewContent />);
                  showModal();
                }}><PlusCircleOutlined />
                New Group
              </Button>} />
          </Col> */}