import styled from "styled-components";
import { THEME } from "../../../theme";
import { Row } from "../../../Components/Row";
import Button from "../../../Components/Form/Button";


export const Maindesign = styled.div`
background-color: var(--light-color);
width: 100%;
margin: 0 auto !important;
padding: 0 30px;
& h4 {
    margin: 5px 0;
}
& h3 {
    margin: 5px 0;
    color: ${THEME.primary_color};
    font-size: 26px;
    font-weight: 600;
}

.page-header,
.page-header-space {
  height: 100px;
}

.page-footer-space {
  height: 50px;
}

.footer_sign{
    border:1px solid black;
    padding:2px 5px;
    height:70px;    
    display:flex;
    flex-direction:column;
    justify-content:space-between;
}



@media print {
    .page-footer {
font-family:'Times New Roman', Times, serif !important;

  position: fixed;
  bottom: 0;
  left:0;
  width: 100%;
  padding: 0 30px;
}
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

export const PrintFixedWrapper = styled.div`
 page-break-before: auto !important;
    h1 {
        font-size:14px;
        text-align:center;
        text-transform:uppercase;
        font-weight:600;
        margin-bottom:10px
    }
    thead th {            
    border-bottom: none;
}
     @media print{     
      page-break-before: auto !important;
      .headerTopspace {
        position: relative;
        top: 10px !important;
      }

  table.container {
    /* @page{
  size: A4;
  margin-top: 50px;
  margin-bottom: 50px;
} */
     page-break-after: always  !important;
        /* margin-top:100px !important; */
        }
     thead.header{
      /* margin:0; */
   display: table-header-group !important;
   top:100 !important;
   height:100px;
  }

    .Container{
       bottom:0;
       width:100%;
    }
        .footer{
          color:white;
          /* position: fixed;  */
    /* bottom: 0; */
    /* left: 0; */
    /* right: 0;  */
    /* display: block; */
    /* padding: 10px 0; */
    /* border-top: 2px solid #0095c8; */
    /* text-align: center; */
           /* width:100%; */
    }
    }

   
`
export const Box = styled.div`
background-color: ${THEME.secondary_color};
margin: 5px 0;
padding: 20px 10px;
`;
export const Reverse = styled(Row)`
  @media (maxWidth: '500px') {
    display: flex;
     flex-direction: column-reverse;
   }
`;


export const Buttondesn = styled(Button)`
border: 1px solid #8056F7;
padding: 10px 10px;
line-height: 5px;
&:hover{
  background-color: var(--light-color);
  color: #8056F7;
}
`;

export const Cardsin = styled.div`
border: 1px solid;
border-bottom:none;
width: 100%;
/* padding: 10px; */
`;


export const Borderdesin = styled.div`
border: 1px solid;
/* border-right: 1px solid; */
`;

export const Tablecss = styled.div`
table {
  width: 730px;
  height: 200px;
  border-collapse: collapse;
  border:1px solid black;
}

th {
  border-bottom: 1px solid black;
  border: 1px solid black;
}

td {
  text-align: center;
  border: 1px solid black;
}
`;

export const BillTable = styled.div`
& table thead tr th{
    font-size:12px !important;
}

& table tbody tr td{
    font-size:12px !important;
}

@media print {
    
}
table {
  width: 100%;
  height: 200px;
  border-collapse: collapse;
  padding: 2px;
  margin-bottom:20px !important;
  border:1px solid black;

}

th {
  border-bottom: 1px solid black;
  border: 1px solid black;
}

td {
  text-align: center;
  border: 1px solid black;
}
`;