import React from 'react'
import { useEffect } from 'react'
import { FormTitle } from '../../../../Components/Form/FormTitle'

const ParintTable = ({ componentRef, data, total }) => {

    useEffect(() => {
    }, [data])

    return (
        <div ref={componentRef} style={{ margin: '10px' }}>
            <br />
            <FormTitle Title={'Quotation'} />
            <br />
            <table width={'100%'}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Invoice Number</th>
                        {/* <th>Transaction Type</th>
                        <th>Payment Type</th> */}
                        <th>Amount</th>
                        {/* <th>Balance Due</th> */}

                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td>{new Date(item.invoice_date).toLocaleDateString('en-GB')}</td>
                            <td>{item.ref_no}</td>
                            {/* <td>{item.transaction_type}</td>
                            <td>{item.payment_type}</td> */}
                            <td>{item.grand_total}</td>
                            {/* <td>{item.balance_due}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />

        </div>
    )
}

export default ParintTable