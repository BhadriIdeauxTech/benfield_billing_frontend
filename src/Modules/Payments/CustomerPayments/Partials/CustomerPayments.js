import { Col, Form } from "antd";
import React from "react";
import { Row } from "../../../../Components/Row";
import Flex from "../../../../Components/Flex";
import Button from "../../../../Components/Form/Button";
import { Select } from "../../../../Components/Form/Select";
import { TopTitle } from "../../../../Components/Form/TopTitle";
import { useState } from "react";
import { CustomDatePicker } from "../../../../Components/Form/CustomDatePicker";
import { InputNumber } from "../../../../Components/Form/InputNumber";
import { toast } from "react-toastify";


const CustomerPayments = () => {
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
    }

    const customers = [
        { label: 'Customer 1', value: 'customer_one' },
        { label: 'Customer 2', value: 'customer_two' },
        { label: 'Customer 3', value: 'customer_three' },
    ]
    const customersnum = [
        { label: 'Customernum 1', value: 'customer_num_one' },
        { label: 'Customernum 2', value: 'customer_num_two' },
        { label: 'Customernum 3', value: 'customer_num_three' },
    ]
    const paytype = [
        { label: 'Advanced Payment', value: 'customer_advanced_payment' },
        { label: 'Credit Payment', value: 'customer_credit_payment' },
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
                <TopTitle Heading={'CUSTOMER PAYMENTS :'} />
                <Row gutter={[24, 24]} style={{ rowGap: '10px' }} >

                    <Col span={24} md={6} ><Select options={paytype} label={'Customer Pay type '} name={'customer_pay_type'} onChange={handleSelectChange} rules={[
                        {
                            required: true,
                            message: 'Enter the Paytype !'
                        }
                    ]} /></Col>
                    <Col span={24} md={10} >
                        <Select options={customersnum} label={'Mobile Number'} name={'mobile_number'} />
                        <Select options={customers} label={'Customer Name '} name={'customer_name'} rules={[
                            {
                                required: true,
                                message: 'Enter the Customer Name !'
                            }
                        ]} />
                        <CustomDatePicker label={'Payment Date'} onChange={handleOnChange} name={'customer_payment_date'} rules={[
                            {
                                required: true,
                                message: 'Enter the Payment Date !'
                            }
                        ]} />

                        {/* <CustomSearchSelect label={'Mobile Number'} placeholder={'Mobile Number'} name={'mobile_number'} options={customersnum}/> */}

                        {/* Customer Advanced Payment */}
                        {payType === 'customer_advanced_payment' && (
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
                        {/* Customer Credit Payment */}

                        {payType === 'customer_credit_payment' && (
                            <div>
                                <InputNumber label={'Previous Credit Amount'} name={'previous_credit_amount'} disabled />
                                <InputNumber label={'Advanced Credit Amount'} name={'advanced_credit_amount'} rules={[
                                    {
                                        required: true,
                                        message: 'Enter the Advanced Credit Amount !'
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

export default CustomerPayments