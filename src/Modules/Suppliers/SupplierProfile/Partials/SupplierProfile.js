import { Col, Form } from 'antd'
import React from 'react'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { Row } from '../../../../Components/Row'
import Input from '../../../../Components/Form/Input'
import { CustomInputNumber } from '../../../../Components/Form/CustomInputNumber'
import { TextAreas } from '../../../../Components/Form/TextArea'
import Label from '../../../../Components/Form/Label'
import Switch from '../../../../Components/Form/Switch'
import Flex from '../../../../Components/Flex'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../../../../Components/Form/Button'
import { useNavigate, useParams } from 'react-router-dom'
import TabDetails from './TabDetails'
import request from '../../../../utils/request'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const SupplierProfile = ({ setSupplier, getSupplier }) => {

    const [form] = Form.useForm();

    const { id } = useParams();

    const navigate = useNavigate();

    const URLS = 'supplier/supplier_profile'

    const [switched, setSwitched] = useState(false);

    const [supplierProfile, setSupplierProfile] = useState({});

    const onFinish = (values) => {
        // setSupplierProfile(values)
    };


    useEffect(() => {
        GetSupplier();
    }, [])

    useEffect(() => {
        form.setFieldsValue({ supplier_name: supplierProfile.supplier_details?.supplier_name })
        form.setFieldsValue({ supplier_company: supplierProfile.supplier_details?.supplier_company })
        form.setFieldsValue({ email: supplierProfile.supplier_details?.email })
        form.setFieldsValue({ supplier: supplierProfile.supplier_details?.id })
        form.setFieldsValue({ mobile_number: supplierProfile.supplier_details?.mobile_number })
        form.setFieldsValue({ gstin: supplierProfile.supplier_details?.gstin })
        form.setFieldsValue({ supplier_address: supplierProfile.supplier_details?.supplier_address })
        form.setFieldsValue({ credit_amt: supplierProfile.supplier_details?.credit_amt })
        form.setFieldsValue({ debt_amt: supplierProfile.supplier_details?.debt_amt })
        form.setFieldsValue({ business_total_amt: supplierProfile.supplier_details?.business_total_amt })
        form.setFieldsValue({ bank_account_no: supplierProfile.supplier_details?.bank_account_no })
        form.setFieldsValue({ account_name: supplierProfile.supplier_details?.account_name })
        form.setFieldsValue({ bank_name: supplierProfile.supplier_details?.bank_name })
        form.setFieldsValue({ advanced_amt: supplierProfile.supplier_details?.advanced_amt })
        form.setFieldsValue({ ifsc_code: supplierProfile.supplier_details?.ifsc_code })
        form.setFieldsValue({ bank_branch: supplierProfile.supplier_details?.bank_branch })


    }, [supplierProfile])

    const GetSupplier = () => {
        request.get(`${URLS}/${id}`)
            .then(function (response) {
                setSupplierProfile(response.data)
                setSupplier(response.data)
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
                <Col span={24} md={12}>
                    <Input label={'Supplier Name'}
                    style={{ textTransform: 'uppercase' }}
                        placeholder={'Supplier Name'}
                        name={'supplier_name'}
                        disabled rules={[
                            {
                                required: true,
                                message: 'Please Enter Supplier Name!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <CustomInputNumber label={'Mobile number'} placeholder={'Contact Number'} 
                        disabled name={'mobile_number'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Your Phone Number!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Supplier Company'} placeholder={'Supplier Company'} style={{ textTransform: 'uppercase' }} disabled
                        name={'supplier_company'} rules={[
                            {
                                required: true,
                                message: 'Please Enter Supplier Company!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Email id'} name={'email'} disabled placeholder={"Email ID"}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Your Details!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'GSTIN'} placeholder={'GSTIN'} disabled name={'gstin'} style={{ textTransform: 'uppercase' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Your Details!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <TextAreas label={'Address'} placeholder={'Address'} disabled name={'supplier_address'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Your Details!',
                            }
                        ]} />
                </Col>
                {/* <Col span={24} md={12} offset={12}></Col> */}
                <Col span={24} md={12}>
                    <Label>View Bank Details</Label>
                    <Col span={24} md={5}>
                        <Switch onClick={() => onhandleSwitch()} />
                    </Col>
                </Col>
                <Col span={24} md={24}>
                    <Row gutter={[12, 12]}>
                        {/* <Col span={24} md={12}>
                            <CustomInputNumber label={'Total Advanced Amount '} precision={2} 
                            disabled name={'advanced_amt'} 
                            placeholder={'Total Advanced Amount '} />
                        </Col> */}

                        {/* <Col span={24} md={12}>
                            <CustomInputNumber label={'Total Credit Amount'} precision={2} 
                            name={'credit_amt'} disabled placeholder={'Total Credit Amount'} />
                        </Col> */}
                        <Col span={24} md={12}>
                            <CustomInputNumber label={'Total Business Amount'} precision={2}
                                name={'business_total_amt'} disabled placeholder={'Total Business Amount'} />
                        </Col>
                        <Col span={24} md={12}>
                            <CustomInputNumber label={'Total Debt Amount'} precision={2}
                                name={'debt_amt'} disabled
                                placeholder={'Total Debt Amount'} />
                        </Col>
                        <Col span={24} md={12} offset={12}></Col>
                    </Row>
                    {switched ?
                        <div>
                            <Row gutter={[12, 12]}>
                                <Col span={24} md={12}>
                                    <CustomInputNumber label={'Account Holder Name'} disabled style={{ textTransform: 'uppercase' }}
                                        name={'account_name'} placeholder={'Account Holder Name'} />
                                </Col>
                                <Col span={24} md={12}>
                                    <Input label={'Account Number'} name={'bank_account_no'}
                                        disabled placeholder={'Account Number'} />
                                </Col>
                                <Col span={24} md={12}>
                                    <CustomInputNumber label={'Bank Name'} name={'bank_name'} disabled style={{ textTransform: 'uppercase' }}
                                        placeholder={'Bank Name'} />
                                </Col>
                                <Col span={24} md={12}>
                                    <Input label={'IFSC Code'} disabled placeholder={'Enter IFSC code'} style={{ textTransform: 'uppercase' }}
                                        name={'ifsc_code'} />
                                </Col>
                                <Col span={24} md={12}>
                                    <Input label={'Branch Name'} disabled placeholder={'Enter Branch Name'} style={{ textTransform: 'uppercase' }}
                                        name={'bank_branch'} />
                                </Col>
                            </Row><br />
                        </div>
                        : null}
                </Col>
                <Col span={24} md={12} offset={12}></Col>
                <Col span={24} md={24}>
                    <TabDetails getSupplier={getSupplier} />
                </Col>
                <Flex>
                    <Button.Primary text={'Back'} onClick={() => navigate(-1)} />
                </Flex>
            </Row><br />
        </Form>


    )
}

export default SupplierProfile