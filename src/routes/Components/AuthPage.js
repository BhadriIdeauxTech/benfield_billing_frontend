import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate,useLocation } from 'react-router-dom'
import Page from '../../Modules/Page/Container/index'
import { authenticated,authenticated2 } from '../config/user'
import Flex from '../../Components/Flex'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const PageFlex = styled(Flex)`
  overflow: hidden;
  `
const AuthPage = ({ isAuthenticated }) => {
  const navigate = useNavigate()

  const [authenticatedRoutes, setAuthenticatedRoutes] = useState([]);

  const UserRole = useSelector((state) => state?.auth?.token?.role)
  const SuperUser = useSelector((state) => state?.auth?.token?.super)

  const location =useLocation();
  const from = location.state?.from?.pathname || '/signin'

  useEffect(() => {
 
    if (isAuthenticated) {
        // if (UserRole === 'Admin' || UserRole === 'NoGST-Biller') {
        //   console.log(UserRole,'ffffff f');
        //   setAuthenticatedRoutes(authenticated);
        // } else 
        if (UserRole === 'Site') {
          setAuthenticatedRoutes(authenticated2);
        } else {
          setAuthenticatedRoutes(authenticated);
        }
              // setAuthenticatedRoutes(authenticated);
    }
    // else {
    //     navigate(from,{replace:true})
    // }
  }, [isAuthenticated,UserRole]) 

  return (
    <PageFlex>
      {isAuthenticated && (
        <>
          <Page>
            <Routes>
              {authenticatedRoutes.map(({ routePath, Component }) => {
                return (
                  <Route
                    key={routePath}
                    path={routePath}
                    element={<Component />}
                  ></Route>
                )
              })}
            </Routes>
          </Page>
        </>
      )}
    </PageFlex>
  )
}

export default AuthPage


// useEffect(() => {
 
//   if (isAuthenticated) {
//     if (UserRole === 'Admin') {
//       setAuthenticatedRoutes(authenticated);
//     } else if (UserRole === 'NoGST-Biller') {
//       setAuthenticatedRoutes(authenticated2);
//     } else {
//       console.log('Unknown User Type');
//     }
//   }
//   else {
//       console.log(isAuthenticated, 'called')
//       navigate('/signin')
//   }
// }, [isAuthenticated,UserRole])


// <PageFlex>
// {isAuthenticated && (
//   <>
//     <Page>
//       <Routes>
//         {authenticatedRoutes.map(({ routePath, Component }) => {
//           return (
//             <Route
//               key={routePath}
//               path={routePath}
//               element={<Component />}
//             ></Route>
//           )
//         })}
//       </Routes>
//     </Page>
//   </>
// )}
// </PageFlex>

// export default AuthPage