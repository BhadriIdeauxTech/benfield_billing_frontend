import styled from "styled-components";


export const CardOnTop = styled.div`
margin:5px;
background:white;
padding:15px;
`;
export const CardForPaid = styled.div`
background:lightblue;
width:150px;
height:70px;
border-radius:10px;
& h1{
    text-align:center;
}
`;


export const CardForUnPaid = styled.div`
background:lightgrey;
width:150px;
height:70px;
border-radius:10px;
& h1{
    text-align:center;
}
`;


export const CardForTotal = styled.div`
background:lightgreen;
width:150px;
height:70px;
border-radius:10px;
& h1{
    text-align:center;
}
`;


export const CardOnBottom = styled.div`
margin-top:50px;
width:100%;
height:120px;
background:white;
// padding:05px;

& h1{
margin-top:20px;
}
 `;


export const AddSaleButton = styled.button`
margin-top:35px;
width:150px;
height:35px;
background:blue;
border-radius:7px;
color:white;
`;
export const TableStyle = styled.div`
display:block;
width:100%;
`;

export const CardForPayment = styled.div`
background:lightgreen;
width:150px;
height:70px;
border-radius:10px;
& h1{
    text-align:center;
}
`;

export const CardDesign = styled.div`
/* background-color: ${props=>props.bgColor || 'black'}; */
color: #fff;
padding: 10px;
text-align: center;
border-radius: 10px;
& h5 {
    font-size: 17px;
    font-weight: 500;
}
& h4 {
    font-size: 20px;
    font-weight: 600;
    padding: 10px 0;
}
&.red{
    background:var( --unpaid-color);
}
&.green{
    background:var( --paid-color);
}
&.yellow{
    background:var( --total-color);
}
`;