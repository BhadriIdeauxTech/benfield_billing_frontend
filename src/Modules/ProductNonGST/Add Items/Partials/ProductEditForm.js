import { Col, Form, Upload as Uploded } from 'antd'
import React, { useState } from 'react'
import Button from '../../../../Components/Form/Button';
import Flex from '../../../../Components/Flex';
import { Row } from '../../../../Components/Row';
import Input from '../../../../Components/Form/Input';
import { InputNumber } from '../../../../Components/Form/InputNumber';
import { useSelector } from 'react-redux';
import { Select } from '../../../../Components/Form/Select';
import { TopTitle } from '../../../../Components/Form/TopTitle';
import { useEffect } from 'react';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';

export const ProductForm = ({ setCustomers, data }) => {
    const [form] = Form.useForm();
    const URL = 'product/products_all_details_edit'
    const member = useSelector(state => state);
    console.log(member)

    const option = [
        { label: 'Kg', value: 'kg' },
        { label: 'Litre', value: 'litre' },
        { label: 'Nos', value: 'nos' },
        { label: 'Metre', value: 'metre' },
    ]
    const onFinish = (values) => {
        EditItems(values, data.id)

    };
    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const onReset = () => {
        form.resetFields();

    }
    useEffect(() => {
        form.setFieldsValue(data)
    }, [data])

    const EditItems = (record, id) => {
        request.get(`product/products_all_details_edit/${id}`).then((response) => {
        }).catch(error => {
            console.log(error);
        });

    }
    return (
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
            <TopTitle Heading={'Edit Items'} />

            <Row gutter={[24, 24]}  >
                <Col span={24} md={12}>

                    <Input label={'Item/Product Name'} placeholder={'Product Name'} name={'item_name'} rules={[
                        {
                            required: true,
                            message: 'Please Enter Product Name!',
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'HSN Code'} placeholder={'HSN code'} name={'item_hsn'} rules={[
                        {
                            required: true,
                            message: 'Please Enter HSN Code!',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <InputNumber label={'Item Quantity'} placeholder={'Item Quantity'} name={'item_qty'} rules={[
                        {
                            required: true,
                            message: 'Please Enter Item Quantity!',
                        }
                    ]}
                    /></Col>
                <Col span={24} md={12}>
                    <Select options={option} label={'Item Unit Name'} name={'item_unit'} rules={[
                        {
                            required: true,
                            message: 'Please Enter Your Item Unit Name!',
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <InputNumber label={'MRP'} name={'mrp'} placeholder={"MRP"} rules={[
                        {
                            required: true,
                            message: 'Please Enter MRP!',
                        }
                    ]}
                    /></Col>
                <Col span={24} md={12}>
                    <InputNumber label={'Buy Rate'} name={'buy_rate'} placeholder={"Buy Rate"} rules={[
                        {
                            required: true,
                            message: 'Please Enter Buy rate!',
                        }
                    ]}
                    /></Col>
                <Col span={24} md={12}>
                    <InputNumber label={'Price'} name={'price'} placeholder={"Price"} rules={[
                        {
                            required: true,
                            message: 'Please Enter Product Price!',
                        }
                    ]}
                    /></Col>
                <Col span={24} md={12}>
                    <InputNumber label={'Discount Percentage(%)'} name={'discount_percentage'} placeholder={"Discount Percentage"} rules={[
                        {
                            required: true,
                            message: 'Please Enter Discount Percentage!',
                        }
                    ]}
                    /></Col>
                <Col span={24} md={12}>
                    <InputNumber label={'Discount Amount'} name={'discount_amount'} placeholder={"Discount Amount"} disabled={'fixedamount'}
                    /></Col>
                <Col span={24} md={12}>
                    <InputNumber label={'GST Percentage(%)'} name={'gst_percentage'} placeholder={"GST percentage"} rules={[
                        {
                            required: true,
                            message: 'Please Enter GST Percentage!',
                        }
                    ]}
                    /></Col>
                <Col span={24} md={12}>
                    <InputNumber label={'GST Amount'} name={'gsr_amount'} placeholder={"GST Amount"} disabled={'fixedamount'}
                    /></Col>
                <Col span={24} md={12}>
                    <InputNumber label={'Total Amount'} name={'total_amount'} placeholder={"Total Amount"} rules={[
                        {
                            required: true,
                            message: 'Please Enter Total Amount!',
                        }
                    ]}
                    /></Col>
                <Flex center gap={'20px'}>
                    <Button.Success text={'Save'} htmlType={'submit'} />
                    <Button.Danger text={'Cancel'} onClick={onReset} />
                </Flex>
            </Row>


        </Form>

    )
}
