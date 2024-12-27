import React from 'react'
import { Col, Form } from 'antd'
import { CardDesign } from './Style'
import { Row } from '../../../Components/Row'
import { useEffect } from 'react'
import { useState } from 'react'

const CardPayment = ({ PassData, selectedSupplier }) => {


    const DefaultData = [
        {
            key: '1',
            card: 'Sales',
            amount: 'purchase_amount',
        },
        {
            key: '2',
            card: 'Sales Return',
            amount: '',
        },
        {
            key: '3',
            card: 'Purchase',
            amount: '',
        },
        {
            key: '4',
            card: 'Purchase Return',
            amount: '',
        },
        {
            key: '5',
            card: 'Estimate Sales',
            amount: '',
        },
        {
            key: '6',
            card: 'Estimate Sales Return',
            amount: '',
        },
        {
            key: '7',
            card: 'Estimate Purchase',
            amount: '',
        },
        {
            key: '8',
            card: 'Estimate Purchase Return',
            amount: '',
        },

    ]

    const [dashData, setDashData] = useState(DefaultData)

    useEffect(() => {

        setDashData((prevData) =>
            prevData.map((item) => {
                switch (item.card) {
                    case 'Sales':
                        return {
                            ...item,
                            amount: PassData?.sales_amount || 0,
                        };
                    case 'Expense':
                        return {
                            ...item,
                            amount: PassData?.expense_amount || 0,
                        };
                    case 'Sales Return':
                        return {
                            ...item,
                            amount: PassData?.sales_return_amount || 0,
                        };
                    case 'Purchase':
                        return {
                            ...item,
                            amount: PassData?.purchase_amount || 0,
                        };
                    case 'Purchase Return':
                        return {
                            ...item,
                            amount: PassData?.purchase_return_amount || 0,
                        };
                    case 'Estimate Sales':
                        return {
                            ...item,
                            amount: PassData?.estimatesales_amount || 0,
                        };
                    case 'Estimate Sales Return':
                        return {
                            ...item,
                            amount: PassData?.estimatesales_return_amount || 0,
                        };
                    case 'Estimate Purchase':
                        return {
                            ...item,
                            amount: PassData?.estimatepurchase_amount || 0,
                        };
                    case 'Estimate Purchase Return':
                        return {
                            ...item,
                            amount: PassData?.estimatepurchase_return_amount || 0,
                        };

                    default:
                        return item;
                }
            })
        );


    }, [PassData])

    return (
        <div>
            <Row gutter={[24, 24]}>
                {
                    dashData.map((item, i) => (
                        <Col span={24} md={12} lg={6} key={i}>
                            <CardDesign >
                                <h5>{item.card}</h5>
                                <h4> {item.amount}</h4>
                            </CardDesign>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default CardPayment