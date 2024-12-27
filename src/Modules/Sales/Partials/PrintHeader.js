import React from 'react'
import { Row } from '../../../Components/Row'
import { Col } from 'antd'
import Input from '../../../Components/Form/Input'
import { CustomDatePicker } from '../../../Components/Form/CustomDatePicker'

const PrintHeader = (props) => {

    const { setRefDate, setPrintDated, setDeliveryNoteDate } = props

    const handleReferenceOnChange = (date) => {
        setRefDate(date);
    };

    const handleDatedOnChange = (date)=>{
        setPrintDated(date)
    }

    const handleDeliveryDateOnChange = (date)=>{
        setDeliveryNoteDate(date)
    }
    // delivery_note = String
    // reference_no_new = String
    // ref_date = date
    // other_references = String
    // buyer_order_no = String
    // dated = date
    // dispatch_no = String
    // delivery_note_date = date
    // dispatch_through = String
    // destination = string
    // termsofdelivery = String

    return (
        <Row gutter={[14, 14]}>
            <Col span={24} sm={12}>
                <Input label={'Delivery Note'} name={'delivery_note'} placeholder={'Delivery Note'} />
            </Col>
            <Col span={24} sm={12}>
                <Input label={'Reference No'} name={'reference_no_new'} placeholder={'Reference No'} />
            </Col>
            <Col span={24} sm={12}>
                <CustomDatePicker label={'Reference Date'} onChange={handleReferenceOnChange} name={'ref_date'} />
            </Col>
            <Col span={24} sm={12}>
                <Input label={'Other References'} name={'other_references'} placeholder={'Other References'} />
            </Col>
            <Col span={24} sm={12}>
                <Input label={'Buyer’s Order No'} name={'buyer_order_no'} placeholder={'Buyer’s Order No'} />
            </Col>
            <Col span={24} sm={12}>
                <CustomDatePicker label={'Dated'} onChange={handleDatedOnChange} name={'dated'} />
            </Col>
            <Col span={24} sm={12}>
                <Input label={'Dispatch Doc No'} name={'dispatch_no'} placeholder={'Dispatch Doc No'} />
            </Col>
            <Col span={24} sm={12}>
                <CustomDatePicker label={'Delivery Note Date'} onChange={handleDeliveryDateOnChange} name={'delivery_note_date'} />
            </Col>
            <Col span={24} sm={12}>
                <Input label={'Dispatched through'} name={'dispatch_through'} placeholder={'Dispatched through'} />
            </Col>
            <Col span={24} sm={12}>
                <Input label={'Destination'} name={'destination'} placeholder={'Destination'} />
            </Col>
            <Col span={24} sm={12}>
                <Input label={'Terms Of Delivery'} name={'termsofdelivery'} placeholder={'Terms Of Delivery'} />
            </Col>
        </Row>
    )
}

export default PrintHeader
