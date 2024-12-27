import styled from 'styled-components'


export const Firstcolm = styled.div`
  overflow: hidden;
 & ul {
    list-style-type: none;
    display: flex;
    margin: 5px auto;
 }
 & li {
    padding: 0 10px;
    font-weight: 500;
    color: #939393;
    display: flex;
    justify-content: center;
    align-items: end;
 }
 & img {
    width: 20px;
    height: auto;
 }
 & svg {
    font-size: 19px;
 }
 & a {
    color: #71b2db94;
 } 
`;