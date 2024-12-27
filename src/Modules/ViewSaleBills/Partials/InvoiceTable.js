import React, { Fragment, useEffect, useState } from 'react'
import { Table } from '../../../Components/Table'
import request from '../../../utils/request';
import Flex from '../../../Components/Flex';
import Button from '../../../Components/Form/Button';
import { EyeInvisibleFilled, EyeOutlined } from '@ant-design/icons';
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../Components/Modal';
import { BillDetNow } from './BillDetNow';
import Input from '../../../Components/Form/Input';
import { SalesEntryPage } from '../../Sales/Partials/SalesEntryPage';
import NewPrintDessign from './NewPrintDessign';
import { setCompanyProfile } from '../../BusinessProfile/actions';
import NewFixedPrintDesign from './NewFixedPrintDesign';
import Tables from './UpdatePrint/Partials/Table';
// import NewTable3 from './FixedPrintContainer/NewTable3';
// import NewTable2 from './FixedPrintContainer/NewTable2';

export const InvoiceTable = ({ getInvoice, setInvoice }) => {

    const [searchText, setSearchText] = useState([]);
    const [trigger, setTrigger] = useState(0)

    const [dataSource, setDataSource] = useState([]);
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [modalWidth, setModalWidth] = useState(0);

    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log('model called');
        setIsModalOpen(false);
    };

    const updateTrigger = () => {
        setTrigger(trigger + 1)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const Invoices = useSelector((state) => state?.invoice?.invoices?.sale)
    const CompanyProfile = useSelector((state) => state?.companyprofile?.companyprofile)

    console.log(CompanyProfile, 'company fff');
    const URLS = 'sales/get_sale_det_invoice/'
    const BusinessURL = 'profile/business_view'

    useEffect(() => {
        GetInvoices();
        GetBusines();
    }, [])

    useEffect(() => {
        GetInvoices();
    }, [trigger, isModalOpen])

    const GetInvoices = () => {
        request.get(`${URLS}`)
            .then(function (response) {
                setDataSource(response.data?.sale)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetBusines = (values) => {
        request.get(`${BusinessURL}`, values)
            .then(function (response) {
                dispatch(setCompanyProfile(response.data))
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const handleSearch = (value) => {
        setSearchText(value);
    };

    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Invoice Number',
            dataIndex: 'invoice_no',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.invoice_no).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.invoice_no).includes(value.toUpperCase());
            },
        },
        {
            title: 'Date',
            dataIndex: 'invoice_date'
        },
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',

        },
        {
            title: 'Phone Number',
            dataIndex: 'mobile_number'
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
                            {/* <Button.Success onClick={() => { onEditStudent(record) }} text={<EditOutlined />} /> */}
                            <Button.Primary onClick={() => { editBill(record) }} text={<FaRegEdit />} />
                            <Button.Success onClick={() => { onViewDetails(record) }} text={<EyeOutlined />} />
                            <Button.Success onClick={() => { onPrintView(record) }} text={<FaRegEdit />} />
                            <Button.Danger onClick={() => { onFixedPrintView(record) }} text={<EyeInvisibleFilled />} />
                            {/* <Button.Success  text={<AiOutlinePrinter/>} /> */}
                        </Flex>
                    </>
                );
            },
        },

    ]
    const editBill = (record) => {
        setTrigger(trigger + 1)
        setModalWidth(1200);
        showModal();
        setModalContent(<SalesEntryPage record={record} ViewEditTrigger={trigger} updateTrigger={updateTrigger} closeingModel={handleOk} />);
    }

    const onViewDetails = (record) => {
        showModal();
        setModalWidth(1000);
        // setModalTitle("View Sale Invoice");
        setModalContent(<BillDetNow record={record} CompanyProfile={CompanyProfile} />);
    }
    const onPrintView = (record) => {
        showModal();
        setModalWidth(1000);
        setModalContent(<NewPrintDessign record={record} companyProfile={CompanyProfile} />);
    }

    const onFixedPrintView = (record) => {
        showModal();
        setModalWidth(1000);
        setModalContent(<NewFixedPrintDesign record={record} companyProfile={CompanyProfile} />);
    }


    return (
        <Fragment>
            <Flex end>
                <Input
                    placeholder="Search by Invoice number"
                    value={searchText}
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </Flex>
            <Table columns={columns} data={dataSource} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modalWidth} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
