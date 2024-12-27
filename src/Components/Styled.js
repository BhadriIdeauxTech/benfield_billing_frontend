import styled from "styled-components";
import { THEME } from "../theme";

export const WelcomeWrapper = styled.div`
    background:${THEME.white};
    height:600px;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:6px;
    box-shadow:${THEME.form_box_shadow};
    flex-direction:column;
    gap:30px;
    color:${THEME.grey};
    & h2{
        font-size:1rem;
    }
`

export const SvgWrapper = styled.div`
    width:220px;
    height:168px;
    position:relative;
    & img{
        position: absolute;
        inset: 0;
        width: 100%;
        margin: auto;
    }
`

export const PrintSubTitle = styled.span`
font-size:${props=> props.Size || '12px'};
text-transform:${props=>props.UPPER ? 'uppercase' :'none'};
font-weight:${props=>props.Weight || '500' };
text-align:${props=>props.TextAlign};
letter-spacing:.5px;
text-decoration:${props=>props.Under};
`;

export const PrintTitle = styled.h5`
font-size:${props=> props.Size || '12px'};
text-transform:${props=>props.UPPER ? 'uppercase' :'none'};
font-weight:${props=>props.Weight || '500' };
text-align:${props=>props.TextAlign};
margin-top:${props=>props.MT};
text-transform: 'uppercase';
`;


export const TableIconHolder = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    cursor: pointer;

    & svg{
        font-size:${props => props.size || '15px'};
        color:${props => props.color || 'black'};
        cursor: pointer;
    }
`



export const TotalWrapper = styled.div`
  background:#f3f6ff;
  border-radius:6px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding:20px 0;
`

export const TotalInputWrapper = styled.div`
  /* background:red; */
  display:flex;
  flex-direction:column;
  
  & .wrapper{
    display:flex;
    height:40px;
  align-items:center;
  justify-content:space-between;
  gap:20px;
}
`

export const InputContent = styled.div`    
margin-bottom: 5px;
    height: 40px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    text-align: end;
    border: 1px solid rgb(128, 86, 247);
    background:rgba(0,0,0,0.04);
    box-shadow: none;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    padding:0 8px;
`