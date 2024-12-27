import { Col, Form } from 'antd'
import React from 'react'
import { Row } from '../../../../Components/Row'
import { InputNumber } from '../../../../Components/Form/InputNumber'
import Flex from '../../../../Components/Flex'
import Button from '../../../../Components/Form/Button'
import { toast } from 'react-toastify'


const CustomerPay = () => {
    const onFinish = (values) => {
    
    };
    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };
    return (
        <div>
            <Form
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
                        <InputNumber label={'Paid Amount'} name={'paid_amount'} placeholder={'Paid Amount'} rules={[
                            {
                                required: true,
                                message: 'Enter the Paid Amount ! '
                            }
                        ]}></InputNumber>
                    </Col>
                    <Col span={24} md={12}>
                        <InputNumber label={'Balance Amount'} name={'bal_amount'} placeholder={'Balance Amount'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter the Balance Amount ! '
                                }
                            ]}></InputNumber>
                    </Col>

                    <Flex center gap={'20px'} style={{ margin: '20px 500px' }}>
                        <Button.Primary text={'ADD'} htmlType={'submit'} />
                        <Button.Danger text={'RESET'} htmlType={'reset'} />
                    </Flex>
                </Row>
            </Form>
        </div>
    )
}

export default CustomerPay
