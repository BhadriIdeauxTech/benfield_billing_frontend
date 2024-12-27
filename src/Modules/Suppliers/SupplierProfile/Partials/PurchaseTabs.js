import React from 'react'
import { Table } from '../../../../Components/Table'
import Column from 'antd/es/table/Column'
import { useState } from 'react'
import request from '../../../../utils/request'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { Col, Input, Row } from 'antd'

const PurchaseTabs = ({ getSupplier }) => {

    const [PurchaseBillList, setPurchaseBillList] = useState([]);
    const [searchText, setSearchText] = useState([]);

    useEffect(() => {
        setPurchaseBillList(getSupplier.purchase_bill_list)
    }, [getSupplier])

    const handleSearch = (value) => {
        setSearchText(value);
    };
    
    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date) => {
                return dayjs(date).format('DD\\MM\\YYYY');
              },
        },
        {
            title: 'Bill No',
            dataIndex: 'invoice_no',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.invoice_no).includes(value.toLowerCase()) ||
                    String(record.date).includes(value.toLowerCase());
            },
        },
        {
            title: 'Transaction',
            dataIndex: 'transaction_type',
        },
        {
            title: 'Payment',
            dataIndex: 'payment_type',
        },
        {
            title: 'Bill Amount',
            dataIndex: 'bill_amt',
        },
        {
            title: 'Balance',
            dataIndex: 'balance_due',
        },
    ]
    return (
        <div>
            <Table columns={columns} data={PurchaseBillList} />
        </div>
    )
}

export default PurchaseTabs