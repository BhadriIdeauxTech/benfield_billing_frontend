import styled from 'styled-components'
import { THEME } from '../../../theme';


export const Card = styled.div`
background-color:var(--light-color);
padding: 20px;
margin: 10px 2px;
& h3{
    color: var( --purple-secondary-color);
    height: 20px;
    padding: 0px 0px;
    /* box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.25); */

}
& h1{
    color:var(--dark-color);
    padding: 10px 0px;
    /* box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.25); */
}

`;

export const CardWrapper= styled.div`
padding:10px 5px;
/* height: 400px; */
/* overflow: hidden auto; */
`

export const Cards = styled.div`
background-color: ${THEME.orange}; 
box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.25);
border-radius:5px;
height: 180px;
color:var(--light-color);
padding: 30px 15px;
cursor:pointer;
transition: all 0.5s;

& svg{
    font-size: 35px; 
 
}
& h1{
    font-size: 18px;
    padding:20px 0px;
}
& h2{
    font-size: 20px; 
}
& p{
    font-size:13px;
}
& h4{
    font-size: 18px;
    padding:20px 0px;

}
&:hover {
  transform: translateY(-7px) scale(1.005) translateZ(0);
  /* box-shadow: 0 24px 36px rgba(0,0,0,0.11), */
    /* 0 24px 46px var(--box-shadow-color); */
    background-color:var(--light-color);
    & h4,h1,h2,p,svg{
        color: ${THEME.primary_color};  
    }
}

&:hover .overlay {
  transform: scale(4) translateZ(0);
}

&:active {
  transform: scale(1) translateZ(0);
  box-shadow: 0 15px 24px rgba(0,0,0,0.11),
    0 15px 24px var(--box-shadow-color);
}

& h1 {
  /* z-index: 1000; */
  transition: color 0.3s ease-out;
}
.overlay {
  width: 118px;
  position: absolute; 
  height: 118px;
  border-radius: 50%;
  background: var(--bg-color);
  top: 70px;
  left: 50px;
  z-index: 0;
  transition: transform 4s ease-out;
}
	
`;
export const Box = styled.div`
/* background-color:var(--light-color); */
border: solid 1.5px var(--purple);
padding: 10px 10px;
box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.25);
& p {
  font-weight: 600;
}
`;

export const Overhid = styled.div`
height: 320px;
overflow-y: auto;
`;
