import React, { useEffect, useState } from 'react'
import request from '../../../../utils/request';
import { Modal } from '../../../../Components/Modal';
import { Table } from '../../../../Components/Table';
import Flex from '../../../../Components/Flex';
import Button from '../../../../Components/Form/Button';
import { FaRegEdit } from 'react-icons/fa';
import { EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { PurchaseEntryPage } from '../../../Purchase/Purchase/Partials/PurchseEntryPage';
import Input from '../../../../Components/Form/Input';
import Switch from '../../../../Components/Form/Switch';
import { PurchaseEntryPageEstimate } from '../../../Purchase/NonGstPurchse/Partials/PurchseEntryPage';
import { MdLocalPrintshop } from 'react-icons/md';
import NewFixedPrintDesign from '../../../Purchase/PurchasePrint';
import { useSelector } from 'react-redux';

const PurchaseViewTables = () => {

    const TABLE_URLS = 'purchase/purchase/'

    const [searchText, setSearchText] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const [triggerNew, setTriggerNew] = useState(0);
    const [modalWidth, setModalWidth] = useState(0);

    const [TableDataWE, setTableDataWE] = useState([]);
    const [click, setClick] = useState(false);
    const [dataTableWithoutEs, setDataTableWithoutEs] = useState([]);

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

    const FormUpdateClose = () => {
        handleOk();
        GetPurchaseTable();
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };
    const CompanyProfile = useSelector((state) => state?.companyprofile?.companyprofile);
    const handleSwitched = () => {
        // if (TableDataWE?.tax_type === "NoGST") {
        //     setClick(true)
        // }
        // else {
        //     setClick(false)
        // }
        setClick(!click)
    };

    useEffect(() => {
        GetPurchaseTable();
    }, [])

    const GetPurchaseTable = (values) => {
        request.get(`${TABLE_URLS}`, values)
            .then(function (response) {
                setTableDataWE(response.data)
            })
            .catch(function (error) {
                console.log(error.response.data, 'responseresult error');
            });
    }

    const editBill = (record) => {
        setTriggerNew(triggerNew + 1)
        showModal();
        setModalWidth(1200);
        setModalContent(<PurchaseEntryPage editRecord={record} EditTrigger={triggerNew}
            closeingModel={FormUpdateClose} />);
    }

    const editBillWOES = (record) => {
        setTrigger(trigger + 1)
        showModal();
        setModalWidth(1200);
        setModalTitle('Update Estimate purchase')
        setModalContent(<PurchaseEntryPageEstimate editRecord={record} EditTrigger={trigger} closeingModel={FormUpdateClose} />);
    }
    const onFixedPrintView = (record) => {
        showModal();
        setModalWidth(1000);
        setModalContent(<NewFixedPrintDesign record={record} companyProfile={CompanyProfile} />);
    }
    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Purchase Date',
            dataIndex: 'purchase_date',
            render: (date) => {
                return date ? new Date(date).toLocaleDateString() : "";
            },
        },
        {
            title: 'Supplier Name',
            dataIndex: 'supplier_name',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.supplier_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.supplier_name).includes(value.toUpperCase());
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
                            {/* <Button.Success
                                 onClick={() => { onViewDetails(record) }} 
                                text={<EyeOutlined />} /> */}
                            <Button.Default text={<MdLocalPrintshop size={22} onClick={() => { onFixedPrintView(record) }} />} />
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
                    placeholder="Search by Supplier Name"
                    value={searchText}
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                />

            </Flex>


            {click ? (
                <Table columns={columns} data={TableDataWE.filter(item => item.tax_type === "NoGST")} />
            ) : (
                <Table columns={columns} data={TableDataWE.filter(item => item.tax_type !== "NoGST")} />
            )}


            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modalWidth} modalTitle={modalTitle} modalContent={modalContent} />

        </div>
    )
}

export default PurchaseViewTables