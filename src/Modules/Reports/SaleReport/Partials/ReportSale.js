import React, { useEffect, useRef } from 'react'
import { CardOnBottom, CardOnTop, TableStyle } from './Style';
import { Row } from '../../../../Components/Row';
import { Col, Form} from 'antd';
// import { SearchBar } from '../../../../Components/Form/SearchBar';
import { useState } from 'react';
import CardPayment from './CardPayment';
import { Table } from '../../../../Components/Table';
import Button from '../../../../Components/Form/Button';
import request from '../../../../utils/request';
import dayjs from 'dayjs'
import { CustomDateRangePicker } from '../../../../Components/Form/CustomDateRangePicker';
import Flex from '../../../../Components/Flex';
import { TbArrowsExchange } from 'react-icons/tb';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { PrinterFilled } from '@ant-design/icons';
import ParintTable from './print';
import Switch from '../../../../Components/Form/Switch';
import Input from '../../../../Components/Form/Input';
import { toast } from 'react-toastify';

const ReportSale = () => {

    const URLS = 'sales/saledetails_serach/'

    const [dataSource, setDataSource] = useState([])

    const [dateRange, setDateRange] = useState([]);

    const componentRef = useRef();

    const [form] = Form.useForm();

    const [checkedGST, setCheckedGST] = useState(true)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const handleDateRangeChange = (values) => {
        const NewValue = { ...values, rangeValue: dateRange }
        setDateRange(values);
    };

    const onFinish = (values) => {
        const NewValue = { ...values, range: dateRange }
        DatePost(NewValue)
        form.resetFields();

    };

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const [passdata, setPassdata] = useState([])

    const [searchText, setSearchText] = useState([]);

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'invoice_date',
            render: (date) => {
                return dayjs(date).format('DD\\MM\\YYYY');
            },

        },
        {
            title: 'Invoice Number',
            dataIndex: 'invoice_no',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.invoice_no).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.invoice_no).includes(value.toUpperCase());
            },
        },

        {
            title: 'Payment Type',
            dataIndex: 'payment_type',
        },
        {
            title: 'Amount',
            dataIndex: 'grand_total',
        },
        {
            title: 'Balance Due',
            dataIndex: 'balance',
        },

    ];


    useEffect(() => {
        GetSale();
    }, [])

    const GetSale = () => {
        request.get(`${URLS}`)
            .then(function (response) {
                setPassdata(response.data?.amount)
                setDataSource(response.data?.sale)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //==============Date-Post request===============//
    useEffect(() => {
        setDataSource(dataSource)
        console.log('called')
    }, [dataSource])

    const DatePost = (values) => {
        if (checkedGST) {
            request.post(`sales/saledetails_serach_new/`, values)
                .then(function (response) {
                    setDataSource(response.data?.sale)
                    setPassdata(response.data?.amount)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            request.post(`sales/saledetails_serach/`, values)
                .then(function (response) {
                    setDataSource(response.data?.sale)
                    setPassdata(response.data?.amount)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }

    useEffect(() => {
        onChangess();
    }, [])

    const onChangess = (checked) => {
        setCheckedGST(checked)
        if (checked) {
            request.get('sales/saledetails_serach_new/')
                .then(function (response) {
                    setDataSource(response.data?.sale)
                    setPassdata(response.data?.amount)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            request.get('sales/saledetails_serach/')
                .then(function (response) {
                    setDataSource(response.data?.sale)
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
                            {
                                dataSource.length > 0 && (
                                    <Button.Primary icon={<PrinterFilled />} onClick={handlePrint} />
                                )
                            }

                        </Col>
                    </Row>
                </Form>
                <CardPayment datas={passdata} />

            </CardOnTop >
            <CardOnBottom>
                <Row gutter={[24, 24]}  style={{ marginTop: '25px' }}>
                    <Col span={24} md={13}>
                        <h1>Transactions :</h1>
                    </Col>
                    <Col span={24} md={5} style={{ marginTop: '25px' }}>
                        <Input
                            placeholder="Search by Invoice No"
                            value={searchText}
                            onSearch={handleSearch}
                            onChange={(e) => handleSearch(e.target.value)}

                        />
                    </Col>
                    <Col span={24} md={6}  style={{ marginTop: '25px' }}>
                        <Flex centerVertically>
                            <span style={{ fontWeight: 'bold' }}>GST</span>&nbsp;<Switch onChange={onChangess} />&nbsp;<span style={{ fontWeight: 'bold' }}>Estimate</span>
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

export default ReportSale