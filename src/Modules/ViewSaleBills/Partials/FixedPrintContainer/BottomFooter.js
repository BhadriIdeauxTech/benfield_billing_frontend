import React from 'react'
import { BottomFooterWrapper, Box } from './style'
import { Row } from '../../../../Components/Row'
import { Col } from 'antd'
import Flex from '../../../../Components/Flex'

const BottomFooter = ({ data }) => {

    console.log(data);
    return (
        <BottomFooterWrapper>
            <Row>
                <Col span={24}>
                    <Box>
                        <h5>Remarks:</h5>
                        <h5>PVC SQR RS,7/.</h5>
                    </Box>
                </Col>
                <Col span={24} md={12}>
                    <Box>
                        <h6 style={{ textDecoration: 'underline' }}>Declaration</h6>
                        <p>We declare that this invoice shows the actual price <br/> of
                            the goods described and that all particulars are true <br/>
                            and correct.</p>
                    </Box>
                </Col>
                <Col span={24} md={12}>
                    <Box top left>
                        <Flex column={'true'} spaceBetween={'true'} H_100={'true'}>
                        <h4 style={{textAlign:'right'}}>{data?.business_name}</h4>
                        <h5 style={{textAlign:'right'}}>Authorised Signatory</h5>
                        </Flex>
                    </Box>
                </Col>
            </Row>
        </BottomFooterWrapper>
    )
}

export default BottomFooter
