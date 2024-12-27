import React from 'react'
import { useEffect } from 'react'
import { FormTitle } from '../../../../Components/Form/FormTitle'


const ParintTable = ({ componentRef, data, total }) => {

    useEffect(() => {
    }, [data])

    return (
        <div ref={componentRef} style={{ margin: '10px' }}>
            <br />
            <FormTitle Title={'purchase'} />
            <br />
            <table width={'100%'}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Invoice Number</th>
                        <th>Party</th>
                        <th>Payment Type</th>
                        <th>Amount</th>
                        <th>Balance Due</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td>{new Date(item.Date).toLocaleDateString('en-GB')}</td>
                            <td>{item.Invoice_No}</td>
                            <td>{item.Party_Name}</td>
                            <td>{item.Payment_Type}</td>
                            <td>{item.Amount}</td>
                            <td>{item.Balance_Due}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
        </div>
    )
}

export default ParintTable