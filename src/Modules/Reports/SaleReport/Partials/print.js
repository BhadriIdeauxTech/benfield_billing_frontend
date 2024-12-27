import { Col, Input } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { Row } from '../../../../Components/Row'
import Label from '../../../../Components/Form/Label'
import { FormTitle } from '../../../../Components/Form/FormTitle'
import Flex from '../../../../Components/Flex'




const ParintTable = ({ componentRef, data, total }) => {

    useEffect(() => {
    }, [data])

    return (
        <div ref={componentRef} style={{ margin: '10px' }}>
            <br />
            <FormTitle Title={'Sales'} />
            <br />
            <table width={'100%'}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Invoice Number</th>
                        <th>Payment Type</th>
                        <th>Amount</th>
                        <th>Balance Due</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td>{new Date(item.invoice_date).toLocaleDateString('en-GB')}</td>
                            <td>{item.invoice_no}</td>
                            <td>{item.payment_type}</td>
                            <td>{item.grand_total}</td>
                            <td>{item.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
        </div>
    )
}

export default ParintTable