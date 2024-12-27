import styled from "styled-components";
import { Row } from "../../../Components/Row";

export const SaleHeader = styled.header`
background:var(--light-color);
height:50px;
padding-left:20px;
display:flex;
align-items:center;
margin-bottom:20px;
`;




export const Maindesign = styled.div`
background-color: var(--light-color);
width: 100%;
margin: 0 auto !important;
padding: 20px 30px;
& h4 {
    margin: 5px 0;
}
& h3 {
    margin: 5px 0;
    color: #8056f7;
    font-size: 30px;
    font-weight: 600;
}

.page-header,
.page-header-space {
  height: 100px;
}

.page-footer-space {
  height: 50px;
}

.page-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.page-header {
  position: fixed;
  top: 0mm;
  width: 100%;
}
.page {
  page-break-after: always !important;
  height: 20vh;
  margin-top: 52%;
}

@media print {
  thead {
    display: table-header-group;
  }
  tfoot {
    display: table-footer-group;
  }
}
`;


export const Box = styled.div`
background-color: #8056f7;
margin: 5px 0;
padding: 20px 10px;
`;
export const Reverse = styled(Row)`
  @media (maxWidth: '500px') {
    display: flex;
     flex-direction: column-reverse;
   }
`;
