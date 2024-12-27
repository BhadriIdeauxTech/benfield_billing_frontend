import { Col, Form } from "antd";
import React, { useState } from "react";
import { Row } from "../../../../Components/Row";
import Flex from "../../../../Components/Flex";
import Button from "../../../../Components/Form/Button";
import { Select } from "../../../../Components/Form/Select";
import { TopTitle } from "../../../../Components/Form/TopTitle";
import { InputNumber } from "../../../../Components/Form/InputNumber";
import { CustomDatePicker } from "../../../../Components/Form/CustomDatePicker";
import { toast } from "react-toastify";


const SupplierPayments = () => {
    const [form] = Form.useForm();

    const [selectedDate, setSelectedDate] = useState('null')
    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const [payType, setPayType] = useState('');

    const handleSelectChange = (values) => {
        setPayType(values);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
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
        { label: 'Advanced Payment', value: 'suplier_advance_payment' },
        { label: 'Credit Payment', value: 'suplier_credit_payment' },
        { label: 'Debit Amount', value: 'suplier_debit_amount' },
    ]

    return (
        <div style={{ backgroundColor: 'white', padding: '20px 20px' }}>
            <Form style={{ marginLeft: '230px' }}
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
                <TopTitle Heading={'SUPPLIER PAYMENTS :'} />

                <Row gutter={[24, 24]} >

                    <Col span={24} md={6} >
                        <Select options={paytype} label={'Supplier Pay type '} onChange={handleSelectChange} name={'supplier_pay_type'} rules={[
                            {
                                required: true,
                                message: 'Enter the Paytype !'
                            }
                        ]} /></Col>
                    <Col span={24} md={10} >
                        <Select options={suppliersnum} label={'Mobile Number'} name={'mobile_number'} />

                        <Select options={suppliers} label={'Supplier Name '} name={'supplier_name'} rules={[
                            {
                                required: true,
                                message: 'Enter the Supplier Name !'
                            }
                        ]} />
                        <CustomDatePicker label={'Payment Date'} onChange={handleOnChange} name={'supplier_payment_date'} rules={[
                            {
                                required: true,
                                message: 'Enter the Payment Date !'
                            }
                        ]} />

                        {/* Supplier Advanced Payment */}
                        {payType === 'suplier_advance_payment' && (
                            <div>
                                <InputNumber label={'Previous Advanced Amount'} name={'previous_advanced_amount'} disabled />
                                <InputNumber label={'Advanced Amount (paid)'} name={'advanced_amount'} rules={[
                                    {
                                        required: true,
                                        message: 'Enter the Advanced Amount !'
                                    }
                                ]} />
                            </div>
                        )}
                        {/* Supplier Credit Payment */}
                        {payType === 'suplier_credit_payment' && (<div>
                            <InputNumber label={'Previous Credit Amount'} name={'previous_credit_amount'} disabled />
                            <InputNumber label={'Advanced Credit Amount'} name={'advanced_credit_amount'} rules={[
                                {
                                    required: true,
                                    message: 'Enter the Advanced Credit Amount !'
                                }
                            ]} />

                        </div>
                        )}


                        {/* Supplier Debit Payment */}
                        {payType === 'suplier_debit_amount' && (

                            <div>
                                <InputNumber label={'Previous Debit Amount'} name={'previous_debit_amount'} disabled />
                                <InputNumber label={'Advanced Debit Amount'} name={'advanced_debit_amount'} rules={[
                                    {
                                        required: true,
                                        message: 'Enter the Advanced Amount !'
                                    }
                                ]} />
                            </div>
                        )}
                    </Col>


                </Row>
                <Flex center gap={'20px'} style={{ margin: '25px 500px 0px 0px' }}>
                    <Button.Primary text={'SAVE'} htmlType={'submit'} />
                    <Button.Danger text={'RESET'} htmlType={'cancel'} onClick={() => onReset()} />
                </Flex>
            </Form>

        </div>
    )
}

export default SupplierPayments