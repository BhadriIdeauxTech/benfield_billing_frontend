import { Col, Form } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Row } from '../../../../Components/Row';
import Input from '../../../../Components/Form/Input';
import { CustomInputNumber } from '../../../../Components/Form/CustomInputNumber';
import { CustomDatePicker } from '../../../../Components/Form/CustomDatePicker';
import { TextAreas } from '../../../../Components/Form/TextArea';
import { Select } from '../../../../Components/Form/Select';
import { Modal } from '../../../../Components/Modal';
import AddSpplier from '../../../Suppliers/AddSupplier';
import request from '../../../../utils/request';



export const PurchaseFormHeader = ({ setSaleorder,Setreset, setProductList, setSelectedSupplierDetails, setSelectedSupplierBillDetails, trigger }) => {
    const [form] = Form.useForm();
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ======  Selected Date ========
    const [selectedDate, setSelectedDate] = useState(dayjs());
    // const [selectedDate, setSelectedDate] = useState(dayjs().format('MMMM DD, YYYY'));
    const [getdata, setGetdata] = useState([])
    const [SupplierBillsData, setSupplierBillsData] = useState([])


    const onViewRow = () => {
        // setModalTitle("Add Details");
        setModalContent(<AddSpplier handleOk={handleOk} />);
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
        request.get('purchase/supplier_return_list_item_detail/')
            .then(function (response) {
                setGetdata(response.data?.supplier)

                // setSale(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetSupplierBiils = (id) => {

        request.post('purchase/purchase_return_invoice_no_nongst/', {
            supplier: id
        }
        )
            .then(function (response) {
                setSupplierBillsData(response.data)
                // setSale(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetSupplierBiilsDetails = (id) => {

        request.post('purchase/purchase_return_details_nongst/', {
            purchase: id
        }
        )
            .then(function (response) {
                setSelectedSupplierBillDetails(response.data)
                setProductList(response.data.product)
                // setSale(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const SupplierMobile = getdata?.map(mob => ({ label: mob.supplier_name, value: mob.supplier_name }));
    // 
    const handleSelectedSale = (value) => {
        const SelectedPersonDetails = getdata?.find((mem) => mem.supplier_name === value)
        setSelectedSupplierDetails(SelectedPersonDetails);
        GetSupplierBiils(SelectedPersonDetails.id);
        Setreset();
        setProductList([])
        // GetSupplierBiilsDetails({})
    }

    const SupplierBills = SupplierBillsData?.map(bill => ({ label: bill.purchase_invoice_no, value: bill.purchase_invoice_no }));

    const handleSelectedBill = (value) => {
        const SelectedPersonBillDetails = SupplierBillsData?.find((mem) => mem.purchase_invoice_no === value)
        GetSupplierBiilsDetails(SelectedPersonBillDetails.purchase_id);
        Setreset();
        setProductList([])

    }


    return (
        <Fragment>

            <Row>
                <Col span={24} md={16}>
                    <Row gutter={[12, 12]}>
                        <Col span={24} md={12}>
                            <Select
                                options={SupplierMobile}
                                style={{ textTransform: 'uppercase' }}
                                showSearch label={'Supplier Name'}
                                placeholder={'Select Supplier Name'} name={'supplier_name'}
                                // onChange={handleMobileShow} 
                                onChange={handleSelectedSale}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Select Supplier Name !'
                                    }
                                ]} />
                            <Input name={'supplier_id'} display={'none'} />

                        </Col>

                        <Col span={24} md={12}>
                            <Select
                                options={SupplierBills}
                                style={{ textTransform: 'uppercase' }}
                                showSearch label={'Bill Number'}
                                placeholder={'Select Number'} name={'bill_no'}
                                // onChange={handleBillShow} 
                                onChange={handleSelectedBill}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Select Bill Number !'
                                    }
                                ]} />
                            <Input name={'purchase_id'} display={'none'} />
                        </Col>

                        <Col span={24} md={12}>
                            <Input label={'Mobile Number'} name={'mobile_number'} placeholder={'Mobile Number'} />
                        </Col>

                        {/* <Col span={24} md={12}>
                            <Input label={'GST IN'} name={'GSTIN'} placeholder={'GST IN'}/>
                        </Col> */}
                        <Col span={24} md={12}>
                            <Input label={'Email ID'} type='email' name={'email'} placeholder={'Email ID'}  />
                        </Col>
                        <Col span={24} md={12}>
                            <Input label={'Company Name'} name={'company_name'} placeholder={'Company Name'} 
                            style={{ textTransform: 'uppercase' }} />
                        </Col>
                        <Col span={24} md={12}>
                            <Input label={'State'} name={'state_of_supply'} placeholder={'State'} 
                            style={{ textTransform: 'uppercase' }} />
                        </Col>
                        <Col span={24} md={12}>
                            <TextAreas label={'Address'} name={'address'} placeholder={'Address'} />
                        </Col>
                    </Row>
                </Col>
                <Col span={24} md={8}>
                    <Row gutter={[12, 12]}>
                        <Col span={24} md={24}>
                            <CustomInputNumber label={'Bill No'} name={'bill_no'} placeholder={'Bill Number'} disabled
                            />
                        </Col>
                        <Col span={24} md={24}>
                            <CustomInputNumber label={'Return No'} name={'return_no'} disabled
                            />
                        </Col>
                        <Col span={24} md={24}>
                            <Input label={'Bill Date'} name={'bill_date'} disabled />
                        </Col>
                        <Col span={24} md={24}>
                            <CustomDatePicker label={'Return Date'} name={'return_date'} onChange={handleOnChange} rules={[{
                                required: 'true',
                                message: 'Enter the details !'
                            },]} />
                        </Col>
                        <Col span={24} md={24}>
                        </Col>
                    </Row>
                </Col>

            </Row>

            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
