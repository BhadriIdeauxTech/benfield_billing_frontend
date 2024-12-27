import React, { useEffect, useState } from 'react'
import { Form, Col, Typography } from 'antd'
import Input from '../../../Components/Form/Input'
import { FormCard, FormHeading } from '../Styles'
import { Row } from '../../../Components/Row'
import Flex from '../../../Components/Flex'
import { Select } from '../../../Components/Form/Select'
import Button from '../../../Components/Form/Button'
import { useForm } from 'antd/es/form/Form'
import { TopTitle } from '../../../Components/Form/TopTitle'
import request from '../../../utils/request'
import { CustomInputNumber } from '../../../Components/Form/CustomInputNumber'
import { PanelTable } from './PanelTable'
import { toast } from 'react-toastify'

export const PanelContent = ({ updateTable, deleteTable, getPanel, deleteTableData, }) => {

    const [form] = useForm();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [products, setProducts] = useState([]);
    const [availableQty, setAvailableQty] = useState(null);
    const [unit, setUnit] = useState(null);
    const [id, setId] = useState(null)
    const [check, setCheck] = useState(1)
    const [panelName, setPanelName] = useState(null)

    const GetAllProducts = () => {
        request.get('panel/products_for_panel')
            .then(function (response) {
                setProducts(response.data.item)

            })
            .catch(function (error) {
                console.log(error, 'Axios error');
            });
    }
    console.log(products, 'products');
    // initial render
    useEffect(() => {
        deleteTable()
    }, [])

    useEffect(() => {
        GetAllProducts();
    }, [check])



    // options to select product
    const itemNames = products.map(item => item.item_name);
    const options = itemNames.map(item => {
        return {
            value: item,
            label: item.charAt(0).toUpperCase() + item.slice(1)
        };
    });

    //  to Get Current Date
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });


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


    // handle clear button
    const handleClear = () => {
        form.resetFields()
    }


    // handle product Select
    const handleSelect = (value) => {
        const items = products.find(item => item.item_name === value)
        return (
            // setAvailableQty(items.avilable_qty),
            // setUnit(items.item_unit),
            setId(items.id),
            form.setFieldsValue({ available_quantity: items.avilable_qty }),
            form.setFieldsValue({ unit: items.item_unit })
        )
    }


    // console.log(availableQty, 'availableQtyavailableQty')


    // useEffect(() => {
    //     if(availableQty){
    //         form.setFieldsValue({ available_quantity: availableQty })
    //     form.setFieldsValue({ unit: unit })
    //     }
    //     // form.setFieldsValue({ product_hsn: hsn })
    // }, [availableQty])




    // /reset all
    const resetForm = () => {
        form.resetFields()
    }

    const handlePanel = (val) => {
        setPanelName(form.getFieldValue('panel_name'))
    }

    const handleFinish = (values) => {

        const avlQty = form.getFieldValue('available_quantity')
        const reqQty = form.getFieldValue('required_quantity')

        try {
            const check = form.getFieldValue('select_product')
            const alreadyPresent = getPanel.filter(item => item.select_product === check).length > 0;
            if (alreadyPresent) {
                toast.error('Product already added')
                form.setFieldsValue({ select_product: null, available_quantity: null, required_quantity: null, unit: null });
            } else {
                if (reqQty > avlQty) {
                    toast.error('Required Quantity Execces Available Quantity')
                    form.setFieldsValue({required_quantity: null} )
                }
                else {
                    const toDispatch = {
                        available_quantity: values.available_quantity,
                        panel_gst: values.panel_gst,
                        panel_name: values.panel_name,
                        panel_quantity: values.panel_quantity,
                        panel_sale_price: values.panel_sale_price,
                        panel_unit: values.panel_unit,
                        required_quantity: values.required_quantity,
                        select_product: values.select_product,
                        panel_hsn: values.panel_hsn,
                        unit: values.unit,
                        id: id,
                    }
                    updateTable(toDispatch)
                    form.setFieldsValue({ select_product: null, available_quantity: null, required_quantity: null, unit: null });
                }
            }

        } catch (error) {
            console.log('Error:', error)
        }

    }


    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };
    // console.log(products, 'products')

    return (
        <div>
            <Flex flexEnd>
                <Col>
                    <h3>Date : {formattedDate}</h3>
                </Col>
            </Flex>
            <Form
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
                onFinishFailed={onFinishFailed}
            >
                <Row gutter={[24, 24]}>
                    <Col span={24} md={12}>
                        <Input label={'Panel Name'} placeholder={'Panel Name'} name={'panel_name'} onChange={handlePanel}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter details!',
                                },
                            ]} />
                    </Col>
                    <Col span={24} md={12}>

                        <CustomInputNumber label={'Panel Quantity'} placeholder={'Panel Quantity'} name={'panel_quantity'} precision={2}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter details!',
                                },
                            ]}
                        />

                    </Col>
                    <Col span={24} md={12}>

                        <Select options={UnitOptions} placeholder={'Panel Unit'} label={'Panel Unit'} name={'panel_unit'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter details!',
                                },
                            ]} />
                    </Col>
                    <Col span={24} md={12}>

                        <CustomInputNumber label={'Panel Sale Price'} placeholder={'Panel Sale price'} name={'panel_sale_price'} precision={2}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter details!',
                                },
                            ]}
                        />

                    </Col>
                    <Col span={24} md={12}>
                        <Select options={GstOptions} placeholder={'select gst'} label={'Panel GST'} name={'panel_gst'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter details!',
                                },
                            ]} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'Panel HSN'} placeholder={'Panel hsn'} name={'panel_hsn'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter details!',
                                },
                            ]} />
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

            <PanelTable panelName={panelName} setCheck={setCheck} resetForm={resetForm} getPanel={getPanel} updateTable={updateTable} deleteTable={deleteTable} deleteTableData={deleteTableData} />
        </div>


    )
}