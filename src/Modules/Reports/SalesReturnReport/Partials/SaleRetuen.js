import React from 'react'
import { CardOnBottom, CardOnTop, TableStyle } from '../../SaleReport/Partials/Style';
import { Row } from '../../../../Components/Row';
import { Col, Form, } from 'antd';
import Button from '../../../../Components/Form/Button';
import { useState, useRef } from 'react';
import { Table } from '../../../../Components/Table';
import CardPayment from './CardPayment';
import dayjs from 'dayjs'
import request from '../../../../utils/request';
import { useEffect } from 'react';
import { CustomDateRangePicker } from '../../../../Components/Form/CustomDateRangePicker';
import Flex from '../../../../Components/Flex';
import { TbArrowsExchange } from 'react-icons/tb';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { PrinterFilled } from '@ant-design/icons';
import ParintTable from './print';
import Switch from '../../../../Components/Form/Switch';
import Input from '../../../../Components/Form/Input';
import { toast } from 'react-toastify';


const SaleRetuen = () => {

    const EstimateURLS = 'sales/sale_return_details_serach_new/'
    const URLS = 'sales/sale_return_details_serach/'

    const [dataSource, setDataSource] = useState([])
    const [checkedGST, setCheckedGST] = useState(true)

    const [form] = Form.useForm();
    const [dateRange, setDateRange] = useState([]);

    const componentRef = useRef();

    const [searchText, setSearchText] = useState([]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const handleDateRangeChange = (values) => {
        const NewValue = { ...values, rangeValue: dateRange }
        setDateRange(values);
    };
    const [saledata, setSaledata] = useState([])

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const columns = [
        {
            title: 'Return Date',
            dataIndex: 'invoice_date',
            render: (date) => {
                return dayjs(date).format('DD\\MM\\YYYY');
            },
        },
        {
            title: 'Invoice Number',
            dataIndex: 'invoice_no',
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
    const onFinish = (values) => {
        const NewValue = { ...values, range: dateRange }
        PostDateSale(NewValue)
        form.resetFields();

    };

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    useEffect(() => {
        GetSaleReturn();
    }, [])

    const GetSaleReturn = (checked) => {
        setCheckedGST(checked)
        if (checked) {
            request.get(`${EstimateURLS}`)
                .then(function (response) {
                    setSaledata(response.data?.amount)
                    setDataSource(response.data?.sale)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            request.get(`${URLS}`)
                .then(function (response) {
                    setSaledata(response.data?.amount)
                    setDataSource(response.data?.sale)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
    //=================Date post request=================//
    const PostDateSale = (values) => {
        if (checkedGST) {
            request.post(`sales/sale_return_details_serach_new/`, values)
                .then(function (response) {
                    setSaledata(response.data?.amount)
                    setDataSource(response.data?.sale)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            request.post(`sales/sale_return_details_serach/`, values)
                .then(function (response) {
                    setSaledata(response.data?.amount)
                    setDataSource(response.data?.sale)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    useEffect(() => {
        setDataSource(dataSource)
    }, [dataSource])


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
                            {/* <Button.Primary icon={<PrinterFilled />} onClick={handlePrint} /> */}
                            {dataSource.length > 0 && (
                                <Button.Primary icon={<PrinterFilled />} onClick={handlePrint} />
                            )}
                        </Col>
                    </Row>
                </Form>
                <CardPayment data={saledata} />
            </CardOnTop >
            <CardOnBottom>
                <Row gutter={[24, 24]}>
                    <Col span={24} md={13}>
                        <h1>Transactions :</h1>
                        {/* <SearchBar /> */}
                    </Col>
                    <Col span={24} md={5} style={{ marginTop: '25px' }}>
                        <Input
                            placeholder="Search By Return No"
                            value={searchText}
                            onSearch={handleSearch}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </Col>
                    <Col span={24} md={6} style={{ marginTop: '25px' }}>
                        <Flex centerVertically>
                            <span style={{ fontWeight: 'bold' }}>GST</span>&nbsp;<Switch onChange={GetSaleReturn} />&nbsp;<span style={{ fontWeight: 'bold' }}>Estimate</span>
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

export default SaleRetuen