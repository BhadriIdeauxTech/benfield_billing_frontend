import { Col, Form, Upload as Uploded } from 'antd'
import React, { useState } from 'react'
import Button from '../../../../Components/Form/Button';
import Flex from '../../../../Components/Flex';
import { Row } from '../../../../Components/Row';
import Input from '../../../../Components/Form/Input';
import { useSelector } from 'react-redux';
import request from '../../../../utils/request';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Select } from '../../../../Components/Form/Select';


export const AddItems = ({ setProduct, Itemdata, handleGetProduct }) => {

    const [form] = Form.useForm();
    const [negtiveData, setNegtiveData] = useState(false)

    const URL = 'product/items_entry_view'

    const onFinish = (values) => {
        if (Itemdata) {
            EditItems(values, Itemdata.id)
        }
        else {
            Addproduct(values)
        }
    };
    const onFinishFailed = (errorInfo) => {
        toast.warn("Please fill in all the required details !");
    };
    const member = useSelector(state => state);
    console.log(member)

    //================product-post=============================//

    const Addproduct = (values) => {
        request.post(`${URL}`, values)
            .then(function (response) {
                console.log(response);
                toast.success(" Successfully  Added Products")
                form.resetFields();
                setProduct();
            })
            .catch(function (error) {
                if (error.response && error.response.status === 400) {
                    if (error.response.data) {
                        if (error.response.data.item_name) {
                            toast.warn(error.response.data.item_name[0])
                        }
                        else {
                            toast.error("Faild")
                        }
                    }
                    else {
                        toast.error("Faild")
                    }

                }
                else if (error.response && error.response.status === 406) {
                    if (error.response.data) {
                        if (error.response.data.item_name) {
                            toast.warn('This Name Already Exists in Panel')
                        }
                        else {
                            toast.error("Faild")
                        }
                    }
                    else {
                        toast.error("Faild")
                    }

                }
                // else{
                //     toast.error('Failed')
                // }
            });
    }

    const gstoption = [
        { label: '12 %', value: '12' },
        { label: '18 %', value: '18' },
    ]

    const onReset = () => {
        form.resetFields();
        if (handleGetProduct) {
            handleGetProduct();
            form.resetFields();
        }
    }

    //=====================Edit-Item==========================//

    useEffect(() => {
        form.setFieldsValue(Itemdata)
    }, [Itemdata])


    const EditItems = (record, id) => {
        request.patch(`product/app_items/${id}`, record).then((response) => {
            handleGetProduct();
            toast("Successfully Updated the Product Details")
        }).catch(error => {
            console.log(error,'eeeeee')
            if (error.response && error.response.status === 400) {
                if (error.response.data) {
                    if (error.response.data.item_name) {
                        toast.warn(error.response.data.item_name[0])
                    }
                    else {
                        toast.error("Faild")
                    }
                }
                else {
                    toast.error("Faild")
                }

            }
            else if (error.response && error.response.status === 406) {
                if (error.response.data) {
                    if (error.response.data.item_name) {
                        toast.warn('This Name Already Exists in Panel')
                    }
                    else {
                        toast.error("Faild")
                    }
                }
                else {
                    toast.error("Faild")
                }
               

            }
        });

    }
    const UnitOptions = [
        {
            label: 'Nos',
            value: 'Nos',
        },
        {
            label: 'Box',
            value: 'Box',
        },
        {
            label: 'Pcs',
            value: 'Pcs',
        },
        {
            label: 'Kg',
            value: 'Kg',
        },
        {
            label: 'Litre',
            value: 'Litre',
        },
        {
            label: 'Mtr',
            value: 'Mtr',
        },
        {
            label: 'Grams',
            value: 'Grams',
        },
        {
            label: 'Bag',
            value: 'Bag',
        },
        {
            label: 'Botl',
            value: 'Botl',
        },
        {
            label: 'Bndl',
            value: 'Bndl',
        },
        {
            label: 'Can',
            value: 'Can',
        },
        {
            label: 'Coil',
            value: 'Coil',
        },
    ]

    const negativechange = (value) => {
        const Quantity = form.getFieldValue('avilable_qty')
        if (Quantity < 0) {
            setNegtiveData(true)
            toast.warning('Negative Value Not Accepted!')
        }
        else {
            setNegtiveData(false)
        }
    }

    const negativeBuyRatechange = (value) => {
        const Quantity = form.getFieldValue('buy_rate')
        if (Quantity < 0) {
            setNegtiveData(true)
            toast.warning('Negative Value Not Accepted!')
        }
        else {
            setNegtiveData(false)
        }
    }


    return (
        <Form
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            initialValues={{
                gst_percentage: '18'
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <Row gutter={[12, 12]}>
                <Col span={24} md={12}>

                    <Input label={'Item/Product Name & Brand Name'} placeholder={'Product Name'} name={'item_name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Product Name!',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <Input label={'HSN Code'} placeholder={'HSN code'} name={'item_hsn'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter HSN Code!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Select options={gstoption} label={'GST %'} name={'gst_percentage'} placeholder={'Percentage'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter GST!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Select options={UnitOptions} label={'Unit'} placeholder={'Unit'} name={'item_unit'}
                        rules={[
                            {
                                required: true,
                                message: 'This is required field!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Quantity'} placeholder={'Quantity'} name={'avilable_qty'}
                        onChange={negativechange} rules={[
                            {
                                required: true,
                                message: 'This is required field!',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <Input label={'Buy Rate'} placeholder={'Buy Rate'} name={'buy_rate'} onChange={negativeBuyRatechange}
                    />
                </Col>
            </Row>
            <Flex center gap={'20px'} style={{ margin: '20px 0px' }}>
                {Itemdata ? <Button.Primary text={'UPDATE'} htmlType={'submit'} disabled={negtiveData} /> : <Button.Primary text={'ADD'} htmlType={'submit'} disabled={negtiveData} />}
                <Button.Danger text={'RESET'} onClick={() => onReset()} />
            </Flex>
        </Form>

    )
}