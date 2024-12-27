import React, { useEffect, useState } from 'react'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { Table } from '../../../Components/Table'
import request from '../../../utils/request'
import { EditOutlined } from '@ant-design/icons'
import Flex from '../../../Components/Flex'
import Button from '../../../Components/Form/Button'
import { Modal as ViewPanelModal } from '../../../Components/Modal'
import { EditPanelModal } from './EditPanelModal'
import Input from '../../../Components/Form/Input'

const ViewPanel = () => {

    const [panel, setPanel] = useState([])
    const [searchText, setSearchText] = useState([]);
    const [openModal, setOpenModal] = useState(false)

    const [modalContent, setModalContent] = useState(null)

    useEffect(() => {
        getPanel()
    }, [openModal])

    const getPanel = () => {
        request.get('panel/view_panel')
            .then(response => {
                setPanel(response.data)
            })
            .catch(error => {
                console.log('error', error);
            })
    }

    const closeModal=()=>{
        setOpenModal(false)
    }

    const handleEdit = (record) => {
        request.get(`panel/vi_panel/${record.id}`)
            .then(resp => {
                setModalContent(<EditPanelModal data={resp.data}close={closeModal} />)
            })
            .catch(error => console.log(error, 'errorrrrr'))
        setOpenModal(true)
    }

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
            title: 'Available Quantity',
            dataIndex: 'avilable_qty',

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
            title: 'Selling Price',
            dataIndex: 'buy_rate',

        },
        {
            title: 'Action',
            render: (record) => {
                // console.log(record, 'Editview')
                return (
                    <Flex spaceEvenly>
                        <Button.Success text={<EditOutlined />} onClick={() => handleEdit(record)} />
                    </Flex>
                )

            }

        },
    ]


    return (
        <div>
            
            <TopTitle Heading={'View Panel'} />
            <Flex end>
                   <Input
                        placeholder="Search by Product Name"
                        value={searchText}
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}

                    />
                   </Flex>
            <Table columns={columns} data={panel} />
            <ViewPanelModal isVisible={openModal} width={1200} handleCancel={() => setOpenModal(false)}
                handleOk={() => setOpenModal(false)} modalContent={modalContent} modalTitle={'Edit Panel'} />
        </div>
    )
}

export default ViewPanel