import { Col, Form } from 'antd';
import React from 'react'
import { useState } from 'react';
import { Select } from '../../../../Components/Form/Select';
import { CustomDatePicker } from '../../../../Components/Form/CustomDatePicker';
import { CustomInputNumber } from '../../../../Components/Form/CustomInputNumber';
import Flex from '../../../../Components/Flex';
import Button from '../../../../Components/Form/Button';
import { Row } from '../../../../Components/Row';
import dayjs from 'dayjs';
import { phoneValidator } from '../../../../utils/PhnNumberValidator';
import Input from '../../../../Components/Form/Input';
import request from '../../../../utils/request';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const SupplierPayementDetails = ({ setSupplier, getSupplier }) => {

    const [form] = Form.useForm();
    const [SelectedDate, setSelectedDate] = useState(dayjs().format('MMMM DD, YYYY'));

    // ========  Supplier Mobile NUmber  =============
    const [supplierMobile, setSupplierMobile] = useState([])

    const URLS = 'supplier/add_supplier/'
    const URLS1 = 'supplier/supplier_advance_amt_payment/'
    const URLS2 = 'supplier/supplier_credit_amt_payment/'
    const URLS3 = 'supplier/supplier_debit_amt_payment/'

    // ========  Supplier Mobile NUmber  =============
    const [selectedSupplier, setSelectedSupplier] = useState({})

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const URL1 = URLS1
    const URL2 = URLS2
    const URL3 = URLS3

    const [payType, setPayType] = useState('');

    const handleSelectChange = (values) => {
        setPayType(values);
    }
    const [cashType, setCashType] = useState('');

    const handleSelectChanges = (values) => {
        setCashType(values);
    }
    const onFinish = (values) => {
        console.log('Success:', values);

        let result = {
            supplier: values.supplier,
            supplier_name: values.supplier_name,
            mobile_number: values.mobile_number,
            payment_type: values.cashtype,
            cheque_no: values.refno,
            payment_date: values.selected_date,
            advanced_amt: values.advanced_amount,
            credit_amt: values.credit_amt_pay,
            debit_amt: values.debt_amt_pay,
            // payment_type: values.payment_type,
            previous_advanced_amt: values.advanced_amt,
            previous_credit_amt: values.credit_amt,
            previous_debit_amt: values.debt_amt,
        };
        Supplierpost(result)
    };
    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const onReset = () => {
        form.resetFields();
    };

    const suppliers = [
        { label: 'Supplier 1', value: 'suplier_one' },
        { label: 'Supplier 2', value: 'suplier_two' },
        { label: 'Supplier 3', value: 'suplier_three' },
    ]
    const suppliersnum = [
        { label: 'Suppliernum 1', value: 'suplier_num_one' },
        { label: 'Suppliernum 2', value: 'suplier_num_two' },
        { label: 'Suppliernum 3', value: 'suplier_num_three' },
    ]
    const paytype = [
        { label: 'Advanced Payment', value: 'advanced_amttt' },
        { label: 'Credit Payment', value: 'credit_amttt' },
        { label: 'Debit Amount', value: 'debt_amttt' },
    ]
    const ChequesBank = [

        { label: 'Cash', value: 'Cash' },
        { label: 'Cheque', value: 'Cheque' },
        { label: 'UPI', value: 'UPI' },
    ]

    const Supplierpost = (values) => {
        if (payType === 'advanced_amttt') {
            request.post(`${URL1}`, values)
                .then(function (response) {
                    console.log(response);
                    // getSupplier(values)
                    toast.success("Success")
                    form.resetFields();
                })
                .catch(function (error) {
                    console.log(error);
                    toast.error("Faild")
                });
        }
        else if (payType === 'credit_amttt') {
            request.post(`${URL2}`, values)
                .then(function (response) {
                    console.log(response);
                    toast.success("Success")
                    form.resetFields();
                })
                .catch(function (error) {
                    console.log(error);
                    toast.error("Faild")
                });
        }
        else if (payType === 'debt_amttt') {
            request.post(`${URL3}`, values)
                .then(function (response) {
                    console.log(response);
                    // getSupplier(values)
                    toast.success("Success")
                    form.resetFields();
                })
                .catch(function (error) {
                    console.log(error);
                    toast.error("Faild")
                });
        }
    }

    useEffect(() => {
        GetSupplier();
    }, [])

    useEffect(() => {
        form.setFieldsValue({ supplier_name: selectedSupplier.supplier_name })
        form.setFieldsValue({ credit_amt: selectedSupplier.credit_amt })
        form.setFieldsValue({ debt_amt: selectedSupplier.debt_amt })
        form.setFieldsValue({ supplier: selectedSupplier.id })
        form.setFieldsValue({ mobile_number: selectedSupplier.mobile_number })
        form.setFieldsValue({ advanced_amt: selectedSupplier.advanced_amt })

    }, [selectedSupplier])


    const GetSupplier = (values) => {
        request.get(`${URLS}`, values)
            .then(function (response) {
                console.log(response.data, 'supplier');
                setSupplier(response.data)
                console.log(response.data,'hhhhhhhhhhhhh')
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    console.log(getSupplier, 'getSuppliergetSupplier')

    // ===========  Supplier MobileNumber Data =========

    const SupplierMobiles = getSupplier.map(mob => ({ label: mob.mobile_number, value: mob.mobile_number }))

    const handleSelectedSupplier = (value) => {

        const SelectedSupplierDetails = getSupplier.find((mem) => mem.mobile_number === value)
        setSelectedSupplier(SelectedSupplierDetails);
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
            initialValues={
                {
                    selected_date: dayjs(),
                    cashtype: 'Cash'
                }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Row gutter={[24, 24]}>
                <Col span={24} md={10} >
                    <Select options={paytype} label={'Supplier Pay Type '}
                        placeholder={'Payment Type'} onChange={handleSelectChange}
                        name={'supplier_pay_type'}
                        rules={[
                            {
                                required: true,
                                message: 'Enter the Paytype !'
                            },
                        ]} /></Col>

                <Col span={24} md={14} >
                    {/* <CustomInputNumber label={'Mobile Number'} placeholder={'Select Number'} name={'mobile_number'}
                        rules={[
                            {
                                required: true,
                                message: 'Enter the details !'
                            },
                            { validator: phoneValidator },
                            // {
                            //     max: 10,
                            //     message: 'Only 10 Digit enter'
                            // },
                            {
                                min: 10,
                                message: 'to Short'
                            }
                        ]} /> */}
                    <Select options={SupplierMobiles} showSearch label={'Mobile Number'}
                        placeholder={'Select Number'} name={'mobile_number_id'}
                        onChange={handleSelectedSupplier}
                        rules={[
                            {
                                required: true,
                                message: 'Select Mobile Number !'
                            }
                        ]} />

                    <Input name={'supplier'} display={"none"} />
                    <CustomInputNumber name={'mobile_number'} display={"none"} />

                    <Input disabled label={'Supplier Name '} placeholder={'Supplier name'} name={'supplier_name'} />

                    <Select options={ChequesBank} label={'Supplier Pay type '} placeholder={'Select Payement Type'} onChange={handleSelectChanges}
                        name={'cashtype'}
                        rules={[
                            {
                                required: true,
                                message: 'Enter the Cheque !'
                            }
                        ]} />
                    {cashType === 'Cheque' && (
                        <div>
                            <CustomInputNumber label={'Ref No.'} name={'refno'} placeholder={'Reference No'} rules={[
                                {
                                    required: true,
                                    message: 'Enter the Ref no!'
                                }
                            ]} />
                        </div>
                    )}
                    <CustomDatePicker label={'Payment Date'} onChange={handleOnChange} name={'selected_date'} rules={[
                        {
                            required: true,
                            message: 'Enter the Payment Date !'
                        }
                    ]} />


                    {/* Supplier Advanced Payment */}
                    {payType === 'advanced_amttt' && (
                        <div>
                            <CustomInputNumber precision={2} label={'Previous Advanced Amount'} name={'advanced_amt'} disabled />
                            <CustomInputNumber precision={2} label={'Advanced Amount Payment'} name={'advanced_amount'} rules={[
                                {
                                    required: true,
                                    message: 'Enter the Advanced Amount !'
                                }
                            ]} />
                        </div>
                    )}
                    {/* Supplier Credit Payment */}
                    {payType === 'credit_amttt' && (<div>
                        <CustomInputNumber precision={2} label={'Credit Balance'} name={'credit_amt'} disabled />
                        <CustomInputNumber precision={2} label={'Credit Payment'} name={'credit_amt_pay'} placeholder={'Credit Payment'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter the Advanced Credit Amount !'
                                }
                            ]} />

                    </div>
                    )}


                    {/* Supplier Debit Payment */}
                    {payType === 'debt_amttt' && (

                        <div>
                            <CustomInputNumber label={'Previous Debit Amount'} name={'debt_amt'}
                                precision={2} disabled />
                            <CustomInputNumber label={'Debit payment'} name={'debt_amt_pay'}
                                precision={2}
                                placeholder={'Advanced Debit Amount'}
                            />
                        </div>
                    )}
                </Col>

                <Flex center gap={'20px'}>
                    <Button.Primary text={'Save'} htmlType={'submit'} />
                    <Button.Danger text={'Reset'} htmlType={'cancel'} onClick={() => onReset()} />
                </Flex>
            </Row>

        </Form>
    )
}

export default SupplierPayementDetails