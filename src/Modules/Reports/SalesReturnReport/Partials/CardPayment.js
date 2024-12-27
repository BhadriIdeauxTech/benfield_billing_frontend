
import { Col } from 'antd'
import { Row } from '../../../../Components/Row'
import { CardDesign } from '../../SaleReport/Partials/Style'
import React, { useEffect, useState } from 'react'

const CardPayment = ({data}) => {
    
    const saleretunData = [
        {
            key: '1',
            card: 'Paid',
            amount: '',
        },
        {
            key: '2',
            card: 'Un Paid',
            amount: '₹',
        },
        {
            key: '3',
            card: 'Total',
            amount: '₹',
        },
    ]
    const [dashData, setDashData] = useState(saleretunData)

    useEffect(() => {

        setDashData((prevData) =>
            prevData.map((item) => {
                switch (item.card) {
                    case 'Paid':
                        return {
                            ...item,
                            amount: data?.paid || 0,
                        };
                    case 'Un Paid':
                        return {
                            ...item,
                            amount: data?.unpaid || 0,
                        };
                    case 'Total':
                        return {
                            ...item,
                            amount: data?.total || 0,
                        };

                    default:
                        return item;
                }
            })
        );
       
    }, [data])

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