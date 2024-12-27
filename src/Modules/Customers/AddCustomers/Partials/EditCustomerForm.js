import { Col, Form } from 'antd';
import React, { useEffect } from 'react'
import { TextAreas } from '../../../../Components/Form/TextArea';
import Input from '../../../../Components/Form/Input';
import { TopTitle } from '../../../../Components/Form/TopTitle';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../Components/Form/Button';
import Flex from '../../../../Components/Flex';
import { Row } from '../../../../Components/Row';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';

const EditCustomerForm = ({ handleSalesCustomer, cusdata, handleCus }) => {

    // const EditCustomer = EditCustomers
    const [form] = Form.useForm();
    const [switched, setSwitched] = useState(null);

    const URL = 'customers/add_customer/'

    const onFinish = (values) => {
        if (cusdata) {
            EditCustomers(values, cusdata.id)
            // handleCus();
        }
        else {
            Addcustomer(values)


        }

    };

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };
    const member = useSelector(state => state);
    console.log(member)

    const onhandleSwitch = () => {
        setSwitched(!switched);
    }

    const Addcustomer = (values) => {
        request.post(`${URL}`, values)
            .then(function (response) {
                form.resetFields();
                toast.success("Customer Details Add Successfully")
                if (handleSalesCustomer) {
                    form.resetFields();
                    handleSalesCustomer();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onReset = () => {
        form.resetFields();
        if (handleSalesCustomer) {
            form.resetFields();
            handleSalesCustomer();
        }

        if (handleCus) {
            handleCus();
        }
    }
    //===================edit========================//
    useEffect(() => {
        form.setFieldsValue(cusdata)
    }, [cusdata])


    const EditCustomers = (record, id) => {
        request.patch(`customers/edit_cutomer/${id}`, record).then((response) => {
            handleCus();
            toast.success("Updated Sucessfully")
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                if (error.response.data) {
                    if (error.response.data.gstin) {
                        toast.warn(error.response.data.gstin[0]);
                    } else if (error.response.data.mobile_number) {
                        toast.warn(error.response.data.mobile_number[0]);
                    }
                    else if (!error.response.data.gstin && !error.response.data.mobile_number) {
                        toast.warn('Mobile Number and GSTIN invalid.');
                    }
                     else {
                        toast.error('Invalid input.');
                    }
                } else {
                    toast.error('Invalid input.');
                }
            }
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
            <Row gutter={[24, 24]}>
                <Col span={24} md={12} >
                    <Input label={'Customer Name'} placeholder={'Customer Name'} name={'customer_name'} rules={[
                        {
                            required: true,
                            message: 'Please Enter Customer Name!',
                        }
                    ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Mobile number'} placeholder={'Contact Number'} name={'mobile_number'}
                        maxLength={10}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please Enter Your Phone Number!',
                        //     },

                        //     {
                        //         min: 10,
                        //         message: 'Phone Number must be at least 10 characters!'
                        //     }
                        // ]} 
                        />

                </Col>
                <Col span={24} md={12}>
                    <Input label={'Company Name'} placeholder={'Company Name'} name={'customer_company_name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Details!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Email id'} name={'email'} type="email" placeholder={"Email ID"}
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please Enter Details!',
                        //     }
                        // ]} 
                        />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'GSTIN'} placeholder={'GSTIN'} name={'gstin'} />
                </Col>

                <Col span={24} md={12}>
                    <TextAreas label={'Address'} placeholder={'Address'} name={'customer_address'} />
                </Col>
                <Col span={24} md={24}><h1>Bank Details</h1></Col>

                <Col span={24} md={12}>
                    <Input label={'Account Name'} placeholder={'Enter Account Name'}
                        name={'bank_account_name'} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Account Number'} placeholder={'Enter Account Number'}
                        name={'bank_account_number'} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'IFSC Code'} placeholder={'Enter IFSC code'}
                        name={'ifsc_code'} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Bank Name'} placeholder={'Enter Bank Name'}
                        name={'bank_name'} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Branch Name'} placeholder={'Enter Branch Name'}
                        name={'bank_branch'} />
                </Col>

            </Row><br />
            <Flex center gap={'20px'} style={{ margin: '20px 0px' }}>
                <Button.Primary text={'Save'} htmlType={'submit'} />
                <Button.Danger text={'Cancel'} onClick={() => onReset()} />
            </Flex>
        </Form>
    )
}

export default EditCustomerForm