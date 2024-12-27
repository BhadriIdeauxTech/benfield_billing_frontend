import { Col } from "antd"
import { Row } from "../../../../Components/Row"
import React from "react"

const CustomerView = ({record}) => {

  return (
    <div>
      <Row gutter={[24,24]}>
        <Col span={24} md={12}>
            <b>Customer Name</b> : {record.customer_name}
        </Col>
        <Col span={24} md={12}>
            <b>Date</b> : 21/04/2023 
        </Col>
        <Col span={24} md={12}>
            <b>Mobile Number</b> :  {record.mobile_number} 
        </Col>
        <Col span={24} md={12}>
            <b>Company Name</b> : {record.company_name} 
        </Col>
        <Col span={24} md={12}>
           <b>Advance Amount</b>  :{record.advance_amount} 
        </Col>
        <Col span={24} md={12}>
            <b>Amount Paid</b> : {record.amount_paid} 
        </Col>
        <Col span={24} md={12}>
           <b>Balance Amount</b> : {record.balance_amount} 
        </Col>
        <Col span={24} md={12}>
           <b>Email ID</b>  : {record.emailid} 
        </Col>
        <Col span={24} md={12}>
            <b>GST NO</b> : {record.gst} 
        </Col>
        <Col span={24} md={12}>
            <b>Address</b> : {record.address} 
        </Col>
      </Row>
    </div>
  )
}

export default CustomerView
