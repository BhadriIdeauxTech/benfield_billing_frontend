import styled from "styled-components";

export const PrintWrapper = styled.div`
    height:100%;
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

    .wrapper{
        border:1px solid black;
        @media print{     
            margin: auto;
      .header {
        padding : 20px 0 20px 0;
        margin-bottom:20px;
        overflow :auto;
        }

    .Container{
       bottom:0;
       width:100%;
    }

        .footer{
          /* position: fixed;  */
    bottom: 0;
    /* left: 0; */
    /* right: 0;  */
    /* display: block; */
    /* padding: 10px 0; */
    /* border-top: 2px solid #0095c8; */
    /* text-align: center; */
           /* width:100%; */
    }
    }
    }

   
`

export const BoxHolder = styled.div`
    border-right:${props => props.right ? '1px solid black' : 'none'};
    border-bottom:${props => props.bottom ? '1px solid black' : 'none'};
    height: 100%;
   & h5 h6{

      text-align:${props => props.center && 'center'};
    }
`

export const Box = styled.div`
    border:${props => props.border ? '1px solid black' : 'none'};
    border-left:${props => props.left ? '1px solid black' : 'none'};
    border-right:${props => props.right ? '1px solid black' : 'none'};
    border-top:${props => props.top ? '1px solid black' : 'none'};
    border-bottom:${props => props.bottom ? '1px solid black' : 'none'};
    padding: 2px 5px;
    height:100%;
    display:${props => props.flex ? 'flex' : 'block'};


    h4{
        font-size:14px;
        font-weight:600;
        text-align:left;
    }

    h5{
        font-size:12px;
        font-weight:700;
        text-align:${props => props.center ? 'center' : 'left'};

    }
    p,h6{
        font-size:12px;
        font-weight:500;
        text-align:${props => props.center ? 'center' : 'left'};

         
    }
    .account_details_footer{
        display: flex !important;
        align-items:center!important; 
        margin-bottom: -6px;
        .account_label{
          width:150px;
        }
        .acount_value{
              font-weight:bold !important;  
        }

        & h3{
            font-size:11px !important;
              font-weight:500 !important;
         }
            & span{
            font-size:11px !important;
              font-weight:600 !important;
                
            }
    }

`
export const BillTable = styled.div`

 & table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid;
  }

  & table thead tr th {
    font-size: 10px !important;
    /* border-right: none; */
    border-bottom: 1px solid;
    /* border-top: none; */
  }

  & table thead tr th:first-child {
    border-left: none;
  }

  & table tbody tr {
    page-break-inside: avoid !important;
  }

  & table tbody tr:last-child {
    border-bottom: 1px solid;
    page-break-inside: avoid !important;
     border-collapse: collapse;
  }

  & tbody tr td {
    border: none !important;
    border-right: 1px solid black !important;
    page-break-inside: always;
  }

  & tbody tr td:last-child {
    border-right: none !important;
  }

  .footer_table {
    border-top: 1px solid black;
    width:100%;
     border-collapse: collapse;
  }

  @media print {
    & table tbody tr {
      page-break-inside: avoid !important;
    }

    & table tbody tr:last-of-type {
      border-bottom: 1px solid black !important;
    }
  }
`;

export const FooterWrapper = styled.div`
    h4{
        font-size:14px;
        font-weight:600;
        text-align:left;
    }

    h5{
        font-size:12px;
        font-weight:600;
        text-align:left;
    }
    p,h6{
        font-size:12px;
        font-weight:500;
        text-align:left;
    }
`

export const BottomFooterWrapper = styled.div`
margin:2px 0px;
border:1px solid;
/* border-bottom:none; */
    h3{
        font-size:14px;
        font-weight:600;
        text-align:left;
    }

    h4{
        font-size:12px;
        font-weight:600;
        text-align:left;
    }
    h5,p{
        font-size:12px;
        font-weight:500;
        text-align:left;
    }
    h6{
        font-size:10px;
        font-weight:500;
        text-align:left;
    }
`