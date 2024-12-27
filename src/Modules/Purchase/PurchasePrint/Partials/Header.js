import React from 'react'
import { Col } from 'antd'
import { Row } from '../../../../Components/Row';
import { Box, BoxHolder } from '../../../ViewSaleBills/Partials/PrintContainer/style';

const Headers = ({ data, record }) => {

    const PurchaseDate = record?.purchase_date ? new Date(record?.purchase_date).toLocaleDateString() : record?.purchase_date;
    return (
        <Row style={{ border: '1px solid' }}>
            <Col span={24} md={12}>
                <BoxHolder right>
                    <Row>
                        <Col span={24}>
                            <Box  >
                                <h5>{data?.business_name}</h5>
                                <p>{data?.address}</p>
                                {record?.tax_type === "GST" && <h6>GSTIN/UIN&nbsp;:&nbsp; {data?.gstin}</h6>}
                                <h6>State Name&nbsp;:&nbsp;Tamil Nadu, Code&nbsp;:&nbsp;{data?.state_code}</h6>
                                <h6>Contact&nbsp;:&nbsp;{data?.phone_no && `${data?.phone_no},`}{data?.phone_no2 && `${data?.phone_no2},`}{data?.landline && data?.landline}</h6>
                                <h6>E-Mail&nbsp;:&nbsp;{data?.email}</h6>
                            </Box>
                        </Col>
                    </Row>
                </BoxHolder>
            </Col>
            <Col span={24} md={12}>
                <BoxHolder>
                    <Row>
                        <Col span={24} md={24}>
                            <BoxHolder>
                                <Row>
                                    <Col span={12}>
                                        <Box right bottom>
                                            <h6>Invoice No.</h6>
                                            <h5>{record?.purchase_invoice_no}</h5>
                                        </Box>
                                    </Col>
                                    <Col span={12}>
                                        <Box bottom>
                                            <h6>Dated</h6>
                                            <h5>{PurchaseDate}</h5>
                                        </Box>
                                    </Col>
                                </Row>
                            </BoxHolder>
                        </Col>
                        <Col span={24} md={24}>

                            <Box >
                                <h6>Buyer (Bill to)</h6>
                                <h5>{record?.supplier_name}</h5>
                                <p>{record?.delivery_location}</p>
                                {record?.tax_type === "GST" && <h6>GSTIN/UIN&nbsp;:&nbsp; {record?.GSTIN}</h6>}
                                <h6>State Name&nbsp;:&nbsp;{record?.state_of_supply}</h6>
                            </Box>
                        </Col>
                    </Row>
                </BoxHolder>
            </Col>
        </Row>
    )
}

export default Headers
