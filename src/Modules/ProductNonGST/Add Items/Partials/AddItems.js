import { Col, Form, Upload as Uploded } from 'antd'
import React, { useState } from 'react'
import Button from '../../../../Components/Form/Button';
import Flex from '../../../../Components/Flex';
import { Row } from '../../../../Components/Row';
import Input from '../../../../Components/Form/Input';
import { useSelector } from 'react-redux';
import request from '../../../../utils/request';
import { CustomInputNumber } from '../../../../Components/Form/CustomInputNumber';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


export const AddItems = ({ setProduct,Itemdata ,handleGetProduct}) => {
    
    const [form] = Form.useForm();
    const URL = 'product/product_add'
    
    const onFinish = (values) => {
        if (Itemdata) {
            EditItems(values,Itemdata.id)
      
        }
        else {
            Addproduct(values)
            form.resetFields();
        }
      
    };
    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };
    const member = useSelector(state => state);
    console.log(member)

//================product-post=============================//

    const Addproduct = (values) => {
        request.post(`${URL}`, values)
            .then(function (response) {
                console.log(response);
              
                if(setProduct){
                    toast.success(" Successfully  Added Products")
                    form.resetFields();
                    setProduct();
                }
                else{
                    toast.success("Successfully  Added Products")  
                }
              
            })
            .catch(function (error) {
                console.log(error);
                toast.error("Faild")
            });
    }

    const option = [
        { label: 'Kg', value: 'kg' },
        { label: 'Litre', value: 'litre' },
        { label: 'Nos', value: 'nos' },
        { label: 'Metre', value: 'metre' },
    ]

    const onReset = () => {
        form.resetFields();
        handleGetProduct();
        
    }

    //=====================Edit-Item==========================//

    useEffect(() => {
        form.setFieldsValue(Itemdata)
    }, [Itemdata])


    const EditItems = (record, id) => {
        console.log(record,id, 'hhhhh')
        request.patch(`product/app_items/${id}`,record).then((response) => {
            handleGetProduct();
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

            <Row gutter={[12, 12]}>
                <Col span={24} md={12}>
                    <Input label={'Item/Product Name'} placeholder={'Product Name'} name={'item_name'}  rules={[
                        {
                            required: true,
                            message: 'Please Enter Product Name!',
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'HSN Code'} placeholder={'HSN code'} name={'item_hsn'}  />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber  label={'Price'} precision={2} name={'sale_rate'} placeholder={"Price"} 
                   /></Col>
            </Row>
            <Flex center gap={'20px'} style={{ margin: '20px 0px' }}>
                <Button.Primary text={'ADD'} htmlType={'submit'} />
                <Button.Danger text={'RESET'} htmlType={'cancel'} onClick={() => onReset()} />
            </Flex>
        </Form>

    )
}