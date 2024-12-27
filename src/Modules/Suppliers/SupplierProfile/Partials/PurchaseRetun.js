import React from 'react'
import { Table } from '../../../../Components/Table'
import { useState } from 'react'
import { useEffect } from 'react';
import { Col, Input, Row } from 'antd';
import dayjs from 'dayjs'

const PurchaseRetun = ({ getSupplier }) => {

    const [purchaseReunBillList, setPurchaseReunBillList] = useState([]);
    const [searchText, setSearchText] = useState([]);


    useEffect(() => {
        setPurchaseReunBillList(getSupplier.purchase_return_list)
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
            render: (text) => text || '-',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.invoice_no).includes(value.toLowerCase()) ||
                    String(record.date).includes(value.toLowerCase());
            },
        },
        {
            title: 'Transaction',
            dataIndex: 'transaction_type',
            render: (text) => text || '-',
        },
        {
            title: 'Payment',
            dataIndex: 'payment_type',
            render: (text) => text || '-',
        },
        {
            title: 'Bill Amount',
            dataIndex: 'bill_amt',
            render: (text) => text || '-',
        },
        {
            title: 'Balance',
            dataIndex: 'balance_due',
            render: (text) => text || '-',
        },
    ]
    return (
        <div>
            <Table columns={columns} data={purchaseReunBillList} />
        </div>
    )
}

export default PurchaseRetun