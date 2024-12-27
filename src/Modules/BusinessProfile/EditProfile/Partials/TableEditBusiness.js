import React from 'react'
import { Modal } from '../../../../Components/Modal'
import Button from '../../../../Components/Form/Button'
import Flex from '../../../../Components/Flex'
import { useState } from 'react'
import { Col, Form, Modal as Modals } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Row } from '../../../../Components/Row'
import Input from '../../../../Components/Form/Input'
import { TextAreas } from '../../../../Components/Form/TextArea'
import { InputNumber } from '../../../../Components/Form/InputNumber'
import { useEffect } from 'react'
import request from '../../../../utils/request'
import BusinessProfile from '../../AddBusiness/Partials/BusinessProfile'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setCompanyProfile } from '../../actions'
import { toast } from 'react-toastify'

const TableEditBusiness = (props) => {

    const URL = 'profile/business_view'

    //   ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();

    const [selectedSupplier, setSelectedSupplier] = useState({})

    const onFinish = (values) => {
        EditProfile(values);
    };

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };

    useEffect(() => {
        GetBusines();
    }, [])

    useEffect(() => {
        form.setFieldsValue({ business_name: selectedSupplier.business_name })
        form.setFieldsValue({ email: selectedSupplier.email })
        form.setFieldsValue({ phone_no: selectedSupplier.phone_no })
        form.setFieldsValue({ phone_no2: selectedSupplier.phone_no2 })
        form.setFieldsValue({ gstin: selectedSupplier.gstin })
        form.setFieldsValue({ address: selectedSupplier.address })
        form.setFieldsValue({ bank_account_name: selectedSupplier.bank_account_name })
        form.setFieldsValue({ id: selectedSupplier.id })
        form.setFieldsValue({ bank_account_number: selectedSupplier.bank_account_number })
        form.setFieldsValue({ ifsc_code: selectedSupplier.ifsc_code })
        form.setFieldsValue({ bank_name: selectedSupplier.bank_name })
        form.setFieldsValue({ bank_branch: selectedSupplier.bank_branch })
        form.setFieldsValue({ landline: selectedSupplier.landline })

    }, [selectedSupplier])

    const GetBusines = (values) => {
        request.get(`${URL}`, values)
            .then(function (response) {
                setSelectedSupplier(response.data)
                
                dispatch(setCompanyProfile(response.data))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const EditProfile = (values) => {
        setModalTitle("Edit Profile");
        setModalContent(<BusinessProfile handlerecords={values} handleprofile={handleprofile} />);
        showModal();

    }

    const { record } = props;

    const handleprofile = () => {
        GetBusines();
        handleOk();
    }
    return (
        <div >
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
                        <Input label={'Business Name'} placeholder={'Enter Your Business'} style={{ textTransform: 'uppercase' }} disabled
                            name={'business_name'}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'EmailID'} name={'email'}  disabled placeholder={"Enter Your Mail ID"}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'Phone No 1'} name={'phone_no'} disabled placeholder={"Enter Your Phonenum 1"}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'Phone No 2'} name={'phone_no2'} disabled placeholder={"Enter Your Phonenum 2"} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'Land Line'} name={'landline'} disabled placeholder={"Enter landline"} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'GSTIN'} placeholder={'Enter Your GSTIN'} style={{ textTransform: 'uppercase' }} disabled name={'gstin'}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <TextAreas label={'Address'} name={'address'} disabled placeholder={"Enter Your Address"} 
                        />
                        <Input name={'id'} display={'none'} />
                    </Col>
                    <Col span={24} md={24}><h1>Bank Details</h1></Col>

                    <Col span={24} md={12}>
                        <Input label={'Account Name'} disabled placeholder={'Enter Account Name'} style={{ textTransform: 'uppercase' }}
                            name={'bank_account_name'} />
                    </Col>

                    <Col span={24} md={12}>
                        <Input label={'Account Number'} disabled placeholder={'Enter Account Number'} style={{ textTransform: 'uppercase' }}
                            name={'bank_account_number'} />
                    </Col>

                    <Col span={24} md={12}>
                        <Input label={'IFSC Code'} disabled placeholder={'Enter IFSC code'}
                            name={'ifsc_code'} />
                    </Col>

                    <Col span={24} md={12}>
                        <Input label={'Bank Name'} disabled placeholder={'Enter Bank Name'} style={{ textTransform: 'uppercase' }}
                            name={'bank_name'} />
                    </Col>

                    <Col span={24} md={12}>
                        <Input label={'Branch Name'} disabled placeholder={'Enter Branch Name'} style={{ textTransform: 'uppercase' }}
                            name={'bank_branch'} />
                    </Col>
                </Row><br />
                <Flex center >
                    <Button.Success text={'Update Profile'} htmlType={'submit'} />
                </Flex>
            </Form>
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </div>


    )
}

export default TableEditBusiness