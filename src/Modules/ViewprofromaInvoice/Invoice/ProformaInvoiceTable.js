import React, { useEffect, useState } from 'react'
import { Table } from '../../../Components/Table'
import request from '../../../utils/request';
import Flex from '../../../Components/Flex';
import { EyeOutlined } from '@ant-design/icons';
import { Modal } from '../../../Components/Modal';
import { BillDetNow } from './BillDetNow';
import Input from '../../../Components/Form/Input';
import { TableIconHolder } from '../../../Components/Styled';
import { THEME } from '../../../theme';
import { FiEdit } from 'react-icons/fi';
import { TbArrowsExchange } from "react-icons/tb";
import { CustomPopconfirm } from '../../../Components/CustomPageConfirm';
import { MdDeleteForever } from "react-icons/md";
import { ProformaEntryPage } from '../../ProformaInvoice/Partials/ProformaEntryPage';
import { TopTitle } from '../../../Components/Form/TopTitle';
import { toast } from 'react-toastify';
import NewFixedPrintDesign from '../../ViewSaleBills/Partials/NewFixedPrintDesign';

export const ProformaInvoiceTable = () => {

    const [dataSource, setDataSource] = useState([]);

    const [searchText, setSearchText] = useState([]);

    const [proformTrigger, setProformTrigger] = useState(0)

    const [widthModal, setWidthModal] = useState(0)

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

    const URLS = 'sales/get_all_proforma_invoice/';
    const SALE_CHANGE_URLS = 'sales/convert_proforma_to_sale/';
    const DELETE_SALE_URL = 'sales/edit_proforma/'

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

    const UpdateForm = () => {
        GetInvoices()
        handleOk()
    }

    const handleConfirm = (record) => {
        ChangeToSale(record)
    }

    const ChangeToSale = (values) => {
        request.put(`${SALE_CHANGE_URLS}${values?.id}/`)
            .then(function (response) {
                if (response.status === 200) {
                    GetInvoices();
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
        console.log(record,'r2222222222ecord');
        showModal();
        setModalTitle("View Proforma Invoice");
        setWidthModal(1000)
        // setModalContent(<BillDetNow record={record} Company={CompanyProfile} />);
        setModalContent(<NewFixedPrintDesign HeadingChange={true} record={record} companyProfile={CompanyProfile} />);

    }

    const onEditDetails = (record) => {
        setProformTrigger(proformTrigger + 1)
        showModal();
        setModalTitle("Update Proforma Invoice");
        setWidthModal(1200)
        setModalContent(<ProformaEntryPage updateRecord={record} UpdateForm={UpdateForm} proformTrigger={proformTrigger} />);
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
                    <Flex spaceEvenly>
                        {/* <Button.Success onClick={() => { onEditStudent(record) }} text={<EditOutlined />} /> */}
                        {/* <Button.Success  text={<AiOutlinePrinter/>} /> */}
                        <TableIconHolder color={THEME.green} size={'22px'} onClick={() => { onViewDetails(record) }} >
                            <EyeOutlined />
                        </TableIconHolder>
                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { onEditDetails(record) }}>
                            <FiEdit />
                        </TableIconHolder>
                        <CustomPopconfirm
                            record={record}
                            confirm={handleConfirm}
                            title={"Proforma to Sale"}
                            okText={"Convert"}
                            description={"Are you sure to convert Proforma Invoice to Sale ?"}>
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
                );
            },
        },
    ]

    return (
        <div>
            <TopTitle Heading={'Proforma Invoice'} />
            <Flex end>
                <Input
                    placeholder="Search by Invoice number"
                    value={searchText}
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}

                />
            </Flex>
            <Table columns={columns} data={dataSource} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={widthModal} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}
