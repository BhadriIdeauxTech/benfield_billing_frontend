import React, { useEffect, useState } from 'react'
import request from '../../../../utils/request';
import Button from '../../../../Components/Form/Button';
import Flex from '../../../../Components/Flex';
import { Table } from '../../../../Components/Table';
import { Modal } from '../../../../Components/Modal';
import { FaRegEdit } from 'react-icons/fa';
import { EyeOutlined } from '@ant-design/icons';
import { EstimateEntryPage } from '../../../Estimate/Partials/EstimateEntryPage';
import Input from '../../../../Components/Form/Input';
import Switch from '../../../../Components/Form/Switch';
import { EstimateEntryPagenongst } from '../../../EstimateNonGST/Partials/EstimateEntryNonGST';
import { BillDetNow } from '../../../ViewQuotationBill/Partials/BillDetNow';
import { BillQuotationEstimate } from '../../../ViewQuotationNonGst/Partials/BillDetNow';

const QuotationTableView = () => {

    const URLS = 'quotation/add_esti_quo/'
    const URL_WITHOUT_EST = 'quotation/add_esti_quo_new/'
    const COMPANYURLS = 'quotation/get_all_esti_invoice/'

    const [searchText, setSearchText] = useState([]);
    const [trigger, setTrigger] = useState(0)
    const [modalWidth, setModalWidth] = useState(0)

    const [dataTable, setDataTable] = useState([]);
    const [dataTableWithoutEs, setDataTableWithoutEs] = useState([]);
    const [CompanyProfile, setCompanyProfile] = useState({});

    const [click, setClick] = useState(false);


    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSwitched = () => {
        setClick(!click);
    };

    const FormUpdateClose = () => {
        handleOk();
        GetQuotationTable();
    }

    const FormUpdateCloseWOES = () => {
        handleOk();
        GetQuotationWOESTable();
    }

    useEffect(() => {
        GetInvoices();
    }, [])

    const GetInvoices = (values) => {
        request.get(`${COMPANYURLS}`, values)
            .then(function (response) {
                setCompanyProfile(response.data?.business)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        if (click) {
            GetQuotationWOESTable()
        } else {
            GetQuotationTable();
        }
    }, [click])


    const GetQuotationTable = (values) => {
        request.get(`${URLS}`, values)
            .then(function (response) {
                setDataTable(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetQuotationWOESTable = (values) => {
        request.get(`${URL_WITHOUT_EST}`, values)
            .then(function (response) {
                setDataTableWithoutEs(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const onViewDetails = (record) => {
        showModal();
        setModalWidth(1000)
        setModalContent(<BillDetNow record={record} Company={CompanyProfile} />);
    }

    const onViewEstiamteDetails = (record) => {
        showModal();
        setModalWidth(1000)
        setModalContent(<BillQuotationEstimate record={record} Company={CompanyProfile} />);
    }

    const editBill = (record) => {
        setTrigger(trigger + 1)
        showModal();
        setModalWidth(1200);
        setModalContent(<EstimateEntryPage editRecord={record} EditTrigger={trigger} closeingModel={FormUpdateClose} />);
    }

    const editBillWOES = (record) => {
        setTrigger(trigger + 1)
        showModal();
        setModalWidth(1200);
        setModalContent(<EstimateEntryPagenongst editRecord={record} EditTrigger={trigger} closeingModel={FormUpdateCloseWOES} />);
    }

    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Date',
            dataIndex: 'invoice_date'
        },
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.customer_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.customer_name).includes(value.toUpperCase());
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render:(text)=>{
                return text !== null ? text:"_"
            }
        },
        {
            title: 'Phone Number',
            dataIndex: 'mobile_number',
            render:(text)=>{
                return text !== null ? text:"_"
            }
        },
        {
            title: 'Total Amount',
            dataIndex: 'grand_total'
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <>
                        <Flex spaceEvenly gap={'10px'}>
                            <Button.Primary
                                onClick={click ? () => { editBillWOES(record) } : () => { editBill(record) }}
                                text={<FaRegEdit />} />
                            <Button.Success
                                onClick={click ? () => { onViewEstiamteDetails(record) } : () => { onViewDetails(record) }}
                                text={<EyeOutlined />} />
                        </Flex>
                    </>
                );
            },
        },

    ]


    return (
        <div>
            <Flex spaceBetween={true}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} >
                    <h3>Invoice</h3>
                    <Switch onClick={handleSwitched} />
                    <h3>Estimate</h3>
                </div>
                <Input
                    placeholder="Search by Customer Name"
                    value={searchText}
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}

                />
            </Flex>

            {click ? <Table columns={columns} data={dataTableWithoutEs} /> :
                <Table columns={columns} data={dataTable} />}

            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modalWidth} modalTitle={modalTitle} modalContent={modalContent} />

        </div>
    )
}

export default QuotationTableView