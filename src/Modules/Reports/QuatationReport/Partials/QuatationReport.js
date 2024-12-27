import React from 'react'
import { CardOnBottom, CardOnTop, TableStyle } from '../../SaleReport/Partials/Style';
import { Row } from '../../../../Components/Row';
import { Col, Form, Space, Tag } from 'antd';
import { CustomDateRangePicker } from '../../../../Components/Form/CustomDateRangePicker';
import Button from '../../../../Components/Form/Button';
import { PrinterFilled } from '@ant-design/icons';
import { Table } from '../../../../Components/Table';
import { useState } from 'react';
import { TbArrowsExchange } from 'react-icons/tb';
import Flex from '../../../../Components/Flex';
import dayjs from 'dayjs';
import request from '../../../../utils/request';
import { CustomDatePicker } from '../../../../Components/Form/CustomDatePicker';
import { useEffect, useRef } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import ParintTable from './print';
import Switch from '../../../../Components/Form/Switch';
import Input from '../../../../Components/Form/Input';
import { toast } from 'react-toastify';

const QuatationReport = () => {

    const [form] = Form.useForm();

    const URLS = 'sales/estimate_quot_details_serach/'

    const [passdata, setPassdata] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [dateRange, setDateRange] = useState([]);
    const [checkedGST, setCheckedGST] = useState(true)
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const [searchText, setSearchText] = useState([]);

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })


    const onFinish = (values) => {
        const NewValue = { ...values, range: dateRange }
        PostEstimate(NewValue)
    }

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const PostEstimate = (values) => {
        if (checkedGST) {
            request.post(`quotation/estimate_quot_details_serach_new/`, values)
                .then(function (response) {
                    setDataSource(response.data?.sale)
                    setPassdata(response.data?.amount)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            request.post(`quotation/estimate_quot_details_serach/`, values)
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
        GetEstimate();
    }, [])

    const GetEstimate = (checked) => {
        setCheckedGST(checked)
        if (checked) {
            request.get('quotation/estimate_quot_details_serach_new/')
                .then(function (response) {
                    setDataSource(response.data?.sale)
                    setPassdata(response.data?.amount)
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        else {
            request.get('quotation/estimate_quot_details_serach/')
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
        setDataSource(dataSource)
    }, [dataSource])


    const handleDateRangeChange = (values) => {
        const NewValue = { ...values, rangeValue: dateRange }
        setDateRange(values);
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
            dataIndex: 'ref_no',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.ref_no).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.ref_no).includes(value.toUpperCase());
            },
        },
        {
            title: 'Amount',
            dataIndex: 'grand_total',
        }

    ];




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
                            from_date: dayjs(),
                            to_date: dayjs(),
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
                            {
                                dataSource.length > 0 && (
                                    <Button.Primary icon={<PrinterFilled />} onClick={handlePrint} />
                                )
                            }

                        </Col>
                    </Row>

                </Form>
                {/* <CardPayment /> */}

            </CardOnTop >
            <CardOnBottom>
                <Row gutter={[24, 24]}>
                    <Col span={24} md={13}>
                        <h1>Transactions :</h1>
                    </Col>
                    <Col span={24} md={5} style={{ marginTop: '25px' }}>
                        <Input
                            placeholder="Search by Invoice No"
                            value={searchText}
                            onSearch={handleSearch}
                            onChange={(e) => handleSearch(e.target.value)}/>
                    </Col>
                    <Col span={24} md={6} style={{ marginTop: '25px' }}>
                        <Flex centerVertically>
                            <span style={{ fontWeight: 'bold' }}>GST</span>&nbsp;<Switch onChange={GetEstimate} />&nbsp;<span style={{ fontWeight: 'bold' }}>Estimate</span>
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

export default QuatationReport