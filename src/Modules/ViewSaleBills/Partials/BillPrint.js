import React from 'react'
import { BillTable} from './TableStyle'

const BillPrint = ({ componentRef, salesList }) => {
    
    const TableComponent = () => {

        const rows = salesList?.map((item, index) => {
            // const formattedAmount = (item.quantity * item.sale_price).toLocaleString('en-IN', { minimumFractionDigits: 2 });
            const formattedAmount =(item?.item_amt_no_gst || item?.item_cal_total_amt).toLocaleString('en-IN', { minimumFractionDigits: 2 });
            const formattedTaxRate = (item.price_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 });
            const formattedPrice = item.sale_price.toLocaleString('en-IN', { minimumFractionDigits: 2 });

            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td><b style={{ fontSize: '14px' }}>{item.item_name}</b></td>
                    <td>{item.item_hsn}</td>
                    <td><b style={{ fontSize: '12px' }}>{item.quantity} {item.unit}</b></td>
                    <td>{formattedTaxRate}</td>
                    {/* <td>{parseFloat(formattedPrice).toFixed(2)}</td> */}
                    <td>{item.unit}</td>
                    {/* <td>{item.discount_percentage}</td>
                    <td>{item.cgst_percentage}</td>
                    <td>{item.sgst_percentage}</td>
                    <td>{item.igst_percentage}</td> */}
                    <td><b style={{ fontSize: '12px' }}>{formattedAmount}</b></td>
                </tr>
            );
        });
        return (
            <BillTable>
                <table>
                    <thead>
                        <tr>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500',textTransform: 'uppercase' }} >Sl.<br />No</th>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500',textTransform: 'uppercase' }} >Particulars</th>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500',textTransform: 'uppercase' }} >HSN </th>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' ,textTransform: 'uppercase'}} >Quantity</th>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500',textTransform: 'uppercase' }} >Rate</th>
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500',textTransform: 'uppercase' }} >Per</th>
                            {/* <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Disc.%</th>
                            <th colspan="3" style={{ fontSize: '16px', fontWeight: '500' }} >GST Tax %</th> */}
                            <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500',textTransform: 'uppercase' }} >Amount</th>
                        </tr>
                    </thead>
                    <tbody style={{textTransform: 'uppercase'}}>
                        {/* {
                            salesList.map((purchase, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>21</td>
                                    <td>{purchase.hsn_code}</td>
                                    <td>{purchase.shipped_qty}</td>
                                    <td>{purchase.qty} </td>
                                    <td>{(purchase.price) + (purchase.price * purchase.tax_percentage / 100)}</td>
                                    <td>{purchase.price}</td>
                                    <td>{purchase.unit}</td>
                                    <td>{purchase.discount_percentage}</td>
                                    <td><b style={{fontSize:'12px'}}>{purchase.qty * purchase.price}</b></td>
                                </tr>
                            ))
                        } */}
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