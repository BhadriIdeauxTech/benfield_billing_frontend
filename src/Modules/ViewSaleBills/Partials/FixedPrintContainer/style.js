import styled from "styled-components";

export const PrintWrapper = styled.div`
    height:100%;
    display:flex;
    justify-content:space-between;
    flex-direction:column;
    h1 {
        font-size:14px;
        text-align:center;
        text-transform:uppercase;
        font-weight:600;
        margin-bottom:10px;
    }

    & .wrapper{
        flex:1;
        .border{
            border:1px solid black;
            height:'100%';
            height: calc(100% - 16px);
            display: flex;
            flex-direction: column;
            justify-content:space-between;
        }
    }
`

export const BoxHolder = styled.div`
    border-right:${props=>props.right ? '1px solid black' : 'none'};
    border-bottom:${props=>props.bottom ? '1px solid black' : 'none'};
    height: 100%;
`

export const Box = styled.div`
    border:${props=>props.border ? '1px solid black' : 'none'};
    border-left:${props=>props.left ? '1px solid black' : 'none'};
    border-right:${props=>props.right ? '1px solid black' : 'none'};
    border-top:${props=>props.top ? '1px solid black' : 'none'};
    border-bottom:${props=>props.bottom ? '1px solid black' : 'none'};
    padding:5px;
    height:100%;
    display:${props=>props.flex ? 'flex' : 'block'};

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
export const TableWrapper = styled.div`
    border-block:1px solid black;
    height:100%;
    display:flex;

    & .tableborder{
        border-right:1px solid black;
        flex:auto;
        text-align:center;

        :last-child{
            border:none;
        }

        .content__wrapper{
            height:100%;
            display:flex;
            flex-direction:column;
            justify-content:space-between;

            .header__content{
                border-bottom:1px solid black;
                font-size:14px;
                font-weight:400;
                padding:5px;
            }
            .body__content{
                padding:5px;
                flex:1;
                /* background:red; */
                h6{
                    font-size:12px;
                    font-weight:400;
                }
                h5{
                    font-size:12px;
                    font-weight:600;
                }
                h4{
                    font-size:12px;
                    font-weight:600;
                }
            }

            .footer__content{
                /* margin-top:auto; */
                border-top:1px solid black;
                height:30px;
                padding:5px;
                h6{
                    font-size:12px;
                    font-weight:400;
                }
                h5{
                    font-size:12px;
                    font-weight:600;
                }
            }
        }
    }
`;
export const BillTable = styled.div`
    & table thead tr th{
        font-size:10px !important;
    }

    & table tbody tr td{
        font-size:12px !important;
    }

    & tbody tr td{
        /* background:red; */
        border:none !important;
        border-right:1px solid black !important;
    }

    table {
    width: 100%;
    border-collapse: collapse;
    /* margin-bottom:20px !important; */
    /* border:1px solid black; */

    }

    th {
    /* border-bottom: 1px solid black;
    border: 1px solid black; */
    }

    td {
    text-align: center;
    /* border: 1px solid black; */
    }
    tbody {
    border: none;
  }
`;


export const FooterWrapper =styled.div`
height:auto;
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