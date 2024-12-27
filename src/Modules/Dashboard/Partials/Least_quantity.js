import React, { useEffect, useState } from 'react'
import { Table } from '../../../Components/Table'
import {FormTitle } from '../../../Components/Form/FormTitle'

const Least_quantity = ({ getDash }) => {

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'product',
        },
        {
            title: 'HSN Code',
            dataIndex: 'hsn',
        },
        {
            title: 'Qty in Stock',
            dataIndex: 'qty',
        },
    ]

    const tableData = getDash?.least_product?.map((item, index) => {
        return {
            key: index,
            product: item.product,
            hsn: item.hsn,
            qty: item.qty,
        };
    });
  
    const data=[
        {
            product:'Copper wire',
            hsn:'3457',
            qty:'8',
        },
        {
            product:'  LED Tube set',
            hsn:'3458',
            qty:'2',


        },
    ]

    return (
        <div>
            <FormTitle Title={'Least Quantity Products'} />
            <Table columns={columns} data={tableData} />
        </div>
    )
}

export default Least_quantity