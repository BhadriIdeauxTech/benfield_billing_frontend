import { Col, Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import { DashboardData } from '../../../Assets/DashboardData'
import Flex from '../../../Components/Flex'

import { Row } from '../../../Components/Row'
import { Cards } from './style'

const Cards_Dasboard = ({ getDash }) => {

    const [dashData, setDashData] = useState(DashboardData)

    useEffect(() => {

        setDashData((prevData) =>
            prevData.map((item) => {
                switch (item.h1) {
                    case 'Sales':
                        return {
                            ...item,
                            Amount: getDash?.today_sales_total || 0,
                            Total: getDash?.month_sales_total || 0,
                        };
                    case 'Sales Return':
                        return {
                            ...item,
                            Amount: getDash?.today_sales_return_total || 0,
                            Total: getDash?.month_sales_return_total || 0,
                        };
                    case 'Purchase':
                        return {
                            ...item,
                            Amount: getDash?.today_purchase_total || 0,
                            Total: getDash?.month_purchase_total || 0,
                        };
                    case 'Purchase Return':
                        return {
                            ...item,
                            Amount: getDash?.today_purchase_return_total || 0,
                            Total: getDash?.month_purchase_return_total || 0,
                        };
                    default:
                        return item;
                }
            })
        );

    }, [getDash])

    return (
        <div>
            <Row gutter={[16, 16]} >
                {dashData.map((item, i) => {
                    return (
                        <Col span={24} xs={24} sm={12} md={12} lg={6} key={i}>
                            <div >
                                <Cards>
                                    <Flex spaceBetween>
                                        <div>
                                            {item.icon}
                                        </div>
                                        <div >
                                            <h2>{item.Total}</h2>
                                            <p>{item.p}</p>

                                        </div>
                                    </Flex>
                                    <Flex spaceBetween>
                                        <h1 >{item.h1}</h1>
                                        <h4>{item.Amount}</h4>
                                    </Flex>
                                    <Flex end>
                                        <p>{item.heding}</p></Flex>
                                </Cards>
                            </div>
                        </Col>
                    )
                })}
            </Row>

        </div>
    )
}

export default Cards_Dasboard