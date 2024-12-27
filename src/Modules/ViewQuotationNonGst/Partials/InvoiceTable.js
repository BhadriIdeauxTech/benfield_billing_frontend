import React, { useEffect, useState } from 'react'
import { Table } from '../../../Components/Table'
import request from '../../../utils/request';
import Flex from '../../../Components/Flex';
import Button from '../../../Components/Form/Button';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Modal } from '../../../Components/Modal';
import { AiOutlinePrinter } from 'react-icons/ai';
import { BillQuotationEstimate } from './BillDetNow';
import Input from '../../../Components/Form/Input';

export const InvoiceTable = () => {

    const [dataSource, setDataSource] = useState([]);
    const [searchText, setSearchText] = useState([]);
    const [CompanyProfile, setCompanyProfile] = useState({});
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

    const URLS = 'quotation/get_all_esti_invoice_new/'

    useEffect(() => {
        GetInvoices();
    }, [])

    const GetInvoices = (values) => {
        request.get(`${URLS}`, values)
            .then(function (response) {
                setDataSource(response.data?.sale)
                setCompanyProfile(response.data?.business)
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
        setModalTitle("View Estimation Invoice");
        setModalContent(<BillQuotationEstimate record={record} Company={CompanyProfile} />);
    }


    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Invoice Number',
            dataIndex: 'ref_no',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.ref_no).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.ref_no).includes(value.toUpperCase());
            },
        },
        {
            title: 'Date',
            dataIndex: 'invoice_date'
        },
        {
            title: 'Customer Name',
            dataIndex: 'customer_name'
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
                        <Flex spaceEvenly>
                            {/* <Button.Success onClick={() => { onEditStudent(record) }} text={<EditOutlined />} /> */}
                            <Button.Success onClick={() => { onViewDetails(record) }} text={<EyeOutlined />} />
                            {/* <Button.Success  text={<AiOutlinePrinter/>} /> */}
                        </Flex>
                    </>
                );
            },
        },
    ]

    return (
        <div>
             <Flex end>
                   <Input
                        placeholder="Search by Invoice number"
                        value={searchText}
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}

                    />
                   </Flex>
            <Table columns={columns} data={dataSource} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}
