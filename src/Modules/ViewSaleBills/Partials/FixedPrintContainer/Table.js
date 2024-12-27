import React from 'react'
import { BillTable } from './style'

const Table = ({ record }) => {

    const formatAmounts = (amount) => {
        // console.log(amount,typeof(amount),'amountamount');
        return amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    const rows = record?.sales?.map((item, index) => {
        // const formattedAmount = (item.quantity * item.sale_price).toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedAmount = (item?.item_amt_no_gst).toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedTaxRate = (item.price_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 });


        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td><b style={{ fontSize: '12px' }}>{item.item_name}</b></td>
                <td>{item.item_hsn}</td>
                <td></td>
                <td><b style={{ fontSize: '12px' }}>{parseFloat(item.quantity).toFixed(0)} {item.unit}</b></td>
                <td>{formatAmounts(parseFloat(formattedTaxRate))}</td>
                <td>{item?.discount_percentage}</td>
                <td>{item.unit}</td>
                {/* <td>{item.discount_percentage}</td>
                <td>{item.cgst_percentage}</td>
                <td>{item.sgst_percentage}</td>
                <td>{item.igst_percentage}</td> */}
                <td><b style={{ fontSize: '12px' }}>{formatAmounts(parseFloat(formattedAmount))}</b></td>
            </tr>
        );
    });

    const formattedNoTaxAmt = record?.sub_total - record?.tax_total;
    const formattedIgst = parseFloat(record?.total_igst_12_amount) + parseFloat(record?.total_igst_18_amount);


    return (
        <BillTable>
            <table>
                <thead>
                    <tr>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Sl<br />No.</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Description of Goods</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >HSN/SAC</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Part No.</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Quantity</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Rate</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >Dis %</th>
                        <th rowspan="2" style={{ fontSize: '16px', fontWeight: '500' }} >per</th>
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
                        <td></td>
                        <td><h6 style={{ fontSize: '12px', fontWeight: '500', borderTop: '1px solid black', paddingTop: '4px' }}>{formatAmounts(formattedNoTaxAmt)}</h6></td>
                    </tr>
                    {
                        record?.total_cgst_12_percentage == "0.00" && record?.total_cgst_18_percentage == "0.00" ? ('') : (
                            <tr>
                                <td></td>
                                <td><b style={{ fontSize: '12px' }}>OUTPUT CGST</b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><h6 style={{ fontSize: '12px', fontWeight: '500', borderTop: '1px solid black', paddingTop: '4px' }}>'{formatAmounts(formattedNoTaxAmt)}'</h6></td>
                            </tr>
                        )
                    }
                    {
                        record?.total_sgst_12_percentage == "0.00" && record?.total_sgst_18_percentage == "0.00" ? ('') :(
                            <tr>
                                <td></td>
                                <td><b style={{ fontSize: '12px' }}>OUTPUT SGST</b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><h6 style={{ fontSize: '12px', fontWeight: '500', borderTop: '1px solid black', paddingTop: '4px' }}>'{formattedNoTaxAmt}'</h6></td>
                            </tr>
                        )
                    }

                    {
                        record?.total_igst_12_percentage == "0.00" && record?.total_igst_18_percentage == "0.00" ? ('') : (
                            <tr>
                                <td></td>
                                <td><b style={{ fontSize: '12px' }}>OUTPUT IGST</b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><h6 style={{ fontSize: '12px', fontWeight: '600' }}>{formatAmounts(formattedIgst)}</h6></td>
                            </tr>
                        )
                    }

                    <tr>
                        <td></td>
                        <td><b style={{ fontSize: '12px' }}>ROUND OFF LESS</b></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><h6 style={{ fontSize: '12px', fontWeight: '600' }}>- {record?.round_off_value}</h6></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td style={{ fontSize: '12px', textAlign: 'right', fontWeight: '500' }}>Total</td>
                        <td></td>
                        <td></td>
                        <td style={{ fontSize: '12px', fontWeight: '600' }}>{parseFloat(record?.qty_total).toFixed(0)}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{ fontSize: '12px', fontWeight: '600' }}>₹ {formatAmounts(parseFloat(record?.grand_total))}</td>
                    </tr>
                </tfoot>
            </table>
        </BillTable>
    )
}

export default Table
