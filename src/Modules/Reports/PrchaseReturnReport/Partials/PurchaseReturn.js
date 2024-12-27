import { Col, Form, Tag } from 'antd';
import React from 'react'
import { useState } from 'react';
import { CardOnBottom, CardOnTop, TableStyle } from '../../SaleReport/Partials/Style';
import { Row } from '../../../../Components/Row';
import Button from '../../../../Components/Form/Button';
import CardPayment from './CardPayment';
import { Table } from '../../../../Components/Table';
import { PrinterFilled } from '@ant-design/icons';
import Flex from '../../../../Components/Flex';
import { TbArrowsExchange } from 'react-icons/tb';
import dayjs from 'dayjs';
import request from '../../../../utils/request';
import { useEffect, useRef } from 'react';
import { CustomDateRangePicker } from '../../../../Components/Form/CustomDateRangePicker';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import ParintTable from './print';
import Switch from '../../../../Components/Form/Switch';
import Input from '../../../../Components/Form/Input';
import { toast } from 'react-toastify';

const PurchaseReturn = () => {

    const [form] = Form.useForm();

    const URL = 'purchase/purchase_return_report/'
    const NongstUrl = 'purchase/purchase_return_report_nongst'

    const [checkedGST, setCheckedGST] = useState(true)
    // const URLS = 'purchase/purchase_return_report/'

    const [passdata, setPassdata] = useState([])

    const [dataSource, setDataSource] = useState([])

    const [dateRange, setDateRange] = useState([]);

    const [searchText, setSearchText] = useState([]);

    const onFinish = (values) => {
        const NewValue = { ...values, range: dateRange }
        PostPrchReun(NewValue)
        form.resetFields();
    
    }

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const handleDateRangeChange = (values) => {
        const NewValue = { ...values, rangeValue: dateRange }
        setDateRange(values);
    };

    const PostPrchReun = (values) => {
        if(checkedGST){
            request.post(`${NongstUrl}`, values)
            .then(function (response) {
                setDataSource(response.data?.purchase_return_nongst)
                setPassdata(response.data?.amount)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else{
            request.post(`${URL}`, values)
            .then(function (response) {
                setDataSource(response.data?.purchase_return)
                setPassdata(response.data?.amount)
            })
            .catch(function (error) {
                console.log(error);
            }); 
        }
       
    }


    useEffect(() => {
        setDataSource(dataSource)
    }, [dataSource])

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'Date',
            render: (date) => {
                return dayjs(date).format('DD\\MM\\YYYY');
            },
        },
        {
            title: 'Invoice Number',
            dataIndex: 'Invoice_No',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.Invoice_No).toLowerCase().includes(value.toLowerCase()) ||
                String(record.Invoice_No).includes(value.toUpperCase());
            },
        },
        {
            title: 'Party',
            dataIndex: 'Party_Name',
        },
        {
            title: 'Transaction Type',
            dataIndex: 'Transactions',
        },
        {
            title: 'Payment Type',
            dataIndex: 'Payment_Type',
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
        },
        {
            title: 'Balance Due',
            dataIndex: 'Balance_Due',
        },

    ];

    const GSTURL = 'purchase/purchase_return_report/'
    const nonGSTURL = 'purchase/purchase_return_report_nongst/'
    useEffect(() => {
        onChange();
    }, [])

    const onChange = (checked) => {
        setCheckedGST(checked);
        if (checked) {
            request.get(nonGSTURL)
                .then(function (response) {
                    setDataSource(response.data?.purchase_return_nongst)
                    setPassdata(response.data?.amount)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            request.get(GSTURL)
            .then(function (response) {
                setDataSource(response.data?.purchase_return)
                setPassdata(response.data?.amount)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <div>
            <CardOnTop>
                <Form
                    form={form}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={
                        {
                            // start_date: dayjs(),
                            // end_date: dayjs(),
                            payment_type: 'Cash'
                        }
                    }
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">

                    <Row gutter={[24, 24]} style={{ padding: '10px 0' }}>
                        <Col span={24} md={3}>
                            <b>Between</b>&nbsp;&nbsp; <TbArrowsExchange />
                        </Col>

                        <Col span={24} md={12}>

                            <CustomDateRangePicker
                                onChange={handleDateRangeChange}
                                value={dateRange}
                                name={'range'}
                                rules={[{ required: true, message: 'Please Select the Date' }]}
                            />
                        </Col>
                        <Col span={24} md={6}>
                            <Flex>
                                <Button.Primary text={'Submit'} htmlType='submit' />
                            </Flex>
                        </Col>
                        <Col span={24} md={2} >
                            <div style={{ display: "none" }}>
                                <ParintTable componentRef={componentRef} data={dataSource} />
                            </div>
                            {dataSource.length > 0 && (

                                <Button.Primary icon={<PrinterFilled />} onClick={handlePrint} />
                            )}
                        </Col>
                    </Row>

                    <CardPayment PassData={passdata} />

                </Form>
            </CardOnTop >

            <CardOnBottom>
                <Row gutter={[24, 24]}>
                    <Col span={24} md={13}>
                        <h1>Transactions :</h1>
                    </Col>
                    <Col span={24} md={5} style={{ marginTop: '25px' }}>
                        <Input
                            placeholder="Search By Invoice No"
                            value={searchText}
                            onSearch={handleSearch}
                            onChange={(e) => handleSearch(e.target.value)}

                        />
                    </Col>
                    <Col span={24} md={6} style={{ marginTop: '25px' }}>
                        <Flex centerVertically>
                        <span style={{ fontWeight: 'bold' }}>GST</span>&nbsp;<Switch  onChange={onChange} />&nbsp;<span style={{ fontWeight: 'bold' }}>Estimate</span>
                        </Flex>                       
                    </Col>
                    <TableStyle>
                        <Table columns={columns} data={dataSource} />
                    </TableStyle>
                </Row>
            </CardOnBottom>
        </div>
    )
}

export default PurchaseReturn