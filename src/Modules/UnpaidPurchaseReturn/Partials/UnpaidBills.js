
import React from 'react'
import { useState } from 'react'
import { Table } from '../../../Components/Table'
import Button from '../../../Components/Form/Button'
import { Modal as Modals } from '../../../Components/Modal'
import PaybillModal from './PaybillModal'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import request from '../../../utils/request'
import PayPassForm from './PayPass'
import Switch from '../../../Components/Form/Switch'
import Flex from '../../../Components/Flex'
import Input from '../../../Components/Form/Input'
import { Row } from '../../../Components/Row'
import { Col } from 'antd'


const UnpaidBills = () => {

    const [dataSource, setDataSource] = useState([])
    const [passdata, setPassdata] = useState([])
    const [tabledata, setTabledata] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null)

    const [checkedGST, setCheckedGST] = useState(false)
    const [trigger, setTrigger] = useState(1)
    const [searchText, setSearchText] = useState([]);


    const GSTURL = 'purchase/purchase_return_unpaid_bills/'
    const nonGSTURL = 'purchase/purchase_return_unpaid_bills_nongst/'

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

    const SetChecked = (arg) => {
        setCheckedGST(arg)
        // GetUnpaidBill(arg);
    }

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const PayBill = (record) => {
        setModalContent(<PaybillModal trigger={trigger} SetChecked={SetChecked} checkedGST={checkedGST} purchaseData={record} handleUnpaid={handleUnpaid} />);
        setModalTitle('Pay Bill');
        showModal();
    }

    const PayPassBill = (record) => {
        setModalContent(<PayPassForm purchaseData={record} handleUnpaid={handleUnpaid} />);
        setModalTitle('');
        showModal();
    }



    const renderButton = (record) => {
        if (record.payment_type === 'Cash') {
            return <Button.Primary text={'Pay'} onClick={() => PayBill(record)} />;

        } else if (record.payment_type === 'Credit') {
            return <Button.Primary text={'Pay'} onClick={() => PayBill(record)} />;
        }
        else if (record.payment_type === 'UPI') {
            return <Button.Primary text={'Pay'} onClick={() => PayBill(record)} />;
        }
        else if (record.cheque_pass) {
            return <Button.Success text={'PayPass'} value={tabledata} onClick={() => PayPassBill(record)} />;
        }
        else {
            return <Button>{record.payment_type}</Button>;
        }
    };

    useEffect(() => {
        GetUnpaidBill();
    }, [])

    const GetUnpaidBill = (checked) => {
        setCheckedGST(checked)
        if (checked) {
            request.get(nonGSTURL)
                .then(function (response) {
                    setDataSource(response.data?.purchase_return_nongst)
                    setTabledata(response.data?.cheque_pass)
                    // setPassdata(response.data?.amount)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            request.get(GSTURL)
                .then(function (response) {
                    setDataSource(response.data?.purchase_return)
                    setTabledata(response.data?.cheque_pass)
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


    const Data = [{
        title: 'SI.no',
        render: (value, item, index) => index + 1,
    },
    {
        title: 'Invoice number',
        dataIndex: 'bill_no',
        filteredValue: searchText ? [searchText] : null,
        onFilter: (value, record) => {
            return String(record.bill_no).toLowerCase().includes(value.toLowerCase()) ||
                String(record.bill_no).includes(value.toUpperCase());
        },
    },
    {
        title: 'Date',
        dataIndex: 'purchase_date',
        render: (date) => {
            return dayjs(date).format('DD\\MM\\YYYY');
        },
    },
    {
        title: 'Supplier Name',
        dataIndex: 'supplier_name'
    },
    {
        title: 'Phone Number',
        dataIndex: 'mobile_number'
    },
    {
        title: 'Bill Amount',
        dataIndex: 'sub_total'
    },
    {
        title: 'Balance Amount',
        dataIndex: 'balance_amount'
    },
    {
        title: 'Action',
        render: (text, record) => (
            <>
                {
                    record.cheque_pass ? (
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
                    <Flex centerVertically>
                        <span style={{ fontWeight: 'bold' }}>GST</span>
                        &nbsp;
                        <Switch onChange={GetUnpaidBill} checked={checkedGST} />&nbsp;<span style={{ fontWeight: 'bold' }}>Estimate</span>
                    </Flex>
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