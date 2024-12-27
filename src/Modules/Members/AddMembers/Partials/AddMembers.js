import { Col, Form, Input as AntdInput } from "antd";
import React from "react";
import { Row } from "../../../../Components/Row";
import Input from "../../../../Components/Form/Input";
import Flex from "../../../../Components/Flex";
import Button from "../../../../Components/Form/Button";
import { Select } from "../../../../Components/Form/Select";
import { setMembers } from "../../actions";
import { useSelector } from "react-redux";
import request from "../../../../utils/request";
import { toast } from "react-toastify";


const AddingMembers = () => {

    const [form] = Form.useForm();

    const URL = 'api/register'

    const member = useSelector(state => state);
    console.log(member)

    const onFinish = (values) => {
        // setMembers(values)
        Addmember(values)
    };

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const Addmember = (values) => {
        request.post(`${URL}`, values)
            .then(function (response) {
                setMembers(response.data)
                if(response.status === 201){
                    form.resetFields();
                    toast.success("User Details Add Successfully")
                }
                else{
                    toast.error("You are Unauthorized")
                }
                // if()
            })
            .catch(function (error) {
                // toast.error("fail")
                if (error.response && error.response.status === 400) {
                    if (error.response.data) {
                        if (error.response.data.email) {
                            toast.warn(error.response.data.email[0])
                        }
                        else {
                            toast.error("Faild")
                        }
                    }
                    else {
                        toast.error("Faild")
                    }

                }
               
            });
    }

    const onReset = () => {
        form.resetFields();
    }

    const option = [
        { label: 'Admin', value: 'Admin' },
        { label: 'GST Admin', value: 'GST-Admin' },
        { label: 'GST Biller', value: 'GST-Biller' },
        { label: 'Site', value: 'Site' },
        // { label: 'Non GST Admin', value: 'NoGST-Admin' },
        // { label: 'Non GST Biller', value: 'NoGST-Biller' },
    ]
    
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

                    <Input label={'Name'} placeholder={'Enter Your Name'} name={'name'} rules={[
                        {
                            required: true,
                            message: 'Please Enter Your Name!',
                        }
                    ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Email ID'} name={'email'} type={'email'} placeholder={"Enter Your Mail ID"}  rules={[
                        {
                            required: true,
                            message: 'Please Enter Your MailID!',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}>
                        <AntdInput.Password size='large' placeholder={'Password'} />
                    </Form.Item>
                </Col>

                <Col span={24} md={12}>
                    <Select options={option} label={'Role'} name={'user_role'} placeholder={'Select Role'} rules={[
                        {
                            required: true,
                            message: 'Please Enter Your Role!',
                        }
                    ]} />
                </Col>
            </Row>
            <Flex center gap={'20px'} style={{ margin: '20px 0px' }}>
                <Button.Primary text={'ADD'} htmlType={'submit'} />
                <Button.Danger text={'RESET'} onClick={() => onReset()} />
            </Flex>

        </Form>

    )
}

export default AddingMembers