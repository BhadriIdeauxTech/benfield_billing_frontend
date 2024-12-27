import { Col, Form } from 'antd';
import React from 'react'
import { Row } from '../../../../Components/Row';
import Input from '../../../../Components/Form/Input';
import { useState } from 'react';
import Button from '../../../../Components/Form/Button';
import Flex from '../../../../Components/Flex';
import { TextAreas } from '../../../../Components/Form/TextArea';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';

const Addsppliers = ({ getSupplier, handleSupplier }) => {
    const [form] = Form.useForm();

    const [switched, setSwitched] = useState(false);

    const URL = 'supplier/add_supplier/'

    const onFinish = (values) => {
        Addsupplier(values)
    };

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const onhandleSwitch = (checked) => {
        setSwitched(checked);
    };

   

    const Addsupplier = (values) => {
        request.post(`${URL}`, values)
            .then(function (response) {
                console.log(response);
                form.resetFields();
                if (response.status == 201) {
                    toast.success('Supplier details Added Successfully')
                    if (handleSupplier) {
                        handleSupplier();
                    }
                }
                else {
                    toast.success('Supplier details Added Successfully')
                }
            })

            .catch(function (error) {
                console.log(error, 'check');
                if (error.response && error.response.status === 400) {
                    if (error.response.data) {
                        if (error.response.data.gstin ) {
                            toast.warn(error.response.data.gstin[0]);
                        } else if (error.response.data.mobile_number) {
                            toast.warn(error.response.data.mobile_number[0]);
                        } else {
                            toast.error('Invalid input.');
                        }
                    } else {
                        toast.error('Invalid input.');
                    }
                }
            });
    }

    const onReset = () => {
        form.resetFields();
        if (handleSupplier) {
            handleSupplier();
        }
    }

    // const option = [
    //     { label: 'Tamil Nadu', value: 'TamilNadu' },
    //     { label: 'Kerala', value: 'Kerala' },
    //     { label: 'AndraPradesh', value: 'AndraPradesh' }
    // ]

    return (
        <div>
            <Form
                form={form}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    bank_detail: false
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Row gutter={[24, 24]}>

                    <Col span={24} md={12}>
                        <Input label={'Supplier Name'} placeholder={'Supplier Name'} name={'supplier_name'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Supplier Name!',
                                }
                            ]} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'Supplier Company'} placeholder={'Supplier Company'}
                            name={'supplier_company'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Supplier Company Name!',
                                }
                            ]} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'Mobile number'} placeholder={'Contact Number'}
                            maxLength={10}
                            name={'mobile_number'}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please enter Phone Number!',
                            //     },

                            //     {
                            //         min: 10,
                            //         message: 'Phone Number must be at least 10 characters!'
                            //     }
                            // ]}
                             />
                    </Col>

                    <Col span={24} md={12}>
                        <Input label={'Email id'} type="email" name={'email'}   placeholder={"Email ID"}
                       
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'State'} name={'supplier_state'} placeholder={'State'}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'GSTIN'} placeholder={'GSTIN'} name={'gstin'}
      
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <TextAreas label={'Address'} placeholder={'Address'} name={'supplier_address'}
                        />
                    </Col>

                    <Col span={24} md={24}><h1>Bank Details</h1></Col>

                    <Col span={24} md={12}>
                        <Input label={'Account Name'} placeholder={'Enter Account Name'}
                            name={'account_name'} />
                    </Col>

                    <Col span={24} md={12}>
                        <Input label={'Account Number'} placeholder={'Enter Account Number'}
                            name={'bank_account_no'} />
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


                    {/* <Col span={24} md={24}>
                        <Label>Bank Details</Label>
                        <Col span={24} md={5}>
                            <Switch onChange={onhandleSwitch} checked={switched} name={'bank_detail'} />
                        </Col>
                        {switched ?
                            <Row gutter={[12, 12]} >
                                <Col span={24} md={12}>
                                    <Input label={'Account Holder Name '} name={'account_name'} placeholder={'Account Holder Name'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter Your Details!',
                                            }
                                        ]} />
                                </Col>

                                <Col span={24} md={12}>
                                    <Input label={'Account Number'} name={'bank_account_no'}
                                        maxLength={20}
                                        placeholder={'Account Number'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter Your Details!',
                                            }
                                        ]} />
                                </Col>

                                <Col span={24} md={12}>
                                    <Input label={'Bank Name'} name={'bank_name'} placeholder={'Bank Name'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter Your Details!',
                                            }
                                        ]} />
                                </Col>
                            </Row>
                            : null}

                    </Col> */}
                    <Col span={24} md={12} offset={12}></Col>
                </Row>
                <Flex center gap={'20px'}>
                    <Button.Primary text={'ADD'} htmlType={'submit'} />
                    <Button.Danger text={'RESET'} onClick={() => onReset()} />
                </Flex>
            </Form>
        </div>
    )
}

export default Addsppliers