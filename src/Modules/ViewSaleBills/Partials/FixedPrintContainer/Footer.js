import React from 'react'
import { Box, BoxHolder, FooterWrapper } from './style'
import Flex from '../../../../Components/Flex'
import { ToWords } from 'to-words';
import { Row } from '../../../../Components/Row';
import { Col } from 'antd';
import BottomFooter from './BottomFooter';


const Footer = ({ record,data }) => {

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

    const TotalConvert = toWords.convert(record?.grand_total, { currency: true });
    const TotalTaxConvert = toWords.convert(record?.tax_total, { currency: true });
    const formattedNoTaxAmt = record?.sub_total - record?.tax_total;

    const TotalGST = (val1, val2) => {
        let total = (parseFloat(val1) || 0) + (parseFloat(val2) || 0);
        return total?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    const AllTotalGST = (val1, val2, val3, val4) => {
        let total = (parseFloat(val1) || 0) + (parseFloat(val2) || 0) + (parseFloat(val3) || 0) + (parseFloat(val4) || 0);
        return total?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    const formatAmounts = (amount) => {
        return amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return (
       <>
        <FooterWrapper>
            <Box bottom style={{height:'auto'}}>
                <Flex spaceBetween={'true'}>
                    <h6>Amount Chargeable (in words) </h6>
                    <h6>E. & O.E</h6>
                </Flex>

                <h4>INR {TotalConvert}</h4>
            </Box>

            <Row>
                <Col span={24} md={10}>
                    <Row>
                        <Col span={24}>
                            <Box right>
                                <h6 style={{ textAlign: 'right', marginBottom: '1px' }}>Taxable</h6>
                            </Box>
                        </Col>
                        <Col span={24}>
                            <Box right bottom>
                                <h6 style={{ textAlign: 'right' }}>Value</h6>
                            </Box>
                        </Col>
                        {/* <Col span={24}>
                            <Box right bottom>
                                <h5 style={{ textAlign: 'right' }}>Total: &nbsp;&nbsp;&nbsp;&nbsp;{formatAmounts(formattedNoTaxAmt)}</h5>
                            </Box>
                        </Col> */}
                    </Row>
                </Col>
                <Col span={24} md={14}>
                    <Row>
                        <Col span={9}>
                            <Row>
                                <Col span={24}>
                                    <Box bottom right><h6 style={{ textAlign: 'center' }}>CGST</h6></Box>
                                </Col>
                                <Col span={12}>
                                    <Box bottom right><h6 style={{ textAlign: 'center' }}>Rate</h6></Box>
                                </Col>
                                <Col span={12}>
                                    <Box bottom right><h6 style={{ textAlign: 'center' }}>Amount</h6></Box></Col>
                            </Row>
                        </Col>
                        <Col span={9}>
                            <Row>
                                <Col span={24}>
                                    <Box bottom right><h6 style={{ textAlign: 'center' }}>SGST/UTGST </h6></Box>
                                </Col>
                                <Col span={12}>
                                    <Box bottom right><h6 style={{ textAlign: 'center' }}>Rate</h6></Box>
                                </Col>
                                <Col span={12}>
                                    <Box bottom right><h6 style={{ textAlign: 'center' }}>Amount</h6></Box></Col>
                            </Row>
                        </Col>
                        <Col span={6}>
                            <Row>
                                <Col span={24}>
                                    <Box><h6 style={{ textAlign: 'center', marginBottom: '1px' }}>Total</h6></Box>
                                </Col>
                                <Col span={24}>
                                    <Box bottom><h6 style={{ textAlign: 'center' }}>Tax Amount</h6></Box>
                                </Col>
                                {/* <Col span={12}>
                                    <Box bottom right><h6 style={{ textAlign: 'center' }}>Amount</h6></Box></Col> */}
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <BoxHolder>
                        <Row>
                            <Col span={24} md={10}>
                                <Box right bottom flex>
                                    <h6 style={{ textAlign: 'right', alignSelf: 'end', width: '100%' }}>{formatAmounts(formattedNoTaxAmt)}</h6>
                                </Box>
                            </Col>
                            <Col span={24} md={14}>
                                <Row>
                                    {
                                        record?.total_cgst_12_percentage != 0 && record?.total_sgst_12_percentage != 0 && (
                                            <>
                                                <Col span={9}>
                                                    <Row>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{parseFloat(record?.total_cgst_12_percentage).toFixed(0)}%</h6>
                                                            </Box>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{formatAmounts(parseFloat(record?.total_cgst_12_amount))}</h6>
                                                            </Box>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col span={9}>
                                                    <Row>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{parseFloat(record?.total_sgst_12_percentage).toFixed(0)}%</h6>
                                                            </Box>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{formatAmounts(parseFloat(record?.total_sgst_12_amount))}</h6>
                                                            </Box>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col span={6}>
                                                    <Box right>
                                                        <h6 style={{ textAlign: 'right' }}>{formatAmounts(TotalGST(record?.total_cgst_12_amount, record?.total_sgst_12_amount))}</h6>
                                                    </Box>
                                                </Col>
                                            </>
                                        )
                                    }
                                    {
                                        record?.total_cgst_18_percentage != 0 && record?.total_sgst_18_percentage != 0 && (
                                            <>
                                                <Col span={9}>
                                                    <Row>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{parseFloat(record?.total_cgst_18_percentage).toFixed(0)}%</h6>
                                                            </Box>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{formatAmounts(parseFloat(record?.total_cgst_18_amount))}</h6>
                                                            </Box>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col span={9}>
                                                    <Row>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{parseFloat(record?.total_sgst_18_percentage).toFixed(0)}%</h6>
                                                            </Box>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{formatAmounts(parseFloat(record?.total_sgst_18_amount))}</h6>
                                                            </Box>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col span={6}>
                                                    <Box bottom>
                                                        <h6 style={{ textAlign: 'right' }}>{formatAmounts(TotalGST(record?.total_cgst_18_amount, record?.total_sgst_18_amount))}</h6>
                                                    </Box>
                                                </Col>
                                            </>
                                        )
                                    }

                                    {
                                        record?.total_igst_12_percentage != 0 && (
                                            <>
                                                <Col span={9}>
                                                    <Row>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ visibility: 'hidden' }}>.</h6>
                                                            </Box>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}></h6>
                                                            </Box>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col span={9}>
                                                    <Row>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{parseFloat(record?.total_igst_12_percentage).toFixed(0)}%</h6>
                                                            </Box>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{formatAmounts(parseFloat(record?.total_igst_12_amount))}</h6>
                                                            </Box>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col span={6}>
                                                    <Box bottom>
                                                        <h6 style={{ textAlign: 'right' }}>{formatAmounts(parseFloat(record?.total_igst_12_amount))}</h6>
                                                    </Box>
                                                </Col>
                                            </>
                                        )
                                    }

                                    {
                                        record?.total_igst_18_percentage != 0 && (
                                            <>
                                                <Col span={9}>
                                                    <Row>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ visibility: 'hidden' }}>.</h6>
                                                            </Box>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}></h6>
                                                            </Box>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col span={9}>
                                                    <Row>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{parseFloat(record?.total_igst_18_percentage).toFixed(0)}%</h6>
                                                            </Box>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Box right bottom>
                                                                <h6 style={{ textAlign: 'right' }}>{formatAmounts(parseFloat(record?.total_igst_18_amount))}</h6>
                                                            </Box>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col span={6}>
                                                    <Box bottom>
                                                        <h6 style={{ textAlign: 'right' }}>{formatAmounts(parseFloat(record?.total_igst_18_amount))}</h6>
                                                    </Box>
                                                </Col>
                                            </>
                                        )
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </BoxHolder>
                </Col>
                <Col span={24} md={10}>
                    <Box right bottom>
                        <h5 style={{ textAlign: 'right' }}>Total: &nbsp;&nbsp;&nbsp;&nbsp;{formatAmounts(formattedNoTaxAmt)}</h5>
                    </Box>
                </Col>
                <Col span={24} md={14}>
                    <Row>
                        <Col span={9}>
                            <Row>
                                <Col span={12}>
                                    <Box bottom right></Box>
                                </Col>
                                <Col span={12}>
                                    <Box bottom right> <h5 style={{ textAlign: 'right' }}>{AllTotalGST(parseFloat(record?.total_cgst_12_amount), parseFloat(record?.total_cgst_18_amount), 0, 0)}</h5></Box>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={9}>
                            <Row>
                                <Col span={12}>
                                    <Box bottom right></Box>
                                </Col>
                                <Col span={12}>
                                    <Box bottom right><h5 style={{ textAlign: 'right' }}>{AllTotalGST(parseFloat(record?.total_sgst_12_amount), parseFloat(record?.total_sgst_18_amount), parseFloat(record?.total_igst_12_amount), parseFloat(record?.total_igst_18_amount))}</h5></Box>
                                </Col>
                            </Row></Col>
                        <Col span={6}>
                            <Box bottom ><h5 style={{ textAlign: 'right' }}>{AllTotalGST(parseFloat(record?.total_sgst_18_amount), parseFloat(record?.total_sgst_18_amount), parseFloat(record?.total_igst_12_amount), parseFloat(record?.total_igst_18_amount))}</h5></Box>
                        </Col>
                    </Row>
                </Col>
            </Row>

          <Box>
          <div style={{
            display:'flex',gap:'10px'
           }}>
             <h6>Tax Amount (in words) :</h6>
             <h4>INR {TotalTaxConvert}</h4>
           </div>
          </Box>
        </FooterWrapper>
        {/* <BottomFooter data={data}/> */}
        </>
    )
}

export default Footer
