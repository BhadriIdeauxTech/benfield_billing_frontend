import React, { useEffect } from 'react'
import { Table } from '../../../../Components/Table';
import { Modal } from '../../../../Components/Modal';
import { useState } from 'react';
import { Modal as Modals } from 'antd';
import Flex from '../../../../Components/Flex';
import Button from '../../../../Components/Form/Button';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import AddingCustomers from '../../AddCustomers/Partials/AddCustomers';
import request from '../../../../utils/request';
import EditCustomerForm from '../../AddCustomers/Partials/EditCustomerForm';
import { formToJSON } from 'axios';
import Input from '../../../../Components/Form/Input';

const TableEdit = ({ setCustomer, getCustomer, EditCustomer }) => {

    const navigate = useNavigate();

    const [date, setDate] = useState('');

    const { id } = useParams();

    const URL = 'customers/add_customer/';

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
    
    const [searchText, setSearchText] = useState([]);

    const handleSearch = (value) => {
      setSearchText(value);
    };
    const onViewStudent = (record) => {
        // setModalContent('gfdhfc');
        setModalTitle("View Details");
        showModal();
    }

    useEffect(() => {
        GetSupplier();
    }, [])

    const GetSupplier = (values) => {
        request.get(`${URL}`, values)
            .then(function (response) {
                setDataSource(response.data)

            }, [id])
            .catch(function (error) {
                console.log(error);
            });
    }

    const [tableData, setTableData] = useState();
    const [dataSource, setDataSource] = useState([])

    const handleCus = () => {
        GetSupplier()
        handleOk()

    }

    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
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
            title: 'Company Name',
            dataIndex: 'customer_company_name',
        },
        {
            title: 'Phone No',
            dataIndex: 'mobile_number',
        },
        {
            title: 'Debt Amount',
            dataIndex: 'debit_amt',
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <>
                        <Flex gap={'15px'}>
                            <Button.Success onClick={() => {
                                onEditTableCus(record);
                            }} text={<EditOutlined />} />
                            {/* <Button.Danger text={<DeleteOutlined />} onClick={() => onDeleteStudent(record)} /> */}
                            <Button.Primary text={'profile'} onClick={() => navigate(`/CustomerProfiless/${record.id}`)} />
                        </Flex>
                    </>
                );
            },

        }
    ]
    const onEditTableCus = (record) => {
        console.log(isModalOpen, 'called')
        showModal();
        setModalTitle("Edit Customer");
        setModalContent(<EditCustomerForm cusdata={record} handleCus={handleCus} />);
    }

    return (
        <div>
            <Flex end style={{ marginTop: '25px' }}>
                <Input
                    placeholder="Search by Customer Name"
                    value={searchText}
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)} />
            </Flex>
            <Table columns={columns} data={dataSource} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}

export default TableEdit