import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { Row } from "../../../Components/Row";
import Flex from "../../../Components/Flex";
import Button from "../../../Components/Form/Button";
import { Select } from "../../../Components/Form/Select";
import { TextAreas } from "../../../Components/Form/TextArea";
import { useSelector } from "react-redux";
import Input from "../../../Components/Form/Input";
import { InputNumber } from "../../../Components/Form/InputNumber";
import { Date } from "../../../Components/Form/Date";
import { CustomDatePicker } from "../../../Components/Form/CustomDatePicker";
import { TopTitle } from "../../../Components/Form/TopTitle";
import { CustomInputNumber } from "../../../Components/Form/CustomInputNumber";
import dayjs from 'dayjs'
import request from "../../../utils/request";
import { toast } from "react-toastify";


const ExpenseForm = ({ handleSalesCustomer }) => {
    
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    
    const URL = 'expense/add_expense/'
    // const URL = 'expense/edit_expense/5'

    const [form] = Form.useForm();

    const onFinish = (values) => {
        const NewValue = {...values,date:selectedDate}
        ExpenseAxis(NewValue)
    };

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const onReset = () => {
        if (handleSalesCustomer) {
            form.resetFields();
            handleSalesCustomer();
        }
    }

    // useEffect(() => {
    //     ExpenseAxis();
    // }, [])
    
//============expense-post==================//
    const ExpenseAxis = (values) =>{
        request.post(`${URL}`, values)
        .then(function (response) {
            console.log(response);
            // setSelectedDate(values)
           
            if (response.status == 200) {
                form.resetFields();
                toast.success('Expense Details Add Successfully')
            }
            else{
                form.resetFields();
                toast.success('Expense Details Add Successfully')
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.response.status == 400) {
                toast.error('Please enter valid  name');
            }
            else {
                toast.error('add faild');
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
            initialValues={
                {
                    date: dayjs(selectedDate)
                }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <Row gutter={[24, 24]}>

                <Col span={24} md={12}>
                    <Input label={'Expense Name'} placeholder={'Expense Name'} name={'expense_name'} rules={[
                        {
                            required: true,
                            message: 'Please Enter Your Expence Name!',
                        }
                    ]} /> 
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker label={'Date'} name={'date'} onChange={handleOnChange}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Date!',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Expense Amount'} precision={2} name={'expense_amount'} placeholder={"Enter the Expense Amount"}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Your Expense Amount!',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <TextAreas label={'Description'} name={'description'} placeholder={"Enter the description"} />
                </Col>

                <Flex center gap={'20px'} centerVertically>
                    <Button.Primary text={'SAVE'} htmlType={'submit'} />
                    <Button.Danger text={'RESET'} htmlType={'cancel'} onClick={() => onReset()} />
                </Flex>
            </Row>
        </Form>

    )
}

export default ExpenseForm