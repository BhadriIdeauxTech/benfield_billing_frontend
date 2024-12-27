
import {EditOutlined } from '@ant-design/icons'
import React from 'react'
import { useState } from 'react'
import Flex from '../../../../Components/Flex'
import Button from '../../../../Components/Form/Button'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { Modal } from '../../../../Components/Modal'
import { Table } from '../../../../Components/Table'
import { GrView } from 'react-icons/gr'
import { ProductViewForm } from '../../Add Items/Partials/ProductViewForm'
import request from '../../../../utils/request'
import { useEffect } from 'react'
import { AddItems } from '../../Add Items/Partials/AddItems'
import Input from '../../../../Components/Form/Input'

const TableViewItem = () => {
    const URL = 'product/products_all_details'
    const [dataSource, setDataSource] = useState([]);
    //   ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


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

    const columns = [
        {
            title: 'SI NO',
            render: (value, item, index) => index + 1,

        },
        {
            title: 'Product Name',
            dataIndex: 'item_name',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.item_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.item_name).includes(value.toUpperCase());
            },
        },
        {
            title: 'HSN Code',
            dataIndex: 'item_hsn',

        },
        {
            title: 'Available Quantity',
            dataIndex: 'avilable_qty',

        },
        {
            title: 'Direct Stock',
            dataIndex: 'stock_value',

        },
        {
            title: 'Unit',
            dataIndex: 'item_unit',
        },
        {
            title: 'Stock in Quantity',
            dataIndex: 'stock_in_qty',

        },
        {
            title: 'Stock Out Quantity',
            dataIndex: 'stock_out_qty',

        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <Flex center gap={'15px'}>
                        <Button.Success onClick={() => { EditProduct(record) }} text={<EditOutlined />} />
                        <Button.Success onClick={() => { ViewPrduct(record) }} text={<GrView />} />
                        {/* <Button.Danger text={<DeleteOutlined />} onClick={() => {Deleteitems(record)}} /> */}
                    </Flex>
                )
            }
        },
    ]
    
    const EditProduct = (record) => {
        setModalTitle("Edit Item");
        setModalContent(<AddItems Itemdata={record} handleGetProduct={handleGetProduct} />);
        showModal();
    }
    const ViewPrduct = (record) => {
        setModalTitle("View Details");
        setModalContent(<ProductViewForm datas={record} />);
        showModal();
    }

    const Getitems = () => {
        request.get(`${URL}`).then((response) => {
            setDataSource(response.data)
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        Getitems();
    }, [])

    const Deleteitems = (record, id) => {
        request.delete(`product/product_delete/${id}`, record).then((response) => {
            // setDataSource(dataSource.filter((record) => record.id !== id));
            setDataSource(response.data)
        }).catch(error => {
            console.log(error);
        });
    };

    const handleGetProduct = () => {
        Getitems();
        handleOk();
    }

    return (
        <div>
            <TopTitle Heading={'View Items'} />
            <Flex end centerVertically  style={{ marginTop: '25px' }}>
                {/* <Label>Search by Product Name : </Label> */}
                <Input
                    placeholder="Search by Product Name"
                    value={searchText}
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)} />
            </Flex>
            <Table columns={columns} data={dataSource} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}

export default TableViewItem
