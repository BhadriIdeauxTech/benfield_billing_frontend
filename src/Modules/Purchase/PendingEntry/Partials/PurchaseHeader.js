import { Col, Form } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Row } from '../../../../Components/Row';
import Input from '../../../../Components/Form/Input';
import { CustomInputNumber } from '../../../../Components/Form/CustomInputNumber';
import { CustomDatePicker } from '../../../../Components/Form/CustomDatePicker';
import { TextAreas } from '../../../../Components/Form/TextArea';
import { Modal } from '../../../../Components/Modal';
import Addsppliers from '../../../Suppliers/AddSupplier/Partials/Addsppliers';
import request from '../../../../utils/request';
import Flex from '../../../../Components/Flex';
import { CustomSelect } from '../../../../Components/Form/CustomSelect';
import Switch from '../../../../Components/Form/Switch';

export const PurchaseFormHeader = ({ setSaleorder, setSelectedSupplierDetails, trigger }) => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ======  Selected Date ========
    const [selectedDate, setSelectedDate] = useState(dayjs().format('MMMM DD, YYYY'));

    const [getdata, setGetdata] = useState([])

    // 
    const [switchJd, setSwitchJd] = useState(true)

    const SupplierCompany = getdata?.map(com => ({ label: com.supplier_company, value: com.supplier_company }));


    const SupplierName = getdata?.map(mob => ({ label: mob.supplier_name, value: mob.supplier_name }));

    const handleSupplierName = (value) => {
        const SelectedPersonDetails = getdata?.find((mem) => mem.supplier_name === value)
        setSelectedSupplierDetails(SelectedPersonDetails);
    }

    const handleChangeSwitch = () => {
        setSwitchJd(!switchJd)
    }

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
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const SupplierMobile = getdata?.map(mob => ({ label: mob.mobile_number, value: mob.mobile_number }));

    const handleSelectedSale = (value) => {
        const SelectedPersonDetails = getdata?.find((mem) => mem.mobile_number === value)
        setSelectedSupplierDetails(SelectedPersonDetails);
    }

    const handleSelectedSalessss = (value) => {
        const SelectedPersonDetailsss = getdata?.find((mem) => mem.supplier_company === value)
        setSelectedSupplierDetails(SelectedPersonDetailsss);
    }



    return (
        <Fragment>
            <Flex centerVertically>
                <span style={{ fontWeight: 'bold' }}>Search By </span>&nbsp;&nbsp; :&nbsp;&nbsp;
                <span>Supplier Name</span>&nbsp;
                <Switch onClick={handleChangeSwitch} />
                &nbsp;<span>Company Name</span>
            </Flex><br />
            <Row>
                <Col span={24} md={16}>
                    <Row gutter={[12, 12]}>
                        <Col span={24} md={12}>
                            {
                                switchJd ?
                                    <CustomSelect
                                        options={SupplierName}
                                        style={{ textTransform: 'uppercase' }}
                                        showSearch label={'Supplier Name'}
                                        placeholder={'Supplier Name'} name={'supplier_name'}
                                        onChange={handleSupplierName}
                                        onButtonClick={onViewRow}
                                        buttonLabel={'Add Supplier'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Select Supplier Name !'
                                            }
                                        ]} />

                                    :
                                    // <Input label={'Supplier Name'} disabled name={'supplier_name'} placeholder={'Supplier Name'} />
                                    <CustomSelect
                                        options={SupplierName} label={'Supplier Name'}
                                        style={{ textTransform: 'uppercase' }}
                                        placeholder={'Supplier Name'} name={'supplier_name'}
                                        onChange={handleSupplierName}
                                        disabled />
                            }

                            <Input name={'supplier_id'} display={"none"} />



                        </Col>

                        <Col span={24} md={12}>
                            {
                                switchJd ?
                                    // <Input label={'Company Name'} disabled name={'company_name'} placeholder={'Company Name'} />
                                    <CustomSelect
                                        options={SupplierCompany}
                                        style={{ textTransform: 'uppercase' }}
                                        label={'Company Name'}
                                        placeholder={'Company Name'} name={'company_name'}
                                        onChange={handleSelectedSalessss}
                                        disabled
                                    />
                                    : <CustomSelect
                                        options={SupplierCompany}
                                        style={{ textTransform: 'uppercase' }}
                                        showSearch label={'Company Name'}
                                        placeholder={'Company Name'} name={'company_name'}
                                        onChange={handleSelectedSalessss}
                                        onButtonClick={onViewRow}
                                        buttonLabel={'Add Supplier'}
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
                            <Input label={'GST IN'} name={'GSTIN'} placeholder={'GST IN'}
                            style={{ textTransform: 'uppercase' }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Enter GST IN!'
                                    }
                                ]} />
                        </Col>

                        <Col span={24} md={12}>
                            <Input name={'mobile_number'} label={'Mobile Number'} disabled placeholder={'Mobile Number'} />
                        </Col>

                        <Col span={24} md={12}>
                            <Input label={'Email ID'} name={'email'} placeholder={'Email ID'} />
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
                            <CustomInputNumber label={'Purchase Number'} disabled precision={0} name={'invoice_no'} placeholder={'Purchase Number'}
                                rules={[{
                                    required: 'true',
                                    message: 'Enter the details !'
                                },]} />
                        </Col>
                        <Col span={24} md={24}>
                            <CustomInputNumber label={'Purchase Invoice Number'} precision={0} name={'purchase_invoice_no'} placeholder={'Invoice Number'}
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
                            <Input label={'State'} name={'state_of_supply'} placeholder={'State'} style={{ textTransform: 'uppercase' }}/>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />

        </Fragment>
    )
}
