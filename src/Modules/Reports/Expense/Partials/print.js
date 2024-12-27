import { Col, Input } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { Row } from '../../../../Components/Row'
import Label from '../../../../Components/Form/Label'
import { FormTitle } from '../../../../Components/Form/FormTitle'
import Flex from '../../../../Components/Flex'




const ParintTable = ({ componentRef, data, total }) => {

    // var tableStyle = {
    //     "border": "1px solid black"
    //  };

    useEffect(() => {
    }, [data])

    return (
        <div ref={componentRef} style={{ margin: '10px' }}>
            <br />
            <Row>
                <Col span={24} md={12}><FormTitle Title={'Expense'} /></Col>
                <Col span={24} md={12}>
                    <Label>Total :</Label>
                    <Input value={total} /></Col>
            </Row>
            <br />
            <table width={'100%'}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Expense Name</th>
                        <th>Expense Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td>{new Date(item.Date).toLocaleDateString('en-GB')}</td>
                            <td>{item.expense_name}</td>
                            <td>{item.expense_amount}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            {/* <Row>
                <Col span={24} md={12}></Col>
                <Label>Total Amount</Label>
                <Col span={24} md={12}> <Input  /></Col>
            </Row> */}
        </div>
    )
}

export default ParintTable