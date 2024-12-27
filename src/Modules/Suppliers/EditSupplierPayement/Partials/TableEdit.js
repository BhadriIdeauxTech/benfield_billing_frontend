import React from 'react'
import { Modal } from '../../../../Components/Modal'
import Button from '../../../../Components/Form/Button'
import { useState } from 'react'
import { Col, Form, Modal as Modals } from 'antd'
import { Table } from '../../../../Components/Table'
import { Row } from '../../../../Components/Row'
import { Select } from '../../../../Components/Form/Select'
import Input from '../../../../Components/Form/Input'
import request from '../../../../utils/request'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import dayjs from 'dayjs';

const TableEdit = ({ setSupplier, getSupplier }) => {

    const [form] = Form.useForm();

    const URL = 'supplier/add_supplier/'
    const URLS = 'supplier/supplier_payments_view/'

    const [selectedSupplier, setSelectedSupplier] = useState({})

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onViewStudent = (record) => {
        setModalContent('gfdhfc');
        setModalTitle("View Details");
        showModal();
    }

    const onFinish = (values) => {
        let result = {
            id: values.supplier,
            payment_type: values.payment,
            // mobile_number: values.mobile_number,
        };
        Viewsupplier(result)

    };

    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };


    const Viewsupplier = (values) => {
        request.post(`${URLS}`, values)
            .then(function (response) {
                console.log(response);
                // getSupplier(values)
                GetSupplier();

                toast.success("Success")
                setDataSource(response.data)
                form.resetFields();
            })
            .catch(function (error) {
                console.log(error);
                toast.error("Faild")
            });
    }


    const SupplierMobiles = getSupplier.map(mob => ({ label: mob.mobile_number, value: mob.mobile_number }))

    const handleSelectedSupplier = (value) => {
        const SelectedSupplierDetails = getSupplier.find((mem) => mem.mobile_number === value)
        setSelectedSupplier(SelectedSupplierDetails);
    }


    useEffect(() => {
        GetSupplier();
    }, [])


    useEffect(() => {
        form.setFieldsValue({ supplier: selectedSupplier?.id })
        // form.setFieldsValue({ mobile_number: selectedSupplier.mobile_number })
    }, [selectedSupplier])

    const GetSupplier = (values) => {
        request.get(`${URL}`, values)
            .then(function (response) {
                setSupplier(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // ===========  Supplier MobileNumber Data =========

    const [tableData, setTableData] = useState();
    const [dataSource, setDataSource] = useState([])

    const option = [
        {
            label: 'Advanced',
            value: 'Advance'
        },
        {
            label: 'Credit',
            value: 'Credit'
        },
        {
            label: 'Debt',
            value: 'Debt'
        }
    ]
    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date) => {
                return dayjs(date).format('DD\\MM\\YYYY');
            },
        },
        {
            title: 'Supplier Name',
            dataIndex: 'supplier_name',
        },
        {
            title: 'Phone No',
            dataIndex: 'mob_no',
        },
        {
            title: 'Amount',
            dataIndex: 'amt',
        },
        // {
        //     title: 'Action',
        //     render: (record, i) => {
        //         console.log(record, 'ddddddddd')
        //         return (
        //             <>
        //                 <Flex spaceEvenly>
        //                     <Button.Success onClick={() => {
        //                         onEditStudent(record);
        //                     }} text={<EditOutlined />} />

        //                     <Button.Success text={<EyeOutlined />} onClick={() => {
        //                         onViewStudent(record);
        //                     }} />
        //                     {/* <Button.Danger text={<DeleteOutlined />} onClick={() => onDeleteStudent(record)} /> */}

        //                 </Flex>
        //             </>
        //         );
        //     },

        // }
    ]
    const onEditStudent = (record) => {
        setModalContent('gfdhfc');
        setModalTitle("View Details");
        showModal();
        // console.log(isModalOpen, 'called')
        // showModal();
        // setModalTitle("update");
        // setModalContent(<SupplierPayementDetails />);
    }
    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Row gutter={[12, 12]}>
                    <Col span={24} md={10}>
                        <Select options={option} name={'payment'} label={'Transaction'} placeholder={'Select'}
                            rules={[{
                                required: 'true',
                                message: 'Enter the details !'
                            }]} />
                    </Col>
                    <Col span={24} md={10}>
                        <Select options={SupplierMobiles} showSearch label={'Mobile Number'}
                            placeholder={'Select Number'} name={'mobile_number'}
                            onChange={handleSelectedSupplier}
                            rules={[
                                {
                                    required: true,
                                    message: 'Select Mobile Number !'
                                }
                            ]} />
                        <Input name={'supplier'} display={"none"}/>
                        {/* <Input name={'mobile_number'} display={"none"} /> */}

                    </Col>
                    <Col span={24} md={4}><br /><br />
                        <Button.Primary text={'Submit'} htmlType='submit' />
                    </Col>
                </Row>

            </Form>
            <br />
            <Table columns={columns} data={dataSource} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />

        </div>
    )
}

export default TableEdit