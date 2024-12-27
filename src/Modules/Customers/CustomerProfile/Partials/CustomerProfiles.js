import React from 'react'
import { Col, Form } from 'antd'
import { Row } from '../../../../Components/Row'
import Input from '../../../../Components/Form/Input'
import { CustomInputNumber } from '../../../../Components/Form/CustomInputNumber'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { TextAreas } from '../../../../Components/Form/TextArea'
import Flex from '../../../../Components/Flex'
import Button from '../../../../Components/Form/Button'
import { useNavigate, useParams } from 'react-router-dom'
import TabDetails from './TabDetails'
import { useEffect } from 'react'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'

const CustomerProfilesDetails = ({ setCutomer, getCustomer }) => {

    const [form] = Form.useForm();

    const { id } = useParams();

    const URLS = 'customers/customer_profile'

    const [customerProfile, setCustomerProfile] = useState({});

    const navigate = useNavigate();

    const [switched, setSwitched] = useState(false);
    const onFinish = (values) => {
     
    };
    useEffect(() => {
        GetCustomer();
    }, [])

    useEffect(() => {
        form.setFieldsValue({ customer_name: customerProfile.customer_details?.customer_name })
        form.setFieldsValue({ customer_company_name: customerProfile.customer_details?.customer_company_name })
        form.setFieldsValue({ email: customerProfile.customer_details?.email })
        form.setFieldsValue({ mobile_number: customerProfile.customer_details?.mobile_number })
        form.setFieldsValue({ gstin: customerProfile.customer_details?.gstin })
        form.setFieldsValue({ customer_address: customerProfile.customer_details?.customer_address })
        form.setFieldsValue({ credit_limit: customerProfile.customer_details?.credit_limit })
        form.setFieldsValue({ advanced_amt: customerProfile.customer_details?.advanced_amt })
        form.setFieldsValue({ credit_amt_balance: customerProfile.customer_details?.credit_amt_balance })
        form.setFieldsValue({ supplier_state: customerProfile.customer_details?.supplier_state })
        form.setFieldsValue({ debit_amt: customerProfile.customer_details?.debit_amt })
        form.setFieldsValue({ total_business_amt: customerProfile.customer_details?.total_business_amt })
        form.setFieldsValue({ bank_account_name: customerProfile.customer_details?.bank_account_name })
        form.setFieldsValue({ bank_account_number: customerProfile.customer_details?.bank_account_number })
        form.setFieldsValue({ ifsc_code: customerProfile.customer_details?.ifsc_code })
        form.setFieldsValue({ bank_name: customerProfile.customer_details?.bank_name })
        form.setFieldsValue({ bank_branch: customerProfile.customer_details?.bank_branch })

    }, [customerProfile])

    const GetCustomer = () => {
        request.get(`${URLS}/${id}`)
            .then(function (response) {
                setCustomerProfile(response.data)
                setCutomer(response.data)
                // setDataSource(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const member = useSelector(state => state);
    console.log(member)

    const onhandleSwitch = () => {
        setSwitched(!switched);
    }

    const onReset = () => {
        form.resetFields();
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
            autoComplete="off"
            >

            <Row gutter={[24, 24]}>
                <Col span={24} md={12}>
                    <Input label={'Customer Name'} style={{ textTransform: 'uppercase' }} placeholder={'Customer Name'} name={'customer_name'} disabled
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Customer Name!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <CustomInputNumber label={'Mobile number'} placeholder={'Contact Number'} disabled name={'mobile_number'}
                                style={{ textTransform: 'uppercase' }}
                    />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'GSTIN'} placeholder={'GSTIN'} disabled name={'gstin'}
                                style={{ textTransform: 'uppercase' }}
                    />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Company Name'} placeholder={'Company Name'} disabled name={'customer_company_name'}
                                style={{ textTransform: 'uppercase' }}
                     />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'State'} name={'supplier_state'} placeholder={'Select'} disabled
                                style={{ textTransform: 'uppercase' }}
                    />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Email id'} name={'email'} disabled placeholder={"Email ID"}
                    />
                </Col>
                {/* <Col span={24} md={12}>
                    <Input label={'Credit Limit Amount'} precision={2} placeholder={'Credit Limit'} disabled
                        name={'credit_limit'}
                    />
                </Col> */}
                <Col span={24} md={12}>
                    <TextAreas label={'Address'} placeholder={'Address'} disabled name={'customer_address'}
                                style={{ textTransform: 'uppercase' }}
                    />
                </Col>
                
                <Col span={24} md={12}>
                    <Input label={'Total Credit Balance'} name={'credit_amt_balance'} disabled placeholder={'Total Credit Balance'} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Total Business Amount'} name={'total_business_amt'} disabled placeholder={'Total Business Amount'} />
                </Col>
                <Col span={24} md={24}><h1>Bank Details</h1></Col>

                <Col span={24} md={12}>
                    <Input label={'Account Name'} disabled placeholder={'Enter Account Name'} style={{ textTransform: 'uppercase' }}
                        name={'bank_account_name'} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Account Number'} disabled placeholder={'Enter Account Number'}
                        name={'bank_account_number'}  style={{ textTransform: 'uppercase' }}/>
                </Col>

                <Col span={24} md={12}>
                    <Input label={'IFSC Code'} disabled placeholder={'Enter IFSC code'}
                        name={'ifsc_code'} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Bank Name'} disabled placeholder={'Enter Bank Name'}
                        name={'bank_name'}  style={{ textTransform: 'uppercase' }} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Branch Name'} disabled placeholder={'Enter Branch Name'}
                        name={'bank_branch'}  style={{ textTransform: 'uppercase' }}/>
                </Col>
                <Col span={24} md={12} offset={12}></Col>
                <Col span={24} md={24}>
                    <TabDetails customerProfile={customerProfile} />
                </Col>
            </Row><br />

            <Flex>
                <Button.Primary text={'Back'} onClick={() => navigate(-1)} />
            </Flex>
        </Form>


    )
}

export default CustomerProfilesDetails