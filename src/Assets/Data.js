import React from 'react'
import {  UserOutlined } from '@ant-design/icons'
import HeadOffice from '../Modules/Home/Partials/HeadOffice/HeadOffice';
import Inventory from '../Modules/Home/Partials/Inventory/Inventory';
import Marketing from '../Modules/Home/Partials/Marketing/Marketing';
import Distribution from '../Modules/Home/Partials/Distribution/Distribution';
import { MdOutlineInventory } from 'react-icons/md';
import { SiMarketo} from 'react-icons/si'
import {TbLayoutDistributeVertical} from 'react-icons/tb'

export const Dashdata = [
    {
      id: 1,
      title: "Total HeadOffice",
      modalContent: <HeadOffice/>,
      icon:<UserOutlined style={{
        color: "purple",
        backgroundColor: ' white',
        borderRadius: 20,
        fontSize: 24,
        padding: 8,
      }}/>
    },
    {
      id: 2,
      title: " Total Inventory",
      modalContent: <Inventory/>,
      icon:<MdOutlineInventory style={{
        color: "purple",
        backgroundColor: 'white',
        borderRadius: 20,
        fontSize: 40,
        padding: 8,
      }}/>
    },
    {
      id: 3,
      title: "Total Marketing ",
      modalContent: <Marketing/>,
      icon:<SiMarketo style={{
        color: "purple",
        backgroundColor: ' white',
        borderRadius: 20,
        fontSize: 40,
        padding: 8,
      }}/>
    },
    {
      id: 4,
      title: "Total Distribution",
      modalContent: <Distribution/>,
      icon:<TbLayoutDistributeVertical style={{
        color: "purple",
        backgroundColor: ' white',
        borderRadius: 20,
        fontSize: 40,
        padding: 8,
      }}/>
    }
  ];
