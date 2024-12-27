import { Col, Form } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { TopTitle } from '../../../../Components/Form/TopTitle';
import { Row } from '../../../../Components/Row';
import Input from '../../../../Components/Form/Input';
import { CustomInputNumber } from '../../../../Components/Form/CustomInputNumber';
import { CustomDatePicker } from '../../../../Components/Form/CustomDatePicker';
import { TextAreas } from '../../../../Components/Form/TextArea';
import { Select } from '../../../../Components/Form/Select';
import { Modal } from '../../../../Components/Modal';
import AddSpplier from '../../../Suppliers/AddSupplier';
import request from '../../../../utils/request';
import Switch from '../../../../Components/Form/Switch';
import { CustomSelect } from '../../../../Components/Form/CustomSelect';
import Flex from '../../../../Components/Flex';

export const PurchaseFormHeader = ({ setSaleorder, Setreset, setProductList, setSelectedSupplierDetails, setSelectedSupplierBillDetails, trigger }) => {

    const [form] = Form.useForm();

    const [switchJd, setSwitchJd] = useState(true)
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ======  Selected Date ========
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [getdata, setGetdata] = useState([])
    const [SupplierBillsData, setSupplierBillsData] = useState([])


    const onViewRow = () => {
        // setModalTitle("Add Details");
        setModalContent(<AddSpplier />);
        showModal();
    }

    const handleChangeSwitch = () => {
        setSwitchJd(!switchJd)
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
        request.post('purchase/purchase_return_invoice_no/', {
            supplier: id
        }
        )
            .then(function (response) {
                setSupplierBillsData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetSupplierBiilsDetails = (id) => {
        request.post('purchase/purchase_return_details/', {
            purchase: id
        }
        )
            .then(function (response) {
                setSelectedSupplierBillDetails(response.data)
                setProductList(response.data.product)
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const SupplierCompany = getdata?.map(com => ({ label: com.supplier_company, value: com.supplier_company }));

    const handleSelectedSalessss = (value) => {
        const SelectedPersonDetailsss = getdata?.find((mem) => mem.supplier_company === value)
        setSelectedSupplierDetails(SelectedPersonDetailsss);
        Setreset()
        setProductList([])
    }


    const SupplierName = getdata?.map(mob => ({ label: mob.supplier_name, value: mob.supplier_name }));
    // 
    const handleSelectedSale = (value) => {
        const SelectedPersonDetails = getdata?.find((mem) => mem.supplier_name === value)
        setSelectedSupplierDetails(SelectedPersonDetails);
        GetSupplierBiils(SelectedPersonDetails.id);
        Setreset()
        setProductList([])
    }

    const SupplierBills = SupplierBillsData?.map(bill => ({ label: bill.purchase_invoice_no, value: bill.purchase_invoice_no }));

    const handleSelectedBill = (value) => {
        const SelectedPersonBillDetails = SupplierBillsData?.find((mem) => mem.purchase_invoice_no === value)
        GetSupplierBiilsDetails(SelectedPersonBillDetails.purchase_id);
        Setreset()
        setProductList([])
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
                    {/* <Switch label={'Company'} label2={'Name'} onChange={handleChangeSwitch}  /> */}
                    <Row gutter={[12, 12]}>
                        <Col span={24} md={12}>
                            {
                                switchJd ?
                                    <CustomSelect
                                        options={SupplierName}
                                        style={{ textTransform: 'uppercase' }}
                                        showSearch label={'Supplier Name'}
                                        placeholder={'Select Supplier Name'} name={'supplier_name'}
                                        onButtonClick={onViewRow}
                                        onChange={handleSelectedSale}
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
                                        options={SupplierName}
                                        style={{ textTransform: 'uppercase' }}
                                        showSearch label={'Supplier Name'}
                                        placeholder={'Select Supplier Name'} name={'supplier_name'}
                                        onChange={handleSelectedSale} 
                                        disabled/>
                            }
                            <Input name={'supplier_id'} display={'none'} />

                        </Col>



                        <Col span={24} md={12}>
                            {
                                switchJd ?
                                    // <Input label={'Company Name'} name={'company_name'} disabled placeholder={'Company Name'} />
                                    <CustomSelect
                                        options={SupplierCompany}
                                        style={{ textTransform: 'uppercase' }}
                                        label={'Company Name'}
                                        placeholder={'Select Company Name'} name={'company_name'}
                                        onChange={handleSelectedSalessss}
                                        disabled />
                                    :
                                    <CustomSelect
                                        options={SupplierCompany}
                                        style={{ textTransform: 'uppercase' }}
                                        showSearch label={'Company Name'}
                                        placeholder={'Select Company Name'} name={'company_name'}
                                        onChange={handleSelectedSalessss}
                                        onButtonClick={onViewRow}
                                        buttonLabel={'Add Supplier'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Select Supplier Name !'
                                            }
                                        ]} />
                            }

                        </Col>

                        <Col span={24} md={12}>
                            <Select
                                options={SupplierBills}
                                showSearch label={'Bill Number'}
                                placeholder={'Select Number'} name={'bill_no'}
                                // onChange={handleBillShow} 
                                onChange={handleSelectedBill}
                                rules={[
                                    {
                                        required:true,
                                        message:'Plz Select Bill Number'
                                    }
                                ]}
                            />
                            <Input name={'purchase_id'} display={'none'} />
                        </Col>

                        <Col span={24} md={12}>
                            <Input label={'Mobile Number'} name={'mobile_number'} placeholder={'Mobile Number'} />
                        </Col>
                        <Col span={24} md={12}>
                            <Input label={'GST IN'} name={'GSTIN'} placeholder={'GST IN'}
                            style={{ textTransform: 'uppercase' }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Enter GST IN !'
                                    }
                                ]} />
                        </Col>
                        <Col span={24} md={12}>
                            <Input label={'Email ID'} type={'email'} name={'email'} placeholder={'Email ID'}  />
                        </Col>

                        <Col span={24} md={12}>
                            <Input label={'State'} name={'state_of_supply'} placeholder={'State'}  style={{ textTransform: 'uppercase' }}/>
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
