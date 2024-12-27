import React from 'react'
import Logo from '../../../Assets/logo/logo.png'
import {Row, Col } from 'antd';
import { Firstcolm } from './HeaderStyle';
import {TbReload} from 'react-icons/tb';
import {HiPhoneMissedCall} from 'react-icons/hi'
import {AiOutlineWhatsApp} from 'react-icons/ai'

const Tophead = () => {
  return (
    <>
        <Row style={{background:'#f1f1f1',boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'}}>
            <Col span={24} md={8}>
                  <Firstcolm>
                  <ul>
                    <li> <img src={Logo} alt='rejin'/> </li>
                    <li>Company</li>
                    <li>Help</li>
                    <li>Shortcut</li>
                    <li><TbReload /></li>
                  </ul>
                  </Firstcolm>
            </Col>
            <Col span={24} md={16}>
                  <Firstcolm>
                  <ul>
                    <li>Customer support&nbsp;:</li>
                    <li><HiPhoneMissedCall />&nbsp; <a href='/'>(+91) 9876543210</a></li>
                    <li>||</li>
                    <li><AiOutlineWhatsApp style={{color:'#0dd30d'}} />&nbsp;<a href='/'>(+91) 9876543210</a></li>
                  </ul>
                  </Firstcolm>
            </Col>
        </Row>
    
    </>
  )
}

export default Tophead