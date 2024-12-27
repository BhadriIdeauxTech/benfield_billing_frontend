import { Row, Tooltip } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../../Components/Form/Button'
import { HeaderIconHolder, BtnSideHolder, LogoHolder } from '../../style'
import { FaUserTie } from 'react-icons/fa'
import Flex from '../../../Components/Flex'
import { useDispatch } from 'react-redux'
import { LogOutSuccess } from '../../../Modules/Auth/actions'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NotificationAlert } from './NotificationAlert'

const NavHeader = ({ collapse, setCollapse }) => {

  const [arrow, setArrow] = useState('Show');

  const dispatch = useDispatch()

  const Navigate = useNavigate()

  const handleLogout = () => {
    dispatch(LogOutSuccess())
  };


  const UserRole = useSelector((state) => state?.auth?.token?.role)
  const UserName = useSelector((state) => state?.auth?.token?.username)

  const notifiyy = useSelector(state => state.navigationheader.NotificationHeaderData);

  useEffect(() => {
  }, [UserRole])

  const text = <span>
    <Flex spcPading center>
      <Button onClick={handleLogout}>Logout</Button>
    </Flex>
  </span>;

  const options = ['Show', 'Hide', 'Center'];
  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }
    if (arrow === 'Show') {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const [buttons, setButtons] = useState(false)
  const collapsed = collapse
  const setCollapsed = setCollapse


  const [dataSource, setDataSource] = useState([]);

  const [outpurchase, setOutpurchase] = useState([]);


  useEffect(() => {
    if (notifiyy) {
      setDataSource(notifiyy?.message)
      setOutpurchase(notifiyy?.outer_purchase)
    }
  }, [notifiyy])


  return (
    <>
      <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Row style={{ alignItems: 'center' }}>
            <LogoHolder>
              <h1>BENFIELD</h1>
            </LogoHolder>
            <BtnSideHolder onClick={() => setCollapsed(!collapsed)}>
              <AiOutlineMenuUnfold className='header__icon' />
            </BtnSideHolder>
          </Row>
        </div>
        <HeaderIconHolder>
          {UserRole === 'Site' ? null :
            <NotificationAlert notifiyy={notifiyy} dataSource={dataSource} outpurchase={outpurchase} />
          }
          <h4>{UserName}</h4>
          <Tooltip placement="bottomRight" title={text} arrow={mergedArrow}>
            <FaUserTie className='header__icon' />
          </Tooltip>
        </HeaderIconHolder>
      </Row>

    </>
  )
}

export default NavHeader
