import React from 'react'
import { Row } from '../../../../Components/Row'
import { Col } from 'antd'
import { Box, BoxHolder } from './style'

const Header = ({ data, record }) => {
    return (
        <Row >
            <Col span={24} md={12}>
                <BoxHolder right>
                    <Row>
                        <Col span={24}>
                            <Box bottom>
                                <h5>{data?.business_name}</h5>
                                <p>{data?.address}</p>
                                <h6>GSTIN/UIN&nbsp;:&nbsp;{data?.gstin}</h6>
                                <h6>State Name&nbsp;:&nbsp;Tamil Nadu, Code&nbsp;:&nbsp;{data?.state_code}</h6>
                                <h6>Contact&nbsp;:&nbsp;{data?.phone_no && `${data?.phone_no},`}{data?.phone_no2 && `${data?.phone_no2},`}{data?.landline && data?.landline}</h6>
                                <h6>E-Mail&nbsp;:&nbsp;{data?.email}</h6>
                            </Box>
                        </Col>
                        <Col span={24}>
                            <Box >
                                <h6>Buyer (Bill to)</h6>
                                <h5>{record?.company_name}</h5>
                                <p>{record?.delivery_location}</p>
                                <h6>GSTIN/UIN&nbsp;:&nbsp;{record?.GSTIN}</h6>
                                <h6>State Name&nbsp;:&nbsp;{record?.state_of_supply}</h6>
                            </Box>
                        </Col>
                    </Row>
                </BoxHolder>
            </Col>
            <Col span={24} md={12}>
                <BoxHolder>
                    <Row>
                        <Col span={12}>
                            <Box right bottom>
                                <h6>Invoice No.</h6>
                                <h5>{record?.invoice_no}</h5>
                            </Box>
                        </Col>
                        <Col span={12}>
                            <Box bottom>
                                <h6>Dated</h6>
                                <h5>{record?.invoice_date}</h5>
                            </Box>
                        </Col>

                        <Col span={12}>
                            <Box right bottom>
                                <h6>Delivery Note</h6>
                                <h5 style={{ padding: '5px' }}>{record?.delivery_note}</h5>
                            </Box>
                        </Col>
                        <Col span={12}>
                            <Box bottom>
                                <h6></h6>
                                <h5></h5>
                            </Box>
                        </Col>

                        <Col span={12}>
                            <Box right bottom>
                                <h6>Reference No. & Date.</h6>
                                <h5 style={{ padding: '5px' }}>{record?.reference_no_new}</h5>
                            </Box>
                        </Col>
                        <Col span={12}>
                            <Box bottom>
                                <h6>Other References</h6>
                                <h5>{record?.other_references}</h5>
                            </Box>
                        </Col>


                        <Col span={12}>
                            <Box right bottom>
                                <h6>Buyer’s Order No.</h6>
                                <h5 style={{ padding: '5px' }}>{record?.buyer_order_no}</h5>
                            </Box>
                        </Col>
                        <Col span={12}>
                            <Box bottom>
                                <h6>Dated</h6>
                                <h5>{record?.dated}</h5>
                            </Box>
                        </Col>

                        <Col span={12}>
                            <Box right bottom>
                                <h6>Dispatch Doc No.</h6>
                                <h5 style={{ padding: '5px' }}>{record?.dispatch_no}</h5>
                            </Box>
                        </Col>
                        <Col span={12}>
                            <Box bottom>
                                <h6>Delivery Note Date</h6>
                                <h5>{record?.delivery_note_date}</h5>
                            </Box>
                        </Col>

                        <Col span={12}>
                            <Box right bottom>
                                <h6>Dispatched through</h6>
                                <h5 style={{ padding: '5px' }}>{record?.dispatch_through}</h5>
                            </Box>
                        </Col>
                        <Col span={12}>
                            <Box bottom>
                                <h6>Destination</h6>
                                <h5>{record?.destination}</h5>
                            </Box>
                        </Col>
                        <Col span={12}>
                            <Box>
                                <h5 style={{ padding: '5px' }}></h5>
                            </Box>
                        </Col>
                    </Row>
                </BoxHolder>
            </Col>
        </Row>
    )
}

export default Header
