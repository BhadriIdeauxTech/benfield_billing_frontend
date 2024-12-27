import React, { useEffect, useState } from 'react'
import { Table } from '../../../Components/Table'
import request from '../../../utils/request';
import Flex from '../../../Components/Flex';
import {  EyeOutlined } from '@ant-design/icons';
import { Modal } from '../../../Components/Modal';
import Input from '../../../Components/Form/Input';
import { TableIconHolder } from '../../../Components/Styled';
import { FiEdit } from 'react-icons/fi';
import { CustomPopconfirm } from '../../../Components/CustomPageConfirm';
import { TbArrowsExchange } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';
import { THEME } from '../../../theme';
import { TopTitle } from '../../../Components/Form/TopTitle';
import { toast } from 'react-toastify';
import { EstimateProformaEntryPage } from '../../PorformaNonGSTInvoice/Partials/ProformaEntryPage';
import NewFixedPrintDesign from '../../ViewSaleBills/Partials/NewFixedPrintDesign';

export const EstimationProformaInvoiceTable = () => {

    const [dataSource, setDataSource] = useState([]);

    const [searchText, setSearchText] = useState([]);

    const [proformTrigger, setProformTrigger] = useState(0)

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

    const URLS = 'sales/get_all_proforma_invoice_new/'
    const DELETE_SALE_URL = 'sales/edit_proforma_new/'
    const SALE_CHANGE_URLS = 'sales/convert_proforma_to_sale_new/';

    useEffect(() => {
        GetInvoices();
    }, [])

    const handleConfirm = (record) => {
        ChangeToSale(record)
    }

    const UpdateForm = () => {
        GetInvoices();
        handleOk()
    }

    const ChangeToSale = (values) => {
        request.put(`${SALE_CHANGE_URLS}${values?.id}/`)
            .then(function (response) {
                GetInvoices();
                if (response.status === 200) {
                } else if (response.status === 226) {
                    toast.warn(response.data?.message)
                }
                else {
                    toast.error("Can't convert profoma invoice to sale")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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

    const handleDelete = (record) => {
        ConfirmDelete(record)
    }

    const ConfirmDelete = (values) => {
        request.delete(`${DELETE_SALE_URL}${values?.id}/`)
            .then(function (response) {
                GetInvoices();
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const onViewDetails = (record) => {
        showModal();
        setModalTitle("View Estimate Invoice");
         // setModalContent(<BillDetNow record={record} Company={CompanyProfile} />);
        setModalContent(<NewFixedPrintDesign HeadingChange={true} record={record} estimate companyProfile={CompanyProfile} />);
    }

    const onEditDetails = (record) => {
        setProformTrigger(proformTrigger + 1)
        showModal();
        setModalTitle("Update Estimate Proforma Invoice");
        setModalContent(<EstimateProformaEntryPage updateRecord={record}
            proformTrigger={proformTrigger} UpdateForm={UpdateForm} />);
    }


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
            dataIndex: 'customer_name'
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
                        <Flex spaceEvenly>
                            <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { onViewDetails(record) }} >
                                <EyeOutlined />
                            </TableIconHolder>
                            <TableIconHolder color={THEME.blue} size={'22px'}
                                onClick={() => { onEditDetails(record) }}>
                                <FiEdit />
                            </TableIconHolder>
                            <CustomPopconfirm
                                record={record}
                                confirm={handleConfirm}
                                title={"Estimate Proforma to Sale"}
                                okText={"Convert"}
                                description={"Sure to convert Estimate Proforma Invoice to Sale ?"}>
                                <TableIconHolder color={THEME.red} size={'22px'} >
                                    <TbArrowsExchange />
                                </TableIconHolder>
                            </CustomPopconfirm>
                            <CustomPopconfirm
                                record={record}
                                confirm={handleDelete}
                                title={"Proforma to Sale"}
                                okText={"Yes"}
                                description={"Are you sure to delete this Proforma Invoice ?"}>
                                <TableIconHolder color={THEME.orange} size={'22px'} >
                                    <MdDeleteForever />
                                </TableIconHolder>
                            </CustomPopconfirm>
                        </Flex>
                    </>
                );
            },
        },
    ]



    return (
        <div>
            <TopTitle Heading={'Estimate Proforma'} />
            <Flex end>
                <Input
                    placeholder="Search by Invoice number"
                    value={searchText}
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}

                />
            </Flex>
            <Table columns={columns} data={dataSource} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1200} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}
