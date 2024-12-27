import styled from "styled-components";
import { THEME } from "../../../theme";


export const OverHid = styled.div`
height: 320px;
overflow-y: auto;
`;

export const CardDesign = styled.div`
/* background-color: ${props=>props.bgColor || 'black'}; */
color: ${THEME.orange};
padding: 10px;
text-align: center;
border-radius: 10px;
border: 1px solid ${THEME.orange};
background-color: var(--light-color);

& h5 {
    font-size: 17px;
    font-weight: 500;
}
& h4 {
    font-size: 20px;
    font-weight: 600;
    padding: 10px 0;
}
&:hover {
    border: 1px solid var(--light-color);
background-color: ${THEME.secondary_color};
color:  var(--light-color);
}

`;