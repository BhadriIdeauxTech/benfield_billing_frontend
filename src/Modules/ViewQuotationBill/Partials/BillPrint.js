import React from 'react'
import { BillTable } from './TableStyle'

const BillPrint = ({ componentRef, salesList }) => {

    const TableComponent = () => {

        const rows = salesList.map((item, index) => {
            const formattedAmount = (item?.item_amt_no_gst !== null ? item?.item_amt_no_gst:0).toLocaleString('en-IN', { minimumFractionDigits: 2 });
            const formattedTaxRate = ( item?.price_amount !== null ? item.price_amount:0).toLocaleString('en-IN', { minimumFractionDigits: 2 });

            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td><b style={{ fontSize: '14px' }}>{item.item_name}</b></td>
                    <td>{item.item_hsn}</td>
                    <td><b style={{ fontSize: '12px' }}>{item.quantity} {item.unit}</b></td>
                    <td>{formattedTaxRate}</td>
                    <td>{item.unit}</td>
                    <td><b style={{ fontSize: '12px' }}>{formattedAmount}</b></td>
                </tr>
            );
        });
        return (
            <BillTable>
                <table>
                    <thead>
                        <tr>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' ,textTransform: 'uppercase'}} >Sl.<br />No</th>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500',textTransform: 'uppercase' }} >Particulars</th>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' ,textTransform: 'uppercase'}} >HSN </th>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500',textTransform: 'uppercase'}}>Quantity</th>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' ,textTransform: 'uppercase'}} >Rate</th>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' ,textTransform: 'uppercase'}} >Per</th>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500',textTransform: 'uppercase' }} >Amount</th>
                        </tr>
                    </thead>
                    <tbody style={{textTransform: 'uppercase'}}>
                        {
                            rows
                        }
                    </tbody>
                </table>
            </BillTable>
        )
    }


    return (
        <div style={{}} ref={componentRef}>
            <div style={{ padding: '0 30px' }}>
                <TableComponent />
            </div>
        </div>
    )
}

export default BillPrint