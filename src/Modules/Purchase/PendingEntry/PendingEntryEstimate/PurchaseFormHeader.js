import { Col, Form } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { AiOutlinePlus } from 'react-icons/ai';
import { TopTitle } from '../../../../Components/Form/TopTitle';
import { Row } from '../../../../Components/Row';
import Input from '../../../../Components/Form/Input';
import { CustomInputNumber } from '../../../../Components/Form/CustomInputNumber';
import { CustomDatePicker } from '../../../../Components/Form/CustomDatePicker';
import { TextAreas } from '../../../../Components/Form/TextArea';
import { Select } from '../../../../Components/Form/Select';
import Button from '../../../../Components/Form/Button';
import { Modal } from '../../../../Components/Modal';
import Addsppliers from '../../../Suppliers/AddSupplier/Partials/Addsppliers';
import request from '../../../../utils/request';
import Flex from '../../../../Components/Flex';
import { useForm } from 'antd/es/form/Form';
import { CustomSelect } from '../../../../Components/Form/CustomSelect';


export const PurchaseFormHeader = ({ setSaleorder, GetSaleCustomer, setSelectedSupplierDetails, trigger, setInvoiceNumber, setProductList }) => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ======  Selected Date ========
    const [selectedDate, setSelectedDate] = useState(dayjs().format('MMMM DD, YYYY'));

    const [getdata, setGetdata] = useState([])

    const onViewRow = () => {
        setModalTitle("Add Supplier");
        setModalContent(<Addsppliers handleSupplier={handleSupplier} />);
        showModal();
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // ==========  Date Change =======
    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        if (trigger) {
            GetSupplier();
        }
    }, [trigger]);

    const handleSupplier = () => {
        handleCancel();
        GetSupplier();
    }

    useEffect(() => {
        GetSupplier();
    }, [])

    const GetSupplier = () => {
        request.get('supplier/add_supplier/')
            .then(function (response) {
                setGetdata(response.data)
                GetSaleCustomer()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const SupplierMobile = getdata?.map(mob => ({ label: mob.supplier_name, value: mob.supplier_name }));

    const handleSelectedSale = (value) => {
        const SelectedPersonDetails = getdata?.find((mem) => mem.supplier_name === value)
        setSelectedSupplierDetails(SelectedPersonDetails);
    }


    return (
        <Fragment >          
            <Row gutter={[24, 24]} >
                <Col span={24} md={16}>
                    <Row gutter={[12, 12]}>
                        <Col span={24} md={12}>
                            <CustomSelect
                                options={SupplierMobile}
                                style={{ textTransform: 'uppercase' }}
                                showSearch label={'Supplier Name'}
                                placeholder={'Supplier Name'} name={'supplier_name'}
                                onButtonClick={onViewRow}
                                buttonLabel={'Add Supplier'}
                                onChange={handleSelectedSale}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Select Supplier Name !'
                                    }
                                ]} />

                            <Input name={'supplier_id'} display={"none"} />

                        </Col>



                        {/* <Col span={24} md={12}>
                            <Flex center alignEnd H_100>
                                <Button.Primary shape='round' onClick={() => onViewRow()} size='large' icon={<AiOutlinePlus style={{ fontSize: '1rem', fontWeight: 1000 }} />} text={'Add Supplier'} />
                            </Flex>
                        </Col> */}

                        <Col span={24} md={12}>
                            <Input name={'mobile_number'} label={'Mobile Number'} disabled placeholder={'Mobile Number'} />
                        </Col>

                        {/* <Col span={24} md={12}>
                            <Input label={'GST IN'} name={'GSTIN'} placeholder={'GST IN'} />
                        </Col> */}

                        <Col span={24} md={12}>
                            <Input label={'Email ID'} name={'email'} placeholder={'Email ID'}/>
                        </Col>

                        <Col span={24} md={12}>
                            <Input label={'Company Name'} name={'company_name'} placeholder={'Company Name'} style={{ textTransform: 'uppercase' }}/>
                        </Col>

                        <Col span={24} md={12}>
                            <TextAreas label={'Address'} name={'address'} placeholder={'Address'} />
                        </Col><Col span={24} md={24}>
                        </Col>
                    </Row>
                </Col>

                <Col span={24} md={8}>
                    <Row gutter={[12, 12]}>
                        <Col span={24} md={24}>
                            <Input label={'Purchase Number'} precision={0}
                                name={'invoice_no'} placeholder={'Purchase Number'} disabled />
                        </Col>
                        <Col span={24} md={24}>
                            <Input label={'Purchase Invoice Number'} name={'purchase_invoice_no'} placeholder={'Invoice Number'}
                                rules={[{
                                    required: 'true',
                                    message: 'Enter the details !'
                                },]} />
                        </Col>
                        <Col span={24} md={24}>
                            <CustomDatePicker label={'Purchase Date'} onChange={handleOnChange} name={'purchase_date'}
                                rules={[{
                                    required: 'true',
                                    message: 'Enter the details !'
                                },]} />
                        </Col>
                        <Col span={24} md={24}>
                            <Input label={'State'} name={'state_of_supply'} placeholder={'State'} style={{ textTransform: 'uppercase' }} />
                        </Col>
                    </Row>
                </Col>


            </Row>

            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
