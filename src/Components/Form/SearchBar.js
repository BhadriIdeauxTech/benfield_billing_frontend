
import { Input, Form } from 'antd';
import React from 'react'
import styled from 'styled-components'

const { Item } = Form

const {Search} = Input;


  export const Searched = styled(Search)`
  border-radius: 10px !important;
  padding-top: 5px !important;
  `;



 
export const SearchBar = ({ width,

}) => {
    const onSearch = (value) => {
        console.log(value);
      }  
    return (
        <div>
            
            <Searched
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      style={{
        width: 200,
     
      }}
    />

        </div>
    )
}


