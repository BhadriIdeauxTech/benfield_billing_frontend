

import React, { useEffect, useRef, useState } from 'react';
import { ContentHeader, ContentLayout, MainContent,  MainLayout,  SideBar } from './style'
import SideMenu from './partials/Menu/SideMenu';
import NavHeader from './partials/NavHeader/NavHeader';


const AdminLayout = ({children}) => {
  const [collapse, setCollapse] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const SiderRef = useRef(null)
  const Headerref = useRef(null)
  const [marginHeight, setMarginHeight] = useState('')
  useEffect(() => {
   
    setMarginHeight(Headerref.current.scrollHeight)
  }, [windowWidth])
  useEffect(() => {
    const windowWidth = window.innerWidth;
    setWindowWidth(windowWidth)
    if (windowWidth < 992) {
      setCollapse(true)
    }
    else {
      setCollapse(false)
    }
  }, [windowWidth])
  return (

    <>
        
    <MainLayout >
      <ContentHeader ref={Headerref} collapsed={collapse}>
        <NavHeader collapse={collapse} setCollapse={setCollapse} />
      </ContentHeader>
      
        <SideBar ref={SiderRef} collapsed={collapse}>
          <SideMenu />
        </SideBar>
        <ContentLayout collapsed={collapse} >
          <MainContent height={marginHeight}>
            {/* <Outlet /> */}
            {children}
          </MainContent>
        </ContentLayout>
      </MainLayout>
    </>
  )
};
export default AdminLayout;