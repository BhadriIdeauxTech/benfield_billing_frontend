
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table } from '../../../Components/Table'
import Button from '../../../Components/Form/Button'
import Flex from '../../../Components/Flex'
import { Modal as Modals } from '../../../Components/Modal'
import PaybillModal from './PaybillModal'
import { Col, Switch } from 'antd'
import request from '../../../utils/request'
import PayPassForm from './PayPass'
import Input from '../../../Components/Form/Input'
import { Row } from '../../../Components/Row'

const UnpaidBills = () => {

    // const URL = 'sales/unpaid_bill_sale/'

    const [dataSource, setDataSource] = useState([])
    const [tabledata, setTabledata] = useState([])
    const [searchText, setSearchText] = useState([]);
    const [passdata, setPassdata] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null)

    const [enable, setEnable] = useState('')

    const [checkedGST, setCheckedGST] = useState(false)
    const [trigger, setTrigger] = useState(1)


    const GSTURL = 'sales/unpaid_bill_sale/'
    const nonGSTURL = 'sales/unpaid_bill_sale_new/'

    const handleChage = (record) => {
        // setEnable(enable === 'Enabled' ? 'Disabled' : 'Enabled');
        GetUnpaidBill(record);
    };

    useEffect(() => {
        GetUnpaidBill();
    }, [])

    const SetChecked = (arg) => {
        setCheckedGST(arg)
        // GetUnpaidBill(arg);
    }

    const GetUnpaidBill = (checked) => {
        setCheckedGST(checked)
        if (checked) {
            request.get(nonGSTURL)
                .then(function (response) {
                    setDataSource(response.data?.sale)
                    setTabledata(response.data?.cheque_field)
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        else {

            request.get(GSTURL)
                .then(function (response) {
                    setDataSource(response.data?.sale)
                    setTabledata(response.data?.cheque_field)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };


    const handleUnpaid = () => {
        handleCancel();
        GetUnpaidBill()
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleok = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTrigger(trigger + 1)
    }


    const PayBill = (record) => {
        setModalContent(<PaybillModal trigger={trigger} onSelectPaymentType={record} SetChecked={SetChecked} checkedGST={checkedGST} handleUnpaid={handleUnpaid} suppilerData={record} GetUnpaidBill={GetUnpaidBill} setTabledata={setTabledata} tabledata={tabledata} />);
        setModalTitle('Pay Bill');
        showModal();
    }

    const PayPassBill = (record) => {
        setModalContent(<PayPassForm purchaseData={record} handleUnpaid={handleUnpaid} checkedGST={checkedGST} />);
        setModalTitle('');
        showModal();
    }


    const handleSearch = (value) => {
        setSearchText(value);
    };

    const Data = [{
        title: 'SI.no',
        render: (value, item, index) => index + 1,
    },
    {
        title: 'Invoice number',
        dataIndex: 'invoice_no',
        filteredValue: searchText ? [searchText] : null,
        onFilter: (value, record) => {
            return String(record.invoice_no).toLowerCase().includes(value.toLowerCase()) ||
                String(record.invoice_no).includes(value.toUpperCase());
        },
    },
    {
        title: 'Date',
        dataIndex: 'invoice_date'
    },
    {
        title: 'Customer Name',
        dataIndex: 'customer_name',

    },
    {
        title: 'Phone Number',
        dataIndex: 'mobile_number'
    },
    {
        title: 'Bill Amount',
        dataIndex: 'grand_total'
    },
    {
        title: 'Balance Amount',
        dataIndex: 'balance'
    },
    {
        title: 'Action',
        key: 'action',
        // render: (text, record) => renderButton(record),
        render: (text, record) => (
            <>
                {
                    record.cheque_field ? (
                        <Button.Success text={'PayPass'} onClick={() => PayPassBill(record)} />
                    ) : (
                        <Button.Primary text={'Pay'} onClick={() => PayBill(record)} />
                    )
                }
            </>
        )

    },
    ]


    return (
        <div>
            <Row>
                <Col span={24} md={12}>
                    <span style={{ fontWeight: 'bold' }}>GST</span>&nbsp;<Switch onChange={GetUnpaidBill} checked={checkedGST} />&nbsp;<span style={{ fontWeight: 'bold' }}>Estimate</span>

                </Col>             
                <Col span={24} md={12}>
                   <Flex end>
                   <Input
                        placeholder="Search by Invoice number"
                        value={searchText}
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}

                    />
                   </Flex>
                </Col>                       
            </Row>
            <Table columns={Data} data={dataSource} />
            <Modals isVisible={isModalOpen} handleOk={handleok}
                handleCancel={handleCancel} modalContent={modalContent} modalTitle={modalTitle} width={800} />

        </div>
    )
}

export default UnpaidBills