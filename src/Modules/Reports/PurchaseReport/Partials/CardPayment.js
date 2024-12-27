import React, { useEffect, useState } from 'react'
import { Col } from 'antd'
import { Row } from '../../../../Components/Row'
import { CardDesign } from '../../SaleReport/Partials/Style'


const CardPayment = ({ PassData }) => {
    const DefaultData = [
        {
            key: '1',
            card: 'Paid',
            amount: '10000',
        },
        {
            key: '2',
            card: 'Un Paid',
            amount: '10000',
        },
        {
            key: '3',
            card: 'Total',
            amount: '10000',
        },

    ]

    const [dashData, setDashData] = useState(DefaultData)

    useEffect(() => {

        setDashData((prevData) =>
            prevData.map((item) => {
                switch (item.card) {
                    case 'Paid':
                        return {
                            ...item,
                            amount: PassData?.paid || 0,
                        };
                    case 'Un Paid':
                        return {
                            ...item,
                            amount: PassData?.unpaid || 0,
                        };
                    case 'Total':
                        return {
                            ...item,
                            amount: PassData?.total || 0,
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
                    dashData.map((item, i, card) => (
                        <Col span={24} md={6} key={i}>
                            <CardDesign style={{background:'#0d5ed2'}} className={[card === 'PAID' && 'green', card === 'UNPAID' && 'red', card === 'TOTAL' && 'yellow']}>
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