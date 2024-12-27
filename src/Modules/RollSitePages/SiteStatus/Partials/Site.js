import React, { Fragment, useEffect, useState } from 'react'
import { Row } from '../../../../Components/Row';
import { Col } from 'antd';
import Input from '../../../../Components/Form/Input';
import Flex from '../../../../Components/Flex';
import { CustomCard } from '../../../../Components/CustomCard';
import { Table } from '../../../../Components/Table';
import request from '../../../../utils/request';
import Button from '../../../../Components/Form/Button';

export const Site = () => {

    const [searchText, setSearchText] = useState([]); // Use Search Bar

    const VIEW_URL = 'sales/add_sites/'

    const [dataSource, setDataSource] = useState([])

    const handleSearch = (value) => {
        setSearchText(value);
    };

    useEffect(() => {
        request.get(`${VIEW_URL}`).then((response) => {
            setDataSource(response.data)
        }).catch(error => {
            console.log(error);
        });
    }, [])

    console.log(dataSource,'hfdata');

    const columns = [
        {
            title: 'SI NO',
            render: (value, item, index) => index + 1,

        },
        {
            title: 'Site Name',
            dataIndex: 'site_name',
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value, record) => {
                return String(record.site_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.site_name).includes(value.toUpperCase());
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
                            placeholder="Search by Site Name"
                            value={searchText}
                            onSearch={handleSearch}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        {/* <Button.Primary text={'+ ADD'} onClick={HandleNavigate} /> */}
                    </Flex>
                </Col>
            </Row><br />
            <CustomCard>
                <Table columns={columns} data={dataSource || []} style={{ width: '500px' }} />
            </CustomCard>

        </Fragment>
    )
}
