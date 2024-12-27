import React from 'react'
import styled from 'styled-components'
import { THEME } from "../../theme";

export const BoxStyle = styled.div`

width:60%;
height: 250px;
margin: 100px 200px 200px 200px;
/* background:var(--light-color); */
border-radius:20px;
box-shadow:${THEME.form_box_shadow};

& h1 {
    margin: 17px 300px;
    }
`;

