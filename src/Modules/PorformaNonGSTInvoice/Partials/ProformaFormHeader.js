import { Col, Input as Inputs } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { Row } from '../../../Components/Row';
import { CustomSelect } from '../../../Components/Form/CustomSelect';
import Input from '../../../Components/Form/Input';
import { CustomInputNumber } from '../../../Components/Form/CustomInputNumber';
import { TextAreas } from '../../../Components/Form/TextArea';
import { CustomDatePicker } from '../../../Components/Form/CustomDatePicker';
import { Modal } from '../../../Components/Modal';
import request from '../../../utils/request';
import Flex from '../../../Components/Flex';
import AddingCustomers from '../../Customers/AddCustomers/Partials/AddCustomers';
import Switch from '../../../Components/Form/Switch';

export const ProformaFormHeader = ({ setSelectedDate, setReload, setSelectedSale, setInvoiceNumber, trigger, selectedSale }) => {
    const [getdata, setGetdata] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [click, setClick] = useState(true);


    const { TextArea } = Inputs;

    const onViewRow = () => {
        setModalTitle("Add Customer");
        setModalContent(<AddingCustomers handleSalesCustomer={handleSalesCustomer} />);
        showModal();
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSalesCustomer = () => {
        handleCancel();
        GetSaleCustomer();
    };

    useEffect(() => {
        if (trigger) {
            GetSaleCustomer();
        }
    }, [trigger]);

    useEffect(() => {
        GetSaleCustomer();
    }, []);

    const GetSaleCustomer = () => {
        request
            .get('sales/get_detail_proforma_new/')
            .then(function (response) {
                setGetdata(response.data.customer);
                setInvoiceNumber(response.data.invoice_no);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const SaleMobiles = getdata?.map((mob) => ({ label: mob.customer_name, value: mob.id }));


    const handleSelectedSale = (value) => {
        const SelectedSaleDetails = getdata?.find((mem) => mem.id === value);
        setSelectedSale(SelectedSaleDetails);

    };


    const SaleCompanies = getdata?.map((com) => ({ label: com.customer_company_name, value: com.id }));


    const handleSelectCompany = (value) => {
        const SelectedCompanyDetails = getdata?.find((mem) => mem.id === value);
        setSelectedSale(SelectedCompanyDetails);

    };

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
                                <CustomSelect options={SaleMobiles} onButtonClick={onViewRow} style={{ textTransform: 'uppercase' }} buttonLabel="Add Customer" onChange={handleSelectedSale} showSearch={true} label={'Customer Name'} name={'customer_name'} placeholder={'Customer Name'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'This is required field!',
                                        }
                                    ]} />
                            ) : (
                                <CustomSelect options={SaleMobiles} onButtonClick={onViewRow} style={{ textTransform: 'uppercase' }} label={'Customer Name'} name={'customer_name'} placeholder={'Customer Name'} disabled />
                            )}
                        </Col>
                        <Col span={24} md={12}>
                            {click ? (
                                <CustomSelect options={SaleCompanies} onButtonClick={onViewRow} style={{ textTransform: 'uppercase' }} label={'Company Name'} name={'company_name'} placeholder={'Company Name'} disabled />
                            ) : (
                                <CustomSelect options={SaleCompanies} onButtonClick={onViewRow} style={{ textTransform: 'uppercase' }} showSearch={true} buttonLabel="Add Customer" onChange={handleSelectCompany} label={'Company Name'} name={'company_name'} placeholder={'Company Name'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'This is required field!',
                                        }
                                    ]} />
                            )}
                        </Col>
                        <Col span={24} md={12}>
                            <Input showSearch label={'Mobile Number'} placeholder={'Select Number'} name={'mobile_number'}  />
                        </Col>

                        <Col span={24} md={12}>
                            <Input label={'Email ID'} type="email" name={'email'} placeholder={'Email ID'} />
                        </Col>
                        <Col span={24} md={12}>
                            <TextAreas
                                label="Address"
                                name="address"
                                placeholder="Address"
                            />
                        </Col>
                        <Col span={24} md={12}>
                            <TextAreas
                                label="Delivery Location"
                                name="delivery_location"
                                placeholder="Delivery Location"

                            />
                        </Col>


                        <Input name={'customer'} display={'none'} />
                    </Row>
                </Col>
                <Col span={24} md={8}>
                    <Row>
                        <Col span={24} md={24}>
                            <CustomInputNumber label={'Proforma Invoice Number'} precision={0} name={'invoice_no'} disabled placeholder={'Invoice Number'} />
                        </Col>
                        <Col span={24} md={24}>
                            <CustomDatePicker label={'Select Date'} onChange={handleOnChange} name={'invoice_date'} />
                        </Col>
                        <Col span={24} md={24}>
                            <Input label={'State'} style={{ textTransform: 'uppercase' }} name={'state_of_supply'} placeholder={'State'} />
                        </Col>
                        {/* <Col span={24} md={24}>
                            <Input label={'GST IN'} name={'GSTIN'} placeholder={'GST IN'} style={{ textTransform: 'uppercase' }} rules={[
                                {
                                    required: true, 
                                    message: 'Enter the GST IN!'
                                }
                            ]} />
                        </Col> */}
                    </Row>
                </Col>
            </Row>
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    );
};
