import React from 'react'
import { Table } from '../../../../Components/Table'
import { useState } from 'react'
import { useEffect } from 'react';
import dayjs from 'dayjs'


const Creditpay = ({getSupplier}) => {

    const [creditBillList, setCreditBillList] = useState([]);
    const [searchText, setSearchText] = useState([]);


    useEffect(() => {
        setCreditBillList(getSupplier.credit_list)
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
        {/* <Row gutter={[24, 24]}>
                <Col span={24} md={17}></Col>
                <Col span={24} md={4}>
                    <Input
                        placeholder="Search here....."
                        style={{ width: 280, height: 40, border: '1px solid black' }}
                        value={searchText}
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Col>
            </Row> */}
         <Table columns = {columns} data = {creditBillList} />
    </div>
  )
}

export default Creditpay