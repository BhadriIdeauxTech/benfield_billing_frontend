
import { Col, Form, Upload as Uploded } from 'antd'
import React, { useState } from 'react'
import { Row } from '../../../../Components/Row';
import Input from '../../../../Components/Form/Input';
import { InputNumber } from '../../../../Components/Form/InputNumber';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';


export const ProductViewForm = ({ setCustomers, datas }) => {
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
        viewItems(values, datas.id)
    };
    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const onReset = () => {
        form.resetFields();

    }
    useEffect(() => {
        form.setFieldsValue(datas)
    }, [datas])

    const viewItems = (record, id) => {
        request.get(`${URL}`).then((response) => {
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
            {/* <TopTitle Heading={'View Items'} /> */}

            <Row gutter={[12, 12]}  >
                <Col span={24} md={12}>

                    <Input label={'Item/Product Name'} placeholder={'Product Name'} style={{ textTransform: 'uppercase' }}
                    name={'item_name'} disabled rules={[
                        {
                            required: true,
                            message: 'Please Enter Product Name!',
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'HSN Code'} placeholder={'HSN code'} name={'item_hsn'} style={{ textTransform: 'uppercase' }}
                     disabled rules={[
                        {
                            required: true,
                            message: 'Please Enter HSN Code!',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <InputNumber label={'Available Quantity'} placeholder={'Available Quantity'} name={'avilable_qty'} disabled rules={[
                        {
                            required: true,
                            message: 'Please Enter Available Quantity!',
                        }
                    ]}
                    /></Col>
                <Col span={24} md={12}>
                    <Input label={'Item Unit Name'} name={'item_unit'} style={{ textTransform: 'uppercase' }}
                     disabled rules={[
                        {
                            required: true,
                            message: 'Please Enter Your Item Unit Name!',
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <InputNumber label={'MRP'} name={'mrp'} placeholder={"MRP"} 
                     disabled rules={[
                        {
                            required: true,
                            message: 'Please Enter MRP!',
                        }
                    ]}
                    /></Col>
                <Col span={24} md={12}>
                    <InputNumber label={'Buy Rate'} name={'buy_rate'} placeholder={"Buy Rate"} disabled rules={[
                        {
                            required: true,
                            message: 'Please Enter Buy rate!',
                        }
                    ]}
                    /></Col>
            </Row>
           
        </Form>

    )
}
