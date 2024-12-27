import React from 'react'
import Flex from '../../../Components/Flex';
import styled from 'styled-components';
import { Row } from '../../../Components/Row';
import { Col } from 'antd';
import { Table } from '../../../Components/Table';

export const TotalStyle = styled.div`
margin: 20px 40px;
& h1 {
    font-size: 18px;
    color: #000;
    text-transform: capitalize;
    margin-bottom: 20px;
    & span {
        font-size: 18px;
        color: #0d5ed2;
    }
}
@media screen and (max-width: 500px) {
    margin: 20px;
}
`

const ViewStatuseEntry = ({ datas }) => {

    console.log(datas, 'datas');

    const Items = [
        {
            title: 'SI NO',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'item_name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Unit',
            dataIndex: 'item_unit',
        },
    ]

    return (
        <TotalStyle>
            <Row>
                <Col span={24} md={12}> <Flex><h1>site name : <span>{datas?.site_name} </span></h1></Flex> </Col>
                <Col span={24} md={12}> <Flex><h1>Date : <span>{datas?.date} </span></h1></Flex> </Col>
                <Col span={24} md={12}> <Flex><h1>Status : <span>{datas?.status} </span></h1></Flex> </Col>
                <Col span={24} md={12}> <Flex><h1>user name : <span>{datas?.user_name} </span></h1></Flex> </Col>
                <Col span={24} md={24}> <Flex><h1>material recovery date : <span>{datas?.material_recovery_date} </span></h1></Flex> </Col>
            </Row>
            <Table columns={Items} data={datas?.sales || []} />
        </TotalStyle>
    )
}

export default ViewStatuseEntry