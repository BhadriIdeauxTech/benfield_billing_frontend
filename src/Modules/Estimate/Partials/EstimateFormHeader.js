
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
import Switch from '../../../Components/Form/Switch';
import Flex from '../../../Components/Flex';


export const EstimateFormHeader = ({ setSelectedDate, setSelectedSale, setInvoiceNumber,
    trigger, setSwitchJd, switchJd, getdataCustomr }) => {


    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ======  Selected Date ========

    const onViewRow = () => {
        setModalTitle("Add Customer");
        setModalContent(<AddingCustomers handleSalesCustomer={handleSalesCustomer} />);
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

    const handleSalesCustomer = () => {
        handleCancel();
        // GetSaleCustomer();
    }



    // useEffect(() => {
    //     if (trigger) {
    //         GetSaleCustomer();
    //     }
    // }, [trigger]);


    // useEffect(() => {
    //     if(editRecord){
    //         console.log('ss');
    //     }else{
    //         GetSaleCustomer();
    //     }
    // }, [editRecord])

    // const GetSaleCustomer = () => {
    //     request.get('quotation/get_detail_esti/')
    //         .then(function (response) {
    //             setGetdata(response.data.customer)
    //             setInvoiceNumber(response.data?.ref_no)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }


    const SaleMobiles = getdataCustomr?.map(mem => ({ label: mem.customer_name, value: mem.id }));
    const SaleCompanies = getdataCustomr?.map((com) => ({ label: com.customer_company_name, value: com.id }));


    const handleSelectedSale = (value) => {
        const SelectedPersonDetails = getdataCustomr?.find((mem) => mem.id === value)
        setSelectedSale(SelectedPersonDetails);
    }
    const handleSelectedSalessss = (value) => {
        const SelectedPersonDetailsss = getdataCustomr?.find((mem) => mem.id === value)
        setSelectedSale(SelectedPersonDetailsss);
    }

    const handleChangeSwitch = () => {
        setSwitchJd(!switchJd)
    }

    // ==========  Date Change =======
    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Fragment >
            <Flex centerVertically>
                <span style={{ fontWeight: 'bold' }}>Search By </span>&nbsp;&nbsp; :&nbsp;&nbsp;
                <span>Customer Name</span>&nbsp;
                <Switch onClick={handleChangeSwitch} />
                &nbsp;<span>Company Name</span>
            </Flex><br />
            {/* <Switch onClick={handleChangeSwitch} /> */}
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
                                        placeholder={'Customer Name'} name={'customer_name'}
                                        onChange={handleSelectedSale}
                                        disabled />
                                // <Input label={'Customer Name'} disabled name={'customer_name'} placeholder={'Customer Name'} />
                            }

                            <Input name={'supplier_id'} display={"none"} />



                        </Col>

                        <Col span={24} md={12}>
                            {
                                switchJd ?
                                    // <Input label={'Company Name'} disabled name={'company_name'} placeholder={'Company Name'} />
                                    <CustomSelect
                                        options={SaleCompanies}
                                        label={'Company Name'}
                                        placeholder={'Company Name'} name={'company_name'}
                                        onChange={handleSelectedSalessss}
                                        disabled />
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
                            <Input label={'Mobile Number'} name={'mobile_number'} placeholder={'Mobile Number'} />
                        </Col>

                        <Col span={24} md={12}>
                            <Input label={'GST IN'} name={'GSTIN'} placeholder={'GST IN'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter GSTIN !'
                                    }
                                ]}
                            />
                        </Col>


                        <Col span={24} md={12}>
                            <Input label={'Email ID'} type="email" name={'email'} placeholder={'Email ID'} />
                        </Col>

                        {/* <Col span={24} md={12}>
                            <Input label={'Company Name'} name={'company_name'} placeholder={'Company Name'} disabled />
                        </Col> */}

                        <Col span={24} md={12}>
                            <TextAreas label={'Address'} name={'address'} placeholder={'Address'} />
                        </Col>
                        <Input name={'customer'} display={"none"} />
                    </Row>
                </Col>
                <Col span={24} md={8}>
                    <Row>
                        <Col span={24}>
                            <CustomInputNumber label={'Ref No'} precision={0} value={1} name={'ref_no'} placeholder={'Reference No'} disabled />
                        </Col>

                        <Col span={24}>
                            <CustomDatePicker label={'Invoice date'} name={'invoice_date'} placeholder={'Invoice Date'} onChange={handleOnChange} />
                        </Col>
                        <br />

                        < Col span={24} md={24} >
                            <Input label={'State'} name={'state_of_supply'} placeholder={'State'} />
                        </Col>
                    </Row>
                </Col>

            </Row>


            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
