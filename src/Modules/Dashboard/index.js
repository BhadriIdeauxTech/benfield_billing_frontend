import { Col } from 'antd'
import React from 'react'
import { Row } from '../../Components/Row'
import Cards_Dasboard from './Partials/Cards_Dasboard'
import Least_quantity from './Partials/Least_quantity'
import CustomerCredit from './Partials/CustomerCredit'
import { useEffect } from 'react'
import request from '../../utils/request'

const Dashboard = ({ setDashboard, getDash }) => {

    useEffect(() => {
        GetData();
    }, [])

    const URL = 'home/home_view/'
    const GetData = () => {
        request.get(`${URL}`)
            .then(function (response) {
                setDashboard(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <Cards_Dasboard getDash={getDash} />
            <br />
            <Row gutter={[12, 12]} style={{ margin: '30px 0' }}>
                <Col span={24}  lg={12}>
                    <CustomerCredit getDash={getDash} />
                </Col>
                <Col span={24} lg={12} >
                    <Least_quantity getDash={getDash} />
                </Col>

            </Row>


        </div>
    )
}
export default Dashboard