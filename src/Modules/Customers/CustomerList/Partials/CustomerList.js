import React, { useEffect, useState } from 'react'

import Button from '../../../../Components/Form/Button';

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import { Modal as Modals } from '../../../../Components/Modal';
import { MdOutlineNotificationsActive } from 'react-icons/md';



import Flex from '../../../../Components/Flex';
import { Table } from '../../../../Components/Table';
import CustomerView from './CustomerView';
import { SearchInput } from '../../../../Layout/style';
import { Row } from '../../../../Components/Row';
import { Col } from 'antd';
import { SearchBar } from '../../../../Components/Form/SearchBar';
import CustomerPay from './CustomerPay';
import { AiFillAccountBook } from "react-icons/ai";
import { TopTitle } from '../../../../Components/Form/TopTitle';


const ViewCustomerList = ({ getCustomers }) => {
  const [dataSource, setDataSource] = useState(getCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null)

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const onViewcustomer = (record) => {
    setModalContent(<CustomerView record={record} />);
    setModalTitle("Customer Details");
    showModal();

  }
  const onViewcustomerpay = (record) => {
    setModalContent(<CustomerPay record={record} />);
    setModalTitle("Customer Pay");
    showModal();

  }


  const columns = [
    {
      title: 'S.No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name'
    },
    {
      title: 'Mobile number',
      dataIndex: 'mobile_number'
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name'
    },
    {
      title: 'Advance Amount',
      dataIndex: 'advance_amount'
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amount_paid'
    }, {
      title: 'Balance Amount',
      dataIndex: 'balance_amount'
    },

    {
      title: 'Action',
      render: (record) => {
        return (
          <>
            <Flex spaceEvenly>
              <Button.Success
                text={<EditOutlined />} />

              <Button.Success text={<EyeOutlined />} onClick={() => { onViewcustomer(record) }}

              />
              <Button.Primary text={<AiFillAccountBook />} onClick={() => { onViewcustomerpay(record) }}

              />
            </Flex>
          </>
        )
      }
    },
  ]

  return (
    <div>


      <TopTitle Heading={'CUSTOMER LIST  :'} />
      <Row gutter={[24, 24]} >
        <Col><SearchBar name='search_customer' placeholder='Search customers' /></Col>

      </Row>
      <Table columns={columns} data={dataSource} />
      <Modals isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalTitle={modalTitle} modalContent={modalContent} width={1200} />
    </div>
  )
}

export default ViewCustomerList