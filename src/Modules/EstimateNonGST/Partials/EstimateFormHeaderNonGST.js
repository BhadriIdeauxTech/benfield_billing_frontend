
import { Col } from 'antd'
import React, { Fragment, useState } from 'react'
import { Row } from '../../../Components/Row';
import { CustomSelect } from '../../../Components/Form/CustomSelect';
import Input from '../../../Components/Form/Input';
import { CustomInputNumber } from '../../../Components/Form/CustomInputNumber';
import { TextAreas } from '../../../Components/Form/TextArea';
import { CustomDatePicker } from '../../../Components/Form/CustomDatePicker';
import { Modal } from '../../../Components/Modal';
import AddingCustomers from '../../Customers/AddCustomers/Partials/AddCustomers';
import { InputNumber } from '../../../Components/Form/InputNumber';
import Switch from '../../../Components/Form/Switch';
import Flex from '../../../Components/Flex';


export const EstimateFormHeadernongst = ({ setSelectedDate, setSelectedSale,
    getdataCustomr, setSwitchJd, switchJd, }) => {


    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ======  Selected Date ========

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
    }

    const onViewRow = () => {
        setModalTitle("Add Customer");
        setModalContent(<AddingCustomers handleSalesCustomer={handleSalesCustomer} />);
        showModal();
    }


    const handleSelectedSale = (value) => {
        const SelectedPersonDetails = getdataCustomr?.find((mem) => mem.id === value)
        setSelectedSale(SelectedPersonDetails);
    }
    const handleSelectedSalessss = (value) => {
        const SelectedPersonDetailsss = getdataCustomr?.find((mem) => mem.id === value)
        setSelectedSale(SelectedPersonDetailsss);
    }

    const SaleMobiles = getdataCustomr?.map(mem => ({ label: mem.customer_name, value: mem.id }));
    const SaleCompanies = getdataCustomr?.map((com) => ({ label: com.customer_company_name, value: com.id }));


    const handleChangeSwitch = () => {
        setSwitchJd(!switchJd)
    }

    // ==========  Date Change =======
    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Fragment>
            <Flex centerVertically>
                <span style={{ fontWeight: 'bold' }}>Search By </span>&nbsp;&nbsp; :&nbsp;&nbsp;
                <span>Customer Name</span>&nbsp;
                <Switch onClick={handleChangeSwitch} />
                &nbsp;<span>Company Name</span>
            </Flex><br />
            <Row gutter={[24, 24]} >
                <Col span={24} md={16}>
                    <Row gutter={[12, 12]}>
                        <Col span={24} md={12}>
                            {
                                switchJd ?
                                    <CustomSelect
                                        options={SaleMobiles}
                                        showSearch label={'Customer Name'}
                                        placeholder={'Customer Name'} name={'customer_name'}
                                        onChange={handleSelectedSale}
                                        onButtonClick={onViewRow}
                                        buttonLabel={'Add Customer'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Select Customer Name !'
                                            }
                                        ]} />

                                    :
                                    <CustomSelect
                                        options={SaleMobiles} label={'Customer Name'}
                                        placeholder={'Customer Name'} name={'customer_name'} disabled
                                        onChange={handleSelectedSale} />
                            }

                            <Input name={'supplier_id'} display={"none"} />



                        </Col>

                        <Col span={24} md={12}>
                            {
                                switchJd ?
                                    <CustomSelect
                                        options={SaleCompanies}
                                        label={'Company Name'}
                                        placeholder={'Company Name'} name={'company_name'}
                                        onChange={handleSelectedSalessss} disabled />
                                    : <CustomSelect
                                        options={SaleCompanies}
                                        showSearch label={'Company Name'}
                                        placeholder={'Company Name'} name={'company_name'}
                                        onChange={handleSelectedSalessss}
                                        onButtonClick={onViewRow}
                                        buttonLabel={'Add Company'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Select Company Name !'
                                            }
                                        ]}
                                    />
                            }
                        </Col>
                        <Col span={24} md={12}>
                            <InputNumber label={'Mobile Number'} name={'mobile_number'} placeholder={'Mobile Number'} readOnly />
                        </Col>


                        <Col span={24} md={12}>
                            <Input label={'Email ID'} type="email" name={'email'} 
                            placeholder={'Email ID'} />
                        </Col>


                        <Col span={24} md={12}>
                            <TextAreas label={'Address'} name={'address'} placeholder={'Address'} />
                        </Col>
                        <Input name={'customer'} display={"none"} />
                    </Row>
                </Col>
                <Col span={24} md={8}>
                    <Row>
                        <Col span={24}>

                            <CustomInputNumber label={'Ref No'} name={'ref_no'} precision={0} value={1} placeholder={'Reference No'} disabled />
                        </Col>

                        <Col span={24}>
                            <CustomDatePicker label={'Invoice date'} name={'invoice_date'} placeholder={'Invoice Date'} onChange={handleOnChange} />
                        </Col>
                        <br />

                        <Col span={24} md={24} >
                            <Input label={'State'} name={'state_of_supply'} placeholder={'State'} />
                        </Col>
                    </Row>
                </Col>

            </Row>


            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
