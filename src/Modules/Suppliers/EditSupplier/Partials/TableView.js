import React, { useState } from 'react'
import { Table } from '../../../../Components/Table';
import { Modal } from '../../../../Components/Modal';
import { Col, Form, Modal as Modals, Row } from 'antd';
import {EditOutlined } from '@ant-design/icons';
import Flex from '../../../../Components/Flex';
import Button from '../../../../Components/Form/Button';
import { TopTitle } from '../../../../Components/Form/TopTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import request from '../../../../utils/request';
import EditSuppliers from '../../AddSupplier/Partials/EditSuppilers';
import Input from '../../../../Components/Form/Input';

const TableView = ({ setSupplier, getSupplier }) => {

    const URL = 'supplier/add_supplier/'

    const { id } = useParams();

    const [data, setData] = useState(null);

    const [form] = Form.useForm();

    const nevigate = useNavigate();

    const [selectedSupplier, setSelectedSupplier] = useState({});

    const [searchText, setSearchText] = useState([]);

    const [date, setDate] = useState('');
    // const [ischecked, setIschecked] = useState(false);
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

    useEffect(() => {
        GetSupplier();
    }, [])

    useEffect(() => {
        form.setFieldsValue({ supplier_name: selectedSupplier.supplier_name })
        form.setFieldsValue({ mobile_number: selectedSupplier.mobile_number })
    }, [selectedSupplier])

    const GetSupplier = (values) => {
        request.get(`${URL}`, values)
            .then(function (response) {

                // setSupplier(response.data)
                setDataSource(response.data)
                    .then(response => response.json())
                    .then(data => setData(data))

            }, [id])
            .catch(function (error) {
                console.log(error);
            });
    }


    const [tableData, setTableData] = useState();
    const [dataSource, setDataSource] = useState([])

    const handleSuppilers = () => {
        GetSupplier()
        handleOk()
    }

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        // {
        //     title: 'Supplier Name',
        //     dataIndex: 'id',
        // },
        {
            title: 'Supplier Name',
            dataIndex: 'supplier_name',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.supplier_name).includes(value.toLowerCase()) ||
                    String(record.mobile_number).includes(value.toLowerCase()) ||
                    String(record.supplier_company).includes(value.toLowerCase());
            },
        },
        {
            title: 'Phone No',
            dataIndex: 'mobile_number',
        },
        {
            title: 'Company Name',
            dataIndex: 'supplier_company',
        },
        {
            title: 'Debt Amount',
            dataIndex: 'debt_amt',
        },

        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <>
                        <Flex gap={'15px'}>
                            <Button.Success onClick={() => {
                                onEditStudent(record);
                            }} text={<EditOutlined />} />
                            {/* <Button.Danger text={<DeleteOutlined />} onClick={() => onDeleteStudent(record)} /> */}
                            <Button.Primary text={'profile'} onClick={() => nevigate(`/SupplierProfiles/${record.id}`)} />
                        </Flex>
                    </>
                );
            },

        }
    ]

    const onEditStudent = (record) => {
        console.log(isModalOpen, 'called')
        showModal();
        setModalTitle("update");
        setModalContent(<EditSuppliers suppilerData={record} handleSuppilers={handleSuppilers} />);
    }


    return (
        <div>
            <TopTitle Heading={'View Supplier List'} />
            <Row gutter={[24, 24]}>
                <Col span={24} md={18}></Col>
                <Col span={24} md={6} style={{ marginTop: '25px' }}>
                    <Input
                        placeholder="Search By Supplier Name"
                        value={searchText}
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Col>
            </Row>

            <Table columns={columns} data={dataSource} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />

        </div>
    )
}

export default TableView