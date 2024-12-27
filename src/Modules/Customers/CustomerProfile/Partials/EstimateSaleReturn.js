import React from 'react'
import { Table } from '../../../../Components/Table'
import { useState } from 'react'
import dayjs from 'dayjs';
import { useEffect } from 'react';

const EstimateSaleReturn = ({CustomerDetails}) => {
    
    const [advcdBillList, setAdvcdBillList] = useState([]);

    useEffect(() => {
        setAdvcdBillList(CustomerDetails?.estimate_sales_return_list)
    }, [CustomerDetails])


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
        },
        {
            title: 'Transaction',
            dataIndex: 'transaction_type',
        },
        {
            title: 'Payment Type',
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
        <Table columns = {columns} data = {advcdBillList} />
    </div>
  )
}

export default EstimateSaleReturn