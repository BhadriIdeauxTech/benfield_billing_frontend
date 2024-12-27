import React, { useEffect, useState } from 'react'
import { Row } from '../../../../Components/Row'
import { Col } from 'antd'
import { CardDesign } from './Style'

const CardPayment = ({datas}) => {
    const SaleData = [
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
    const [dashData, setDashData] = useState(SaleData)

    useEffect(() => {

        setDashData((prevData) =>
            prevData.map((item) => {
                switch (item.card) {
                    case 'Paid':
                        return {
                            ...item,
                            amount: datas?.paid || 0,
                        };
                    case 'Un Paid':
                        return {
                            ...item,
                            amount: datas?.unpaid || 0,
                        };
                    case 'Total':
                        return {
                            ...item,
                            amount: datas?.total || 0,
                        };

                    default:
                        return item;
                }
            })
        );
       
    }, [datas])

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