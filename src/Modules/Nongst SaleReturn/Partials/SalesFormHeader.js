import { Col, Form } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { Row } from '../../../Components/Row';
import { CustomSelect } from '../../../Components/Form/CustomSelect';
import Input from '../../../Components/Form/Input';
import { CustomInputNumber } from '../../../Components/Form/CustomInputNumber';
import { Select } from '../../../Components/Form/Select';
import { TextAreas } from '../../../Components/Form/TextArea';
import { CustomDatePicker } from '../../../Components/Form/CustomDatePicker';
import { Modal } from '../../../Components/Modal';
import AddingCustomers from '../../Customers/AddCustomers/Partials/AddCustomers';
import request from '../../../utils/request';
import Switch from '../../../Components/Form/Switch';
import Flex from '../../../Components/Flex';


export const SalesFormHeader = ({ setSaleorder, setSelectedDate, setProductList, setReturnNumber, trigger, setSelectedSupplierDetails, setSelectedSupplierBillDetails,Setreset }) => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ======  Selected Date ========
    const [getdata, setGetdata] = useState([])
    const [customerBillsData, setCustomerBillsData] = useState([])
    const [click, setClick] = useState(true);
    const onViewRow = () => {
        setModalTitle("Add Customer");
        setModalContent(<AddingCustomers handleSalesCustomer={handleSalesCustomer} />);
        showModal();
    }

    const handleSalesCustomer = () => {
        handleCancel();
        GetReturnNo();
    }

    useEffect(() => {
        if (trigger) {
            GetReturnNo();
        }
    }, [trigger]);


    useEffect(() => {
        GetReturnNo();
    }, [])


    const GetReturnNo = () => {
        request.get('sales/get_detail_new_sale_return/')
            .then(function (response) {
                setGetdata(response.data?.customer)
                setReturnNumber(response.data?.return_no)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetCustomerBiils = (id) => {
        request.post('sales/new_sale_invoice_no/', {
            customer: id
        }
        )
            .then(function (response) {
                setCustomerBillsData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetSupplierBiilsDetails = (id) => {
        request.post('sales/new_sale_return_pro_detail/', {
            sale: id
        }
        )
            .then(function (response) {
                setProductList(response.data?.sale?.sales)
                // setSale(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    //===================================Customer name/Company name===========================================
    const CustomerMobile = getdata?.map(mob => ({ label: mob.customer_name, value: mob.id }));

    const handleSelectedCustomer = (value) => {
        const SelectedPersonDetails = getdata?.find((mem) => mem.id === value)
        setSelectedSupplierDetails(SelectedPersonDetails);
        GetCustomerBiils(SelectedPersonDetails.id);
        Setreset();
        setProductList([])
        setSelectedSupplierBillDetails({});
    }
    const CustomerCompanies = getdata?.map(com => ({ label: com.customer_company_name, value: com.id }));

    const handleSelectedCompany = (value) => {
        const SelectedPersonDetails = getdata?.find((mem) => mem.id === value)
        setSelectedSupplierDetails(SelectedPersonDetails);
        GetCustomerBiils(SelectedPersonDetails.id);
        Setreset();
        setProductList([])
        setSelectedSupplierBillDetails({});

    }
    //=====================================================Bill number=======================================================================
    const CustomerBills = customerBillsData?.map(bill => ({ label: bill.invoice_no, value: bill.invoice_no }));

    const handleSelectedBill = (value) => {
        const SelectedPersonBillDetails = customerBillsData?.find((mem) => mem.invoice_no === value)
        GetSupplierBiilsDetails(SelectedPersonBillDetails.id);
        setSelectedSupplierBillDetails(SelectedPersonBillDetails)
        Setreset();
        setProductList([])
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

    //=====================Switch-Customer Name======================//
    const handleSwitched = () => {
        setClick(!click);
    };

    return (
        <Fragment>
            <Flex centerVertically>
                <span style={{ fontWeight: 'bold' }}>Search By </span>&nbsp;&nbsp; :&nbsp;&nbsp;
                <span>Customer Name</span>&nbsp;
                <Switch onClick={handleSwitched} />
                &nbsp;<span>Company Name</span>
            </Flex><br />
            <Row gutter={[24, 24]} >
                <Col span={24} md={16}>
                    <Row gutter={[12, 12]}>
                        <Col span={24} md={12}>

                            {click ? (
                                <CustomSelect options={CustomerMobile} style={{ textTransform: 'uppercase' }} onButtonClick={onViewRow} buttonLabel="Add Customer" onChange={handleSelectedCustomer} showSearch={true} label={'Customer Name'} name={'customer_name'} placeholder={'Customer Name'}  />
                            ) : (
                                <CustomSelect options={CustomerMobile} style={{ textTransform: 'uppercase' }} onButtonClick={onViewRow} label={'Customer Name'} name={'customer_name'} placeholder={'Customer Name'} disabled />
                            )}
                        </Col>


                        <Input name={'customer_id'} display={'none'} />

                        <Col span={24} md={12}>
                            {click ? (
                                <CustomSelect options={CustomerCompanies} style={{ textTransform: 'uppercase' }} onButtonClick={onViewRow} label={'Company Name'} name={'company_name'} placeholder={'Company Name'} disabled />
                            ) : (
                                <CustomSelect options={CustomerCompanies} style={{ textTransform: 'uppercase' }} onButtonClick={onViewRow} showSearch={true} buttonLabel="Add Customer" onChange={handleSelectedCompany} label={'Company Name'} name={'company_name'} placeholder={'Company Name'} />
                            )}
                            <Input name={'sale_id'} display={'none'} />

                        </Col>
                        <Col span={24} md={12}>


                            <Select
                                options={CustomerBills}
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
                        </Col>
                        <Col span={24} md={12}>
                            <Input
                                showSearch label={'Mobile Number'}
                                placeholder={'Select Number'} name={'mobile_number'}
                                disabled
                                rules={[
                                    {
                                        required: true,
                                        message: 'Select Mobile Number !'
                                    }
                                ]} />
                        </Col>
                        <Col span={24} md={12}>
                            <Input label={'GST IN'} disabled name={'gstin'} style={{ textTransform: 'uppercase' }} placeholder={'GST IN'} />
                        </Col>

                        <Col span={24} md={12}>
                            <Input label={'Email ID'} type="email" disabled name={'email_id'} placeholder={'Email ID'}  />
                        </Col>

                        <Col span={24} md={12}>
                            <Input label={'State'} disabled name={'state'} placeholder={'State'} style={{ textTransform: 'uppercase' }} />

                        </Col>

                        <Col span={24} md={12}>
                            <TextAreas label={'Address'} disabled name={'address'} placeholder={'Address'}  />
                        </Col>
                    </Row>
                </Col>
                <Col span={24} md={8}>
                    <Row gutter={[12, 12]}>
                        <Col span={24} md={24}>
                            <CustomInputNumber label={'Return Number'} name={'return_number'} placeholder={'Return Number'} disabled />
                        </Col>
                        <Col span={24} md={24}>
                            <CustomInputNumber label={'Invoice Number'} name={'invoive_number'} placeholder={'Invoice Number'} disabled />
                        </Col>
                        <Col span={24} md={24}>
                            <Input label={'Invoice Date'} name={'invoive_date'} placeholder={'Invoice date'} disabled />
                        </Col>
                        <Col span={24} md={24}>
                            <CustomDatePicker label={'Return Date'} name={'selected_date'} onChange={handleOnChange} />
                        </Col>
                    </Row>
                </Col>

            </Row>

            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
