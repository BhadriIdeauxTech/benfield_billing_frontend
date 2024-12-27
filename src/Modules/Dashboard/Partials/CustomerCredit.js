import React from 'react'
import { Box, Card, CardWrapper } from './style'
import { CustomercreditData } from '../../../Assets/DashboardData'
import { TopTitle } from '../../../Components/Form/TopTitle'
import { FormTitle } from '../../../Components/Form/FormTitle'
import Flex from '../../../Components/Flex'
import { useEffect } from 'react'
import { useState } from 'react'
import { Table } from '../../../Components/Table'

const CustomerCredit = ({ getDash }) => {

   
    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Number',
            dataIndex: 'number',
        },
        {
            title: 'Amount',
            dataIndex: 'creditbalance',
        },
    ]
   

    const tableData = getDash?.customer_credit?.map((item, index) => {
        return {
            key: index,
            number:item.mobile_no,
            name: item.customer,
            creditbalance: item.credit_balance,
        };
    });

    return (
        <div>
            <FormTitle Title={'Customer Credit'} />
            <Table columns={columns} data={tableData} />
        </div>
    )
}

export default CustomerCredit