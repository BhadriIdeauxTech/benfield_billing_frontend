import React from 'react'
import {Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

export const showConfirm = (callback,props) => {
  confirm({
    title: props.title || 'Do you Want to delete these items?',
    icon: props.icon || <ExclamationCircleFilled />,
    content: props.content || 'Some descriptions',
    onOk() {
        callback();
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

