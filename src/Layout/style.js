import { Input, } from 'antd'
import styled, { css } from 'styled-components'
import { THEME } from '../theme';



export const MainLayout = styled.section`

min-height:100vh;
display:flex;
width:100%;
transition:0.5s;
`;

export const SideBar = styled.aside`
.ant-menu-item,.ant-menu-item {
    margin-top: 18px;
}
.ant-menu-item.ant-menu-item-only-child{
    padding-left:20px !important;

}
.ant-menu-submenu-title{
    padding-left:20px !important;
}
.ant-menu-submenu-title:hover{
    color: var(--light-color) !important;
    /* background:  var(--light-color) !important; */
}

/* .ant-menu-inline {
    width: 95%;
    margin: 15px 6px;
} */
.ant-menu-item:not(.ant-menu-item-selected):hover {
    color: ${THEME.secondary_color} !important;
    background:  var(--light-color) !important;
}
.ant-menu-item-selected {
    color: ${THEME.secondary_color} !important;
    background:  var(--light-color) !important;
}
.ant-menu-submenu-title:active {
    background-color: #fff0 !important;
    color:var(--light-color);
}
.ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title {
    color: var(--light-color) !important;
}
.ant-menu {
    color: ${THEME.orange};
    background: ${THEME.secondary_color};
    border-radius: 15px;
}
z-index: 10;
    position: sticky;
    top: 100px;
    height: calc(100vh - 100px);
    overflow-y: auto;
    width: 250px;
    background: ${THEME.secondary_color};
    border-radius: 20px;
    transition: all 0.5s ease 0s;
    margin: 5px;
@media (max-width:900px) {
    position:fixed;
}
${props => {

        switch (props.collapsed) {
            case true:
                return css`
            width:0px;
            transition:0.5s;
            `;
            case false:
                return css`
            width:250px;
            transition:0.5s;
            `;
            default:
                return css`
            width:250px;
            transition:0.5s;
            `;
        }
    }
    }
`;
export const CollapseTrigger = styled.div`
display:none;
cursor: pointer;
& svg{
    font-size:1.5rem;
}
@media (max-width:1100px) {
    display:block
}

`;
export const CollapseDiv = styled.div`
/* .ant-btn-default:not(:disabled):hover {
    color: #ffffff !important;
    border-color: #ffffff !important;
}
.ant-btn-default {
    background-color: #ffffff00 !important;
} */
.ant-tooltip-inner {
    background-color: red !important;
}
.ant-btn-default {
    border-color: #ffffff14; 
    box-shadow: none;
     :hover {
      border-color: #ffffff14; 
      box-shadow: none;
     }
}
position:relative;
background:var(--light-color);
display:flex;
flex-direction:row;
align-items:center;
gap:10px;
z-index:10;
transition:0.5s;
@media (max-width:1100px) {
    position:absolute;
    padding:20px;
    right:20px;
    top:104px;
    z-index:10;
    flex-direction:column;
    transition:0.5s;
    ${props => {

        switch (props.collapse) {
            case true:
                return css`
          display:flex;
          z-index:10;
          transition:0.5s;
            `;
            case false:
                return css`
          display:none;
          transition:0.5s;
            `;
            default:
                return css`
           display:none;
           transition:0.5s;
            `;
        }
    }
    }
}
@media (max-width:697px) {
    position:absolute;
    padding:20px;
    right:0;
    left:0;
    top:104px;
    z-index:10;
    flex-direction:column;
    transition:0.5s;
    ${props => {

        switch (props.collapse) {
            case true:
                return css`
          display:flex;
          z-index:10;
          transition:0.5s;
            `;
            case false:
                return css`
          display:none;
          transition:0.5s;
            `;
            default:
                return css`
           display:none;
           transition:0.5s;
            `;
        }
    }
    }
}

`;
export const ContentLayout = styled.section`
transition:0.5s;
height:inherit;
height:100vh;
overflow:hidden;

${props => {

        switch (props.collapsed) {
            case true:
                return css`
            width:100%;
            margin-left:0;
            transition:0.5s;
            `;
            case false:
                return css`
           width:calc(100% - 250px);
           /* margin-left:250px; */
           transition:0.5s;
           @media (max-width:900px) {
    width:100%;
}
            `;
            default:
                return css`
           width:calc(100% - 250px);
           /* margin-left:250px; */
           transition:0.5s;
           @media (max-width:900px) {
    width:100%;
}
            `;
        }
    }}
`;
export const ContentHeader = styled.div`
 .ant-tooltip-inner {
    background-color: red !important;
}
z-index:20;
position:fixed;
padding:20px;
/* height:70px; */
/* background:var(--light-color); */
background:${THEME.grey};
top:0;
left:0;
right:0;
transition:0.5s;
 /* ${props => {

        switch (props.collapsed) {
            case true:
                return css`
             width:100%;
             @media (max-width:700px) {
    margin-left:0;
   
    transition:0.5s;
}
            `;
            case false:
                return css`
              width:calc(100% - 250px);
                    @media (max-width:700px) {
    margin-left:250px;
  
    transition:0.5s;
}
            `;
            default:
                return css`
                    width:calc(100% - 250px);
                   @media (max-width:700px) {
    margin-left:250px;

    transition:0.5s;
}
            `;
        }
    }
    } */
`;
export const MainContent = styled.section`
padding: 0 10px;
margin:100px 10px 10px 10px;
/* padding:24px; */
height:calc(100vh - 120px);
overflow-x:hidden;
overflow-y:auto;
`;



export const SearchInput = styled(Input)`
&.ant-input-affix-wrapper{
    border:none ;
    box-shadow:none;
}
& .ant-input-prefix{
    margin-inline-end:10px;
}
`;

export const HeaderIconHolder = styled.div`
    display: flex;
    gap: 20px;
    padding: 10px;
    & .header__icon{
    font-size: 28px;
    cursor: pointer;
    }
`

export const BtnSideHolder = styled.div`
margin: 0 10px;
 background: black;
    width: 40px;
    height: 40px;
    display: flex;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
 
 & .header__icon{
    font-size: 26px;
    }
`

export const LogoHolder = styled.div`
    width:120px;
    text-align:center;
    font-size:14px;
    text-transform:uppercase;
    font-weight:600;
& h1{
    font-size:23px;
    display: flex;
   
}
    @media ${THEME.MOBILEL}{
        width:250px;
        font-size:16px;
    }
`