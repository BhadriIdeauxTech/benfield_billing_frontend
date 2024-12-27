import React from 'react'
import styled from 'styled-components'
import { THEME } from '../../theme';

export const Titles  = styled.div`
    & h2 {
        font-size: 32px;
        color: ${THEME.primary_color};
        font-weight: 700;
        font-variant: small-caps;
        text-transform: capitalize;
        margin-bottom:10px;
        text-align:center;
    }
`;

export const TopTitle = ({Heading}) => {
  return (
    <Titles>
        <h2>{Heading}...</h2>
    </Titles>
  )
}

