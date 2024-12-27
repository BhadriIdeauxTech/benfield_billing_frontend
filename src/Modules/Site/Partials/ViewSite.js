import { Col } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { CustomCard } from '../../../Components/CustomCard'
import Flex from '../../../Components/Flex'
import Button from '../../../Components/Form/Button'
import Input from '../../../Components/Form/Input'
import { Row } from '../../../Components/Row'
import { Table } from '../../../Components/Table'
import request from '../../../utils/request'
import ViewStatuseEntry from './ViewStatuseEntry'
import { Modal } from '../../../Components/Modal'
import { GrView } from 'react-icons/gr'
import { useSelector } from 'react-redux'

const ViewSite = () => {

    const navigate = useNavigate()

    const VIEW_URL = 'sales/add_sites/'

    const SITE_TABLE_VIEW = 'sales/add_sites_new_get/'

    const UserRole = useSelector((state) => state?.auth?.token?.role)
    const [dataSource, setDataSource] = useState([])
    const [searchText, setSearchText] = useState([]); // Use Search Bar

    //   ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const HandleNavigate = () => {
        navigate("/add_site")
    }

    useEffect(() => {
        if (UserRole === 'Site') {
            GetSiteTabledata()
        } else {
            GetTabledata()
        }
    }, [])

    const GetTabledata = () => {
        request
            .get(`${VIEW_URL}`)
            .then(function (response) {
                setDataSource(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const GetSiteTabledata = () => {
        request
            .get(`${SITE_TABLE_VIEW}`)
            .then(function (response) {
                setDataSource(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const ViewDetails = (record) => {
        setModalTitle("View Details");
        setModalContent(<ViewStatuseEntry datas={record} />);
        showModal();
    }
    console.log(dataSource, 'dataSource');


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
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Material Recovery Date',
            dataIndex: 'material_recovery_date',
        },

    ]


    if (UserRole === 'Admin') {
        columns.push({
            title: 'Action',
            render: (record) => {
                return (
                    <Flex center gap={'15px'}>
                        <Button.Success onClick={() => { ViewDetails(record) }} text={<GrView />} />
                    </Flex>
                );
            }
        });
    }

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
                        {UserRole !== 'GST-Admin' ?
                            <Button.Primary text={'+ ADD'} onClick={HandleNavigate} />
                            : null}
                    </Flex>
                </Col>
            </Row><br />
            <CustomCard>
                <Table columns={columns} data={dataSource || []} style={{ width: '500px' }} />
            </CustomCard>
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />

        </Fragment>
    )
}

export default ViewSite