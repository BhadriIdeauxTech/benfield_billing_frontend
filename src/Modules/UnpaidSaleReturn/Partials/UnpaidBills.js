
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table } from '../../../Components/Table'
import Button from '../../../Components/Form/Button'
import Flex from '../../../Components/Flex'
import { Modal as Modals } from '../../../Components/Modal'
import PaybillModal from './PaybillModal'
import { Col, Modal, Switch } from 'antd'
import request from '../../../utils/request'
import { TbLock, TbLockOpen } from 'react-icons/tb'
import PayPassForm from './PayPass'
import { Row } from '../../../Components/Row'
import Input from '../../../Components/Form/Input'

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


    const GSTURL = 'sales/unpaid_bill_sale_return/'
    const nonGSTURL = 'sales/unpaid_bill_sale_return_new/'

    const handleChage = (record) => {
        // setEnable(enable === 'Enabled' ? 'Disabled' : 'Enabled');
        GetUnpaidBill(record);
    };

    useEffect(() => {
        GetUnpaidBill();
    }, [])

    const GetUnpaidBill = (checked) => {
        setCheckedGST(checked)
        if (checked) {
            request.get(nonGSTURL)
                .then(function (response) {
                    console.log(response.data, 'estimate');
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


        // request.get(`${URL}`).then((response) => {
        //     setDataSource(response.data?.sale)
        //     // setPassdata(response.data?.sale)
        //     console.log(response.data, 'paidbill');
        // }).catch(error => {
        //     console.log(error);
        // });
    };
    const handleUnpaid = () => {
        handleCancel();
        GetUnpaidBill()
    };

    const SetChecked =(arg)=>{
        setCheckedGST(arg)
        // GetUnpaidBill(arg);
    }


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleok = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTrigger(trigger+1)
    }


    const PayBill = (record) => {
        setModalContent(<PaybillModal trigger={trigger} checkedGST={checkedGST} SetChecked={SetChecked} handleUnpaid={handleUnpaid} suppilerData={record} GetUnpaidBill={GetUnpaidBill} />);
        setModalTitle('Pay Bill');
        showModal();
    }

    const PayPassBill = (record) => {
        setModalContent(<PayPassForm checkedGST={checkedGST} purchaseData={record} handleUnpaid={handleUnpaid} />);
        setModalTitle('');
        showModal();
    }

    // useEffect(() => {
    //     onChangeGstNonGsdt();
    // }, [])

    // const onChangeGstNonGsdt = (checked) => {
    //     if (checked) {
    //         request.get(GSTURL)
    //             .then(function (response) {
    //                 console.log(response.data, 'estimate');
    //                 setDataSource(response.data?.purchase)
    //                 // setPassdata(response.data?.amount)
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     }
    //     else {
    //         request.get(nonGSTURL)
    //             .then(function (response) {
    //                 console.log(response.data, 'estimate');
    //                 setDataSource(response.data?.purchase_nongst)
    //                 // setPassdata(response.data?.amount)
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     }
    // }

    const handleSearch = (value) => {
        setSearchText(value);
    };


    const Data = [{
        title: 'SI.no',
        render: (value, item, index) => index + 1,
    },
    {
        title: 'Return Number',
        dataIndex: 'return_no',
        filteredValue: searchText ? [searchText] : null,
        onFilter: (value, record) => {
            return String(record.return_no).toLowerCase().includes(value.toLowerCase()) ||
                String(record.return_no).includes(value.toUpperCase());
        },
    },
    {
        title: 'Date',
        dataIndex: 'invoice_date'
    },
    {
        title: 'Customer Name',
        dataIndex: 'customer_name'
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
                        placeholder="Search by Return Number"
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