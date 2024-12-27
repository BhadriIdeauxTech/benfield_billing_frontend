import React from 'react'
import styled from 'styled-components'

const CustomStyle = styled.div`
    background:#fff;
    border-radius:20px;
    padding: 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width:${props=>props.width || '100%'};
    margin:auto;
`

export const CustomCard = ({width,children}) => {
  return (
    <CustomStyle width={width}>
        {children}
    </CustomStyle>
    )
}
