import React from 'react';
import { Button, Dropdown as AntdDropdown } from 'antd';
import styled from 'styled-components';

const AntdDropdownStyle = styled(AntdDropdown)`
& .ant-btn{
    height:auto;
}
& .ant-btn >span{
    font-family:  'Poppins', sans-serif;
    font-size:.85rem;
    font-weight:600;
    text-transform:capitalize;
    letter-spacing: 1px;
}
&.ant-dropdown-menu .ant-dropdown-menu-title-content{
    font-size:1rem;
}
`

const AntdMenuButton = styled(Button)`
  height: auto;
  padding: 10px;
  display: flex;
  background: ${(props) => (props.bgColor ? "#eeeeee" : "#fff")};
  color: ${(props) => (props.bgColor ? "#000" : "#000")};
  &:hover,
  &:active,
  &:focus {
    color: #000;
    border-color: #000;
  }
`;

export const CustomDropDownButton = ({ icon, menu, trigger, bgColor, placement, text }) => {

    return (
        <AntdDropdownStyle menu={menu} trigger={trigger} placement={placement}>
            <AntdMenuButton bgColor={bgColor} type='default'>{text} {icon} 
            </AntdMenuButton>
        </AntdDropdownStyle>
    )
};


// ===================  Usage of DropDownButton ===============


// import { CustomDropDownButton } from '../../Components/Form/CustomDropDownButton'
// import { HiOutlineDotsVertical } from "react-icons/hi";

// const handleMenuClick = (e) => {
//     console.log('click', e);
// };

// const items = [
//     {
//         label: '1st menu item',
//         key: '1',
//     },
//     {
//         label: '2nd menu item',
//         key: '2',
//         danger: true,
//     },
// ];
// const menuProps = {
//     items,
//     onClick: handleMenuClick,
// };

// <CustomDropDownButton menu={menuProps} bgColor={'gray'} placement="bottomLeft" trigger={['click']} icon={<HiOutlineDotsVertical />} />
