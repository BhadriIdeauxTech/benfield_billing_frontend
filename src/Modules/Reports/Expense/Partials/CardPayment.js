import React from 'react'
import { Col } from 'antd'
import { Row } from '../../../../Components/Row'
import { CardDesign } from '../../SaleReport/Partials/Style'
import request from '../../../../utils/request'
import { useEffect } from 'react'
import { useState } from 'react'

const CardPayment = ({Expensedata}) => {
   
    const CardData = [
        {
            key: '1',
            card: 'PAID',
            amount: ''
        },
        {
            key: '2',
            card: 'UNPAID',
            amount: '',
        },
        {
            key: '3',
            card: 'TOTAL',
            amount: '',
           
        },
    ]
    const [dashData, setDashData] = useState(CardData)
    useEffect(() => {

        setDashData((prevData) =>
            prevData.map((item) => {
                switch (item.card) {
                    case 'Paid':
                        return {
                            ...item,
                            amount: Expensedata?.paid || 0,
                        };
                    case 'Un Paid':
                        return {
                            ...item,
                            amount: Expensedata?.unpaid || 0,
                        };
                    case 'Total':
                        return {
                            ...item,
                            amount: Expensedata?.total || 0,
                        };

                    default:
                        return item;
                }
            })
        );
       
    }, [Expensedata])
    return (
        <div>
            <Row gutter={[24, 24]}>
                {
                    dashData.map((item, card,  i) => (
                        <Col span={24} md={6} key={i}>
                            <CardDesign style={{background:'#8056f7'}} className={[card === 'PAID' && 'green', card === 'UNPAID' && 'red', card === 'TOTAL' && 'yellow']}>
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