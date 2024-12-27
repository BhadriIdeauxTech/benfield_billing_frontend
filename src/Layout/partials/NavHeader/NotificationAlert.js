import React from 'react'
import { BellOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { Tooltip } from 'antd';
import Button from '../../../Components/Form/Button';
import { useMemo } from 'react';
import { NotificationContent } from './NotificationContent';
import { OverlayContainer } from './Style';


export const NotificationAlert = ({ dataSource, outpurchase, notifiyy }) => {

  const [arrow, setArrow] = useState('Show');
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

  return (
    <div>
      {dataSource?.length !== 0 || outpurchase?.length !== 0? (
        <OverlayContainer>
          <Tooltip placement="bottomRight" title={<NotificationContent outpurchase={outpurchase} dataSource={dataSource} />} arrow={mergedArrow} overlayStyle={{ maxWidth: '50%' }} className='notification' trigger="click"  >
            <Button icon={<BellOutlined />} style={{ background: 'grey', padding: '5px 5px' }} /><h1 style={{ marginLeft: '26px', marginTop: '-85px', zIndex: '99999999999', fontSize: '20px', color: 'red', fontSize: '50px' }}>.</h1></Tooltip> </OverlayContainer>
      ) : (
        <Tooltip placement="bottomRight" title={'You Dont Have Any Notification'} arrow={mergedArrow}>
          <Button icon={<BellOutlined />} style={{ background: 'grey' }} /></Tooltip>
      )}
    </div>
  )
}
