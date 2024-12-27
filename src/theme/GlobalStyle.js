import { createGlobalStyle } from 'styled-components'
import { THEME } from '.'

const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding: 0;
  box-sizing:border-box;
  /* font-family:  'Poppins', sans-serif; */
  font-size: 15px;
}
  body {
    margin: 0;
    padding: 0;
    /* font-family:  'Poppins', sans-serif; */
    background:#eeeeee;
    width:100%;

    /* overflow:hidden; */
  }
  a, a:focus, a:hover {
  color: ${THEME.green};
  text-decoration: none;
}
`

export default GlobalStyle
