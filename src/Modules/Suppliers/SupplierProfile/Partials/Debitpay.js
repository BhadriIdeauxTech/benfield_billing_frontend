import React from 'react'
import { Table } from '../../../../Components/Table'
import { useState } from 'react'
import { useEffect } from 'react';
import { Col, Input, Row } from 'antd';
import dayjs from 'dayjs'


const Debitpay = ({ getSupplier }) => {

    const [debitBillList, setDebitBillList] = useState([]);
    const [searchText, setSearchText] = useState([]);


    useEffect(() => {
        setDebitBillList(getSupplier.debit_list)
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
            <Table columns={columns} data={debitBillList} />
        </div>
    )
}

export default Debitpay