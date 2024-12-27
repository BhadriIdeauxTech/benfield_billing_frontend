import React from 'react'
import { Col } from 'antd'
import { Row } from '../../../../Components/Row'
import { CardDesign } from '../../SaleReport/Partials/Style'

const CardPayment = () => {
    const CardData = [
        {
            key: '1',
            card: 'PAID',
            amount: '₹ 1000'
        },
        {
            key: '2',
            card: 'UNPAID',
            amount: '₹ 0',
        },
        {
            key: '3',
            card: 'TOTAL',
            amount: '₹ 1000.00',
        },
    ]
    return (
        <div>
            <Row gutter={[24, 24]}>
                {
                    CardData.map(({ card, bg, amount }, i) => (
                        <Col span={24} md={6} key={i}>
                            <CardDesign className={[card === 'PAID' && 'green', card === 'UNPAID' && 'red', card === 'TOTAL' && 'yellow']}>

                                <h5>{card}</h5>
                                <h4> {amount}</h4>
                            </CardDesign>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default CardPayment