import React from 'react'
import { BillTable } from '../../../ViewSaleBills/Partials/PrintContainer/style';



const Tables = ({ record }) => {

    const formatAmounts = (amount) => {
        // console.log(amount, typeof (amount), 'amountamount');
        return amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    const rows = record?.purchase_bill?.map((item, index) => {
        // const formattedAmount = (item.quantity * item.sale_price).toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedAmount = (item?.cal_amt).toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedTaxRate = (item.buy_rate).toLocaleString('en-IN', { minimumFractionDigits: 2 });


        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ textAlign: 'start', paddingLeft: '20px' }}><b style={{ fontSize: '12px' }}>{item.item_name}</b></td>
                <td>{item.hsn_code}</td>
                <td><b style={{ fontSize: '12px' }}>{parseFloat(item.item_qty).toFixed(0)} </b></td>
                <td>{item.item_unit_name}</td>
                <td>{formatAmounts(parseFloat(formattedTaxRate))}</td>
                {record?.tax_type === "GST" && <td>{item.tax_percentage}</td>}
                <td>{item?.dis_percentage}</td>
                {/* <td>{item.unit}</td> */}
                {/* <td>{item.discount_percentage}</td>
                <td>{item.cgst_percentage}</td>
                <td>{item.sgst_percentage}</td>
                <td>{item.igst_percentage}</td> */}
                <td><b style={{ fontSize: '12px' }}>{formatAmounts(parseFloat(formattedAmount))}</b></td>
            </tr>
        );
    });

    const formattedNoTaxAmt = record?.sub_total - record?.tax_total;

    const formattedCgst = parseFloat(record?.total_cgst_12_amount) + parseFloat(record?.total_cgst_18_amount);  //---> Total CGST
    const formattedSgst = parseFloat(record?.total_sgst_12_amount) + parseFloat(record?.total_sgst_18_amount);  //---> Total SGST
    const formattedIgst = parseFloat(record?.total_igst_12_amount) + parseFloat(record?.total_igst_18_amount);  //---> Total IGST


    return (
        <BillTable>
            <table>
                <thead>
                    <tr>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Sl<br />No.</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Description of Goods</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >HSN/SAC</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Quantity</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Unit</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Rate</th>
                        {record?.tax_type === "GST" && <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Tax %</th>}
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Dis %</th>
                        {/* <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >per</th> */}
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rows
                    }

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        {record?.tax_type === "GST" && <td></td>}
                        <td><h6 style={{ fontSize: '12px', fontWeight: '500', borderTop: '1px solid black', paddingTop: '4px' }}>{formatAmounts(formattedNoTaxAmt)}</h6></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        {record?.tax_type === "GST" && <td></td>}
                        <td></td>
                    </tr>
                    {/* <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> */}

                    <tr className='footer_table'>
                        <td></td>
                        <td style={{ fontSize: '12px', textAlign: 'right', fontWeight: '500' }}>Total</td>
                        <td></td>
                        <td style={{ fontSize: '12px', fontWeight: '600' }}>{parseFloat(record?.qty_total).toFixed(0)}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        {record?.tax_type === "GST" && <td></td>}
                        <td style={{ fontSize: '12px', fontWeight: '600' }}>₹ {formatAmounts(parseFloat(record?.grand_total))}</td>
                    </tr>
                </tbody>
                <tfoot style={{ border: '1px solid' }}>
                    <span style={{ height: "1px" }}></span>
                </tfoot>
            </table>
        </BillTable>
    )
}

export default Tables
