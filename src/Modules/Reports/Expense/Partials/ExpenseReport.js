import React from 'react'
import { CardOnBottom, CardOnTop, TableStyle } from '../../SaleReport/Partials/Style';
import { Row } from '../../../../Components/Row';
import { Col, Form, Space, Tag } from 'antd';
import Button from '../../../../Components/Form/Button';
import { Table } from '../../../../Components/Table';
import { PrinterFilled } from '@ant-design/icons';
import { useState } from 'react';
import Flex from '../../../../Components/Flex';
import request from '../../../../utils/request';
import { useEffect, useRef } from 'react';
import dayjs from 'dayjs'
import { Total } from './style';
import { CustomInputNumber } from '../../../../Components/Form/CustomInputNumber';
import { CustomDateRangePicker } from '../../../../Components/Form/CustomDateRangePicker';
import { TbArrowsExchange } from 'react-icons/tb';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import ParintTable from './print';


const ExpenseReport = () => {

    const componentRef = useRef();
    
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const URLS = 'expense/report_expense/'

    const [selectedDate, setSelectedDate] = useState(dayjs().format('DD-MM-YY'));

    const [totalamt, setTotalamt] = useState(0)
    const [passdata, setPassdata] = useState([])
    //=======================Date-Range=================//

    const [dateRange, setDateRange] = useState([]);

    const handleDateRangeChange = (values) => {
        const NewValue = { ...values, rangeValue: dateRange }
        setDateRange(values);
    };

    const [dataSource, setDataSource] = useState([]);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        const NewValue = { ...values, range: dateRange }
        PostDaterange(NewValue)
    };

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const columns = [
        {
            title: 'SI NO',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            render: (date) => {
                return dayjs(date).format('DD\\MM\\YYYY');
            },
        },
        {
            title: 'Expense Name',
            dataIndex: 'expense_name',

        },
        {
            title: 'Expense Amount',
            dataIndex: 'expense_amount',

        },
        {
            title: 'Description',
            dataIndex: 'description',

        },

    ];
    const data = [
        {
            Date:'24-5-2023',
            expense_name:'kavin',
            expense_amount:'500',
            description:'need pertol'
        },

    ]
    const GetExpense = (record) => {
        request.get(`${URLS}`,record).then((response) => {
            setDataSource(response.data?.expence_list)
            setTotalamt(response.data?.total_amt)
            form.resetFields();
            // setPassdata(response.data?.amount)
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        GetExpense();
    }, [])

    const PostDaterange = (values) => {
        request.post(`${URLS}`, values).then((response) => {
            form.resetFields();
            setDataSource(response.data?.expence_list)
            setTotalamt(response.data?.total_amt)
        }).catch(error => {
            console.log(error);
        });
    }
    const handleTotalAmtChange = event => {
        const newTotalAmt = event.target.value;
        setTotalamt(newTotalAmt);
    };

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
                    initialValues={
                        {
                            date: dayjs(selectedDate)
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
                                name={'Date'}
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
                                <ParintTable componentRef={componentRef} data={dataSource} total={totalamt}  />
                            </div>
                            {
                                dataSource.length > 0 && (
                                    <Button.Primary icon={<PrinterFilled />} onClick={handlePrint} />
                                )
                            }
                        </Col>
                    </Row>

                </Form>

            </CardOnTop >
           <CardOnBottom>
                <Row gutter={[24, 24]}>
                    <Col span={24} md={20}>
                        <h1>Transactions :</h1>
                    </Col>

                     <TableStyle >
                        <Table columns={columns} data={data} />
                        <Flex end>
                            <Row>
                                <Col span={24} md={20}>
                                    <Total>
                                        <CustomInputNumber precision={2} label={'Total Amount'} value={totalamt} onChange={handleTotalAmtChange} placed={'end'} disabled />
                                    </Total>
                                </Col>
                            </Row>
                        </Flex>
                    </TableStyle> 
                </Row>
            </CardOnBottom> 

        </div>
    )
}

export default ExpenseReport