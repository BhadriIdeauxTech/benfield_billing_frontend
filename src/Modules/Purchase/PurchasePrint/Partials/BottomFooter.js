import React from 'react'

import { Col } from 'antd'
import { ToWords } from 'to-words'
import { Row } from '../../../../Components/Row'
import Flex from '../../../../Components/Flex'
import { BottomFooterWrapper, Box } from '../../../ViewSaleBills/Partials/PrintContainer/style'

const BottomFooter = ({ record,grandtotalData }) => {

    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            currencyOptions: {
                // can be used to override defaults for the selected locale
                // name: 'Rupee',
                // plural: 'Rupees',
                symbol: '₹',
                fractionalUnit: {
                    name: 'Paisa',
                    plural: 'Paise',
                    symbol: '',
                },
            },
        },
    });

    const TotalConvert = toWords.convert(grandtotalData?.grand_total || 0, { currency: true });
    return (
        <BottomFooterWrapper >
            <Row>
                {/* <Col span={12}>
                    <Box>
                        <h5>Remarks:</h5>
                        <h5>PVC SQR RS,7/.</h5>
                    </Box>
                </Col> */}
                <Col span={24} md={24}>
                    <Box>
                        <Flex spaceBetween={'true'}>
                            <h6>Amount Chargeable (in words) </h6>
                            <h6>E. & O.E</h6>
                        </Flex>
                        <h4 style={{fontWeight:'bold'}}>{TotalConvert}</h4>
                    </Box>
                </Col>

                <Col span={24} md={12}>
                    <Box>
                        <h6 style={{ textDecoration: 'underline' }}>Declaration</h6>
                        <p>We declare that this invoice shows the actual price of
                            the goods described and that all particulars are true
                            and correct.</p>
                    </Box>
                </Col>
                <Col span={12}>
                    <Box>
                        <h5>COMPANY'S BANK DETAILS:</h5>
                        <div className='account_details_footer'>
                            <h3 className='account_label'>Bank Name</h3>
                            <span >:</span>&nbsp;&nbsp;
                            <h3 className='acount_value'>{record?.bank_name}</h3>
                        </div>
                        <div className='account_details_footer'>
                            <h3 className='account_label'>A/C HOLDER’S NAME</h3>
                            <span >:</span>&nbsp;&nbsp;
                            <h3 className='acount_value'>{record?.bank_account_name}</h3>
                        </div>
                        <div className='account_details_footer'>
                            <h3 className='account_label'>A/C NO</h3>
                            <span >:</span>&nbsp;&nbsp;
                            <h3 className='acount_value'>{record?.bank_account_number}</h3>
                        </div>
                        <div className='account_details_footer'>
                            <h3 className='account_label'>BRANCH  & IFS CODE</h3>
                            <span >:</span>&nbsp;&nbsp;
                            <h3 className='acount_value'>{record?.bank_branch} & {record?.ifsc_code}</h3>
                        </div>
                    </Box>
                </Col>
                <Col span={24} md={12} >
                    <Box top>
                        <Flex column={'true'} flexStart={'true'} H_100={'true'} gap={'25px'} style={{ marginBottom: '15px' }}>
                            <h5 style={{ textAlign: 'right' }}>Customer's Seal and Signature</h5>
                            <h4 style={{ textAlign: 'right' }}></h4>
                        </Flex>
                    </Box>
                </Col>
                <Col span={24} md={12}>
                    <Box top left>
                        <Flex column={'true'} spaceBetween={'true'} H_100={'true'} style={{ marginBottom: '10px' }} >
                            <h4 style={{ textAlign: 'right', fontWeight: 'bold' }}>{record?.business_name}</h4>
                            <h5 style={{ textAlign: 'right',marginBottom:'2px'  }}>Authorised Signatory</h5>
                        </Flex>
                    </Box>
                </Col>
            </Row>
        </BottomFooterWrapper>
    )
}

export default BottomFooter
