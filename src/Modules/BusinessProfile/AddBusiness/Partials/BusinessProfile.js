import { Col, Form } from "antd";
import { Row } from "../../../../Components/Row";
import Input from "../../../../Components/Form/Input";
import Flex from "../../../../Components/Flex";
import Button from "../../../../Components/Form/Button";
import { TextAreas } from "../../../../Components/Form/TextArea";
import { CustomInputNumber } from "../../../../Components/Form/CustomInputNumber";
import request from "../../../../utils/request";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

const BusinessProfile = ({ setCompanyProfile,setMembers, handleprofile, handlerecords, id, }) => {

    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const URL = 'profile/business_view'

    const onFinish = (values) => {
        if (handlerecords) {
            EditProfileGet(handlerecords.id, values);
        } else {
            Addbusiness(values);

        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    const Addbusiness = (values) => {
        request.post(`${URL}`, values)
            .then(function (response) {
                if (response.status == 201) {
                    form.resetFields();
                    toast.success('Profile Details Add Successfully')
                    dispatch(setCompanyProfile(response.data))
                }
                else {
                    toast.success('Profile Details Add Successfully')
                    form.resetFields();
                    toast.error('Something Went Wrong')
                }
            })
            .catch(function (error) {
                console.log(error);
        
                 if (error.response.status == 403) {
                        toast.error('Business details already Created');
                    }
                    else if (error.response.status == 401) {
                        toast.error('You are not authorized');
                    }
                if (error.response && error.response.status === 400) {
                    if (error.response.data) {
                        if (error.response.data.gstin ) {
                            toast.warn(error.response.data.gstin[0]);
                        } else if (error.response.data.phone_no ) {
                            toast.warn(error.response.data.phone_no[0]);
                        }
                        else if (error.response.data.phone_no2 ) {
                            toast.warn(error.response.data.phone_no2[0]);
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
    const onReset = () => {
        form.resetFields();
        if (handleprofile) {
            handleprofile();

        }
    }

    useEffect(() => {
        form.setFieldsValue(handlerecords)
    }, [handlerecords])

    //=================edit===================================//

    const EditProfileGet = (id, handlerecords) => {
        request.patch(`profile/business_edit_view/${id}`, handlerecords)
            .then(function (response) {
                console.log(response);
                handleprofile();
                toast.success('Profile Details Updated Successfully')
            })
            .catch(function (error) {
        
            if (error.response && error.response.status === 400) {
                if (error.response.data) {
                    if (error.response.data.gstin ) {
                        toast.warn(error.response.data.gstin[0]);
                    } else if (error.response.data.phone_no ) {
                        toast.warn(error.response.data.phone_no[0]);
                    }
                    else if (error.response.data.phone_no2 ) {
                        toast.warn(error.response.data.phone_no2[0]);
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
    const [formattedLandline, setFormattedLandline] = useState('');

    const formatLandline = (event) => {
        const { value } = event.target;
        const landlineNumber = value.replace(/-/g, ''); // Remove existing hyphens, if any

        let formattedNumber = '';
        for (let i = 0; i < landlineNumber.length; i++) {
            if (i === 3 || i === 7) {
                formattedNumber += '-';
            }
            formattedNumber += landlineNumber[i];
        }

        setFormattedLandline(formattedNumber);
    };

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
                    <Input label={'Business Name'} placeholder={'Enter Your Business'} name={'business_name'} rules={[
                        {
                            required: true,
                            message: 'Please Enter Your Business!',
                        }
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'Email ID'} name={'email'} type={'email'}  placeholder={"Enter Your Mail ID"}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Your Mail id!',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Phone No 1'} name={'phone_no'}
                        placeholder={"Enter Your Phone no 1"}
                        maxLength={10}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Phone Number!',
                            },
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Phone No 2'} name={'phone_no2'}
                        placeholder={"Enter Your Phone no 2"}
                        maxLength={10}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                </Col>
                <Col span={24} md={12}>
                    <Input
                        label="Land Line"
                        name="landline"
                        placeholder="Enter your landline number"
                        onChange={formatLandline}
                    />
                    {/* <p>Formatted Landline Number: {formattedLandline}</p> */}
                </Col>

                <Col span={24} md={12}>
                    <Input label={'GSTIN'} placeholder={'Enter Your GSTIN'}
                        name={'gstin'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter GSTIN !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <TextAreas label={'Address'} name={'address'} placeholder={"Enter Your Address"} rules={[
                        {
                            required: true,
                            message: 'Please Enter Your Address!',
                        }
                    ]} />

                    <Input name={'id'} display={'none'} />
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
            <Flex center gap={'20px'} >
                <Button.Primary text={'SAVE'} htmlType={'submit'} />
                <Button.Danger text={'RESET'} htmlType={'cancel'} onClick={() => onReset()} />
            </Flex>

        </Form>
    )
}

export default BusinessProfile