import React, { Fragment, useEffect, useState } from 'react'
import { CustomCard } from '../../../../Components/CustomCard'
import { Row } from '../../../../Components/Row'
import { Col } from 'antd'
import Flex from '../../../../Components/Flex'
import Input from '../../../../Components/Form/Input'
import { Table } from '../../../../Components/Table'
import request from '../../../../utils/request'
import styled from 'styled-components'

const TableStyle = styled.div`
    width: 50%;
    margin: auto;
    @media screen and (max-width: 767px) {
        width: 90%;
    }
`

const ProductTable = () => {

    const URL = 'product/products_all_details'

    const [dataSource, setDataSource] = useState([]);

    const [searchText, setSearchText] = useState([]); // Use Search Bar

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const Getitems = () => {
        request.get(`${URL}`).then((response) => {
            setDataSource(response.data)
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        Getitems();
    }, [])

    const columns = [
        {
            title: 'SI NO',
            render: (value, item, index) => index + 1,

        },
        {
            title: 'Product Name',
            dataIndex: 'item_name',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.item_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.item_name).includes(value.toUpperCase());
            },
        },
    ]

    return (
        <Fragment>
            <Row>
                <Col span={24} md={12}>
                </Col>

                <Col span={24} md={12}>
                    <Flex end gap={'30px'}>
                        <Input
                            placeholder="Search by Product Name"
                            value={searchText}
                            onSearch={handleSearch}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </Flex>
                </Col>
            </Row><br />
            <CustomCard>
                <TableStyle>
                    <Table columns={columns} data={dataSource || []} />
                </TableStyle>
            </CustomCard>
        </Fragment>
    )
}

export default ProductTable