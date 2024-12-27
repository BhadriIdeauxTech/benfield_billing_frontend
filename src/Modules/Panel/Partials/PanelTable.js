import React, { useEffect, useState } from 'react'
import { Table } from '../../../Components/Table'
import { DeleteOutlined } from '@ant-design/icons'
import { FormBottom } from '../Styles'
import Button from '../../../Components/Form/Button'
import { Col, Tooltip } from 'antd'
import request from '../../../utils/request'
import { toast } from 'react-toastify'


export const PanelTable = ({panelName, setCheck,getPanel, deleteTableData, deleteTable, resetForm }) => {

    const [tData, setTData] = useState([getPanel])

    useEffect(() => {
        setTData(getPanel)
    }, [getPanel])

    const columns = [
        {
            title: 'S.No',
            dataIndex: 's_no',
            render: (text, record, rowIndex) => rowIndex + 1,

        },
        {
            title: 'Product Name',
            dataIndex: 'select_product',
            key: 'select_product',
        },
        {
            title: 'Take Quantity',
            dataIndex: 'required_quantity',
            key: 'required_quantity',
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Available Quantity',
            dataIndex: 'available_quantity',
            key: 'available_quantity',
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (

                <Tooltip title={'Delete'} >
                    <DeleteOutlined onClick={() => deleteTableData(index)} />
                </Tooltip>

            ),
        },
    ];


    // data sending format, 
    const sendData = {
        item_name: panelName,
        item_unit: tData[0]?.panel_unit,
        buy_rate: tData[0]?.panel_sale_price,
        gst_percentage: tData[0]?.panel_gst,
        avilable_qty: tData[0]?.panel_quantity,
        item_hsn:tData[0]?.panel_hsn,
        panel: tData.map(value => {
            // console.log(value, '-----------------------------------------');
            return {
                item: value.id,
                item_name: value.select_product,
                item_unit: value.unit,
                // item_hsn:value.product_hsn,
                previous_qty: value.available_quantity,
                take_qty: value.required_quantity
            }
        })
    }

    // handle submit in table
    const handleTable = () => {
        if (tData.length === 0) {
            toast.error('Please fill the table')
        }
        else {
            request.post('panel/add_panel', sendData)
                .then(res => {
                    console.log(res.data,'POST request successful');
                    toast.success('Success!')
                    resetForm();
                    setCheck(2) 
                }).then(() => {
                    deleteTable()
                })
                .catch(error => {
                    const code = error.response.status;
                    if (code === 400) {
                        toast.error('Please Change Panel Name!')
                        // deleteTable()
                    } else {
                        console.log('Error code ', code)
                    }

                })
           
        }
    }

    return (
        <>
            <Col span={24}>
                <Table columns={columns} data={tData} rowKey={(record, index) => index.toString()} />
            </Col>

            <FormBottom>

                <Button.Success text={'SUBMIT'} htmlType={'submit'} onClick={() => handleTable()} />

                <Button.Danger text={'CLEAR TABLE'} onClick={() => deleteTable()} />

            </FormBottom>

        </>
    )
}

