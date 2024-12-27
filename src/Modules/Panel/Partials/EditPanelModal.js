import React, { useEffect, useRef } from 'react'
import { Form, Col, Tooltip } from 'antd'
import Input from '../../../Components/Form/Input'
import { FormBottom, FormCard, FormHeading } from '../Styles'
import { Row } from '../../../Components/Row'
import Flex from '../../../Components/Flex'
import { Select } from '../../../Components/Form/Select'
import Button from '../../../Components/Form/Button'
import { useForm } from 'antd/es/form/Form'
import request from '../../../utils/request'
import { CustomInputNumber } from '../../../Components/Form/CustomInputNumber'
import { useState } from 'react'
import { Table } from '../../../Components/Table'
import { DeleteOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'


export const EditPanelModal = ({ data, close }) => {

    const [form] = useForm();
    const [products, setProducts] = useState([]);
    const [availableQty, setAvailableQty] = useState('');
    const [unit, setUnit] = useState('');
    const [hsn, setHsn] = useState('')
    const [tData, setTData] = useState([])
    const [fData, setFData] = useState(null)
    const panelId = data.id;


    useEffect(() => {
        form.setFieldsValue(data)
        setTData(data.panel)
    }, [data]);


    const GetAllProducts = () => {
        request.get('panel/products_for_panel')
            .then(function (response) {
                setProducts(response.data.item)
            })
            .catch(function (error) {
                console.log(error, 'Axios error');
            });
    }

    useEffect(() => {
        GetAllProducts();
    }, [])

    // options to select product
    const itemNames = products.map(item => item.item_name);
    const options = itemNames.map(item => {
        return {
            value: item,
            label: item.charAt(0).toUpperCase() + item.slice(1)
        };
    });

    // form handle finish
    const handleFinish = (value) => {

        const avlQty = form.getFieldValue('available_quantity')
        const reqQty = form.getFieldValue('required_quantity')

        const check = form.getFieldValue('select_product')
        const alreadyPresent = tData.filter(item => item.item_name === check).length > 0;

        if (alreadyPresent) {
            toast.error('Product already added')
            form.setFieldsValue({ select_product: null, available_quantity: null, required_quantity: null, unit: null });
        } else {
            if (reqQty > avlQty) {
                toast.error('Required Quantity Execces Available Quantity')
                form.setFieldsValue({required_quantity: null} )
            }
            else{
                const updateData = {
                    item_name: value.select_product,
                    take_qty: value.required_quantity,
                    item_unit: value.unit,
                    previous_qty: value.available_quantity
                }
                const add = [...tData, updateData]
                setTData(add)
                setFData(value)
                form.setFieldsValue({ select_product: null, available_quantity: null, required_quantity: null, unit: null });
            }
        }
    }


    // options to select unit
    const UnitOptions = [
        { value: 'Kg', label: 'Kg' },
        { value: 'Litre', label: 'Litre' },
        { value: 'Nos', label: 'Nos' },
        { value: 'Metre', label: 'Metre' },
        { value: 'Grams', label: 'Grams' },
        { value: 'Bag', label: 'Bag' },
        { value: 'Botl', label: 'Botl' },
        { value: 'Box', label: 'Box' },
        { value: 'Bndl', label: 'Bndl' },
        { value: 'Can', label: 'Can' },
        { value: 'Pcs', label: 'Pcs' },
        { value: 'Coil', label: 'Coil' },
    ];

    // options to select gst
    const GstOptions = [
        { value: '12', label: '12%' },
        { value: '18', label: '18%' },
    ];


    // onChange for selected product
    const handleSelect = (value) => {
        const items = products.find(item => item.item_name === value)
        return (
            form.setFieldsValue({ available_quantity: items.avilable_qty }),
            form.setFieldsValue({ unit: items.item_unit })
        )
    }

    const handleClear = () => {
        form.resetFields()
    }

    const columns = [
        {
            title: 'S.No',
            dataIndex: 's_no',
            render: (text, record, rowIndex) => rowIndex + 1,

        },
        {
            title: 'Product Name',
            dataIndex: 'item_name',
            key: 'item_name',
        },
        {
            title: 'Take Quantity',
            dataIndex: 'take_qty',
            key: 'take_qty',
        },
        {
            title: 'Available Quantity',
            dataIndex: 'previous_qty',
            key: 'previous_qty',
        },
        {
            title: 'Unit',
            dataIndex: 'item_unit',
            key: 'item_unit',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (

                <Tooltip title={'Delete'} >
                    <DeleteOutlined onClick={() => deleteTableRow(index)} />
                </Tooltip>

            ),
        },
    ];

    // to delete table row
    const deleteTableRow = (value) => {
        const deleteRow = [...tData]
        deleteRow.splice(value, 1)
        setTData(deleteRow)
    }


    const handleSubmit = () => {

        const lll = form.getFieldsValue();
        const sendData = {
            item_name: lll.item_name,
            item_unit: lll.item_unit,
            buy_rate: lll.buy_rate,
            gst_percentage: lll.gst_percentage,
            avilable_qty: lll.avilable_qty,
            item_hsn: lll.item_hsn,
            panel: tData.map((value, index) => {

                return {
                    item: value.item,
                    item_name: value.item_name,
                    item_unit: value.item_unit,
                    previous_qty: value.previous_qty,
                    take_qty: value.take_qty
                }
            })
        }


        if (tData.length === 0) {
            toast.error('Please fill the table')
        } else {
            setFData(form.getFieldsValue())
            request.put(`panel/panels_edit/${panelId}`, sendData)
                .then(resp => {

                    toast.success('Success')
                    close()
                })
                .catch(error => {
                    if (error.message === 'Request failed with status code 400') {
                        toast.error('panel details with this item name already exists.')
                    }
                })
           
        }
    }


    return (
        <>

            <FormCard>
                <Form
                    // ref={refff}
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        // available_quantity: ''
                    }}
                    onFinish={handleFinish}
                >
                    <Row gutter={[24, 24]}>
                        <Col span={24} md={12}>
                            <Input label={'Panel Name'} placeholder={'Panel Name'} name={'item_name'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} />
                        </Col>
                        <Col span={24} md={12}>

                            <CustomInputNumber label={'Panel Quantity'} placeholder={'Panel Quantity'} name={'avilable_qty'} precision={2}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]}
                            />

                        </Col>
                        <Col span={24} md={12}>

                            <Select options={UnitOptions} placeholder={'Panel Unit'} label={'Panel Unit'} name={'item_unit'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} />
                        </Col>
                        <Col span={24} md={12}>

                            <CustomInputNumber label={'Panel Sale Price'} placeholder={'Panel Sale price'} name={'buy_rate'} precision={2}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]}
                            />

                        </Col>
                        <Col span={24} md={12}>
                            <Select options={GstOptions} placeholder={'select gst'} label={'Panel GST'} name={'gst_percentage'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} />
                        </Col>
                        <Col span={24} md={12}>
                            <Input label={'Panel HSN'} placeholder={'Panel hsn'} value={hsn} name={'item_hsn'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter details!',
                                },
                            ]}
                             />
                        </Col>

                    </Row>

                    <Row gutter={[24, 24]}>
                        <Col span={24} md={12}>
                            <Select options={options} placeholder={'Search Product'} label={'Select Product'} name={'select_product'} showSearch={true}
                                onChange={(value) => handleSelect(value)}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} />
                        </Col>

                        <Col span={24} md={12}>
                            <Input label={'Available Quantity'} value={availableQty} disabled={true} name={'available_quantity'} />
                        </Col>
                        <Col span={24} md={12}>

                            <CustomInputNumber label={'Required Quantity'} placeholder={'Required Quantity'} name={'required_quantity'} precision={2}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]}
                            />

                        </Col>
                        <Col span={24} md={12}>
                            <Input label={' Unit'} value={unit} disabled={true} name={'unit'} />
                        </Col>
                        <Col>

                        </Col>
                    </Row>

                    <Flex gap={'20px'} center >
                        <Button.Success text={'ADD'} htmlType={'submit'} />
                        <Button.Danger text={'CLEAR'} onClick={handleClear} />
                    </Flex>
                </Form>
            </FormCard>
            <Table columns={columns} data={tData} />
            <FormBottom>

                <Button.Success text={'SUBMIT'} htmlType={'submit'} onClick={handleSubmit} />

                <Button.Danger text={'CLEAR TABLE'} onClick={() => setTData([])} />

            </FormBottom>

        </>
    )
}


