import React from 'react'
import {Cardsin, Maindesign } from './TableStyle'
import { InvoiceTitle } from '../../../Components/Form/FormTitle'
import Flex from '../../../Components/Flex'
import { Col, Divider, Table as Tables } from 'antd'
import { Row } from '../../../Components/Row'
import BillPrint from './BillPrint'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import Button from '../../../Components/Form/Button'
import { Fragment } from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'
import { PrintSubTitle, PrintTitle } from '../../../Components/Styled'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { FilePdfOutlined } from '@ant-design/icons'
import { PDFMaker } from './PDFMaker'

export const BillQuotationEstimate = ({ record, Company }) => {

    const [companyProfile, setCompanyProfile] = useState(Company)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const HeaderTable = () => {
        return (
            <Cardsin>
                <Row>
                    <Col span={24} md={12} style={{ borderRight: '1px solid', borderBottom: '1px solid', padding: '2px 10px' }}>

                        {/* <FormTitle Title={''} /> */}
                        <h5 style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}> {companyProfile.business_name}</h5>
                        <p style={{ fontSize: '12px', fontWeight: '500',textTransform: 'uppercase' }}>{companyProfile.address}</p>
                        <p style={{ fontSize: '12px', fontWeight: '500', }}>{companyProfile.phone_no} , {companyProfile.phone_no2}</p>
                        <p style={{ fontSize: '12px', fontWeight: '500', }}>E-Mail :&nbsp;{companyProfile.email}</p>
                        <p style={{ fontSize: '12px', fontWeight: '600',textTransform: 'uppercase' }}>GSTIN :&nbsp;<span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: '600' }}>{companyProfile.gstin}</span></p>

                    </Col>

                    <Col span={24} md={12} >
                        <Row>
                            <Col span={24} md={12} style={{ textAlign: 'center' }} >
                                <div style={{ borderRight: '1px solid', height: '100%' }}>
                                    <p style={{ fontSize: '12px', fontWeight: '500',textTransform: 'uppercase' }}>Invoice No.</p>
                                    <b style={{ fontSize: '14px', fontWeight: '600',textTransform: 'uppercase' }}>{record?.ref_no}</b>
                                </div>
                            </Col>
                            <Col span={24} md={12} style={{ textAlign: 'center' }}>
                                <div style={{ height: '100%' }}>
                                    <p style={{ fontSize: '12px', fontWeight: '500',textTransform: 'uppercase' }}>Dated</p>
                                    <b style={{ fontSize: '14px', fontWeight: '600', }}>{dayjs(record?.invoice_date).format("DD-MM-YYYY")}</b>
                                </div>
                            </Col>
                            <Col span={24} md={12} style={{ textAlign: 'center' }} >
                                <div style={{ borderRight: '1px solid', borderTop: '1px solid', height: '100%' }}>
                                    <p style={{ fontSize: '12px', fontWeight: '500',textTransform: 'uppercase' }}>Delivery Note</p>
                                    <br />
                                </div>
                            </Col>
                            <Col span={24} md={12} style={{ textAlign: 'center' }}>
                                <div style={{ borderTop: '1px solid', height: '100%' }}>
                                    <p style={{ fontSize: '12px', fontWeight: '500',textTransform: 'uppercase' }}>Mode/ Terms of Payments</p>
                                    <br />
                                </div>
                            </Col>
                            <Col span={24} md={12} style={{ textAlign: 'center' }} >
                                <div style={{ borderRight: '1px solid', borderTop: '1px solid', height: '100%' }}>
                                    <p style={{ fontSize: '12px', fontWeight: '500',textTransform: 'uppercase' }}>Supplier's ref</p>
                                    <br />
                                </div>
                            </Col>
                            <Col span={24} md={12} style={{ textAlign: 'center' }}>
                                <div style={{ borderTop: '1px solid', height: '100%' }}>
                                    <p style={{ fontSize: '12px', fontWeight: '500',textTransform: 'uppercase' }}>Other Reference</p>
                                    <br />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} md={12} style={{ borderRight: '1px solid', padding: '2px 10px' }}>

                        <h5 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Bill To :</h5>

                        <p style={{ fontSize: '12px', fontWeight: '500', textAlign: 'center',textTransform: 'uppercase' }}> {record.customer_name}</p>
                        <p style={{ fontSize: '12px', fontWeight: '500', textAlign: 'center',textTransform: 'uppercase' }}>{record.Address}</p>
                        <br />
                        <p style={{ fontSize: '12px', fontWeight: '600',textTransform: 'uppercase' }}>GSTIN :&nbsp;<span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: '600' }}>{record.GSTIN}</span></p>

                    </Col>

                    <Col span={24} md={12} >
                        <Row>
                            <Col span={24} md={12} style={{ textAlign: 'left' }} >
                                <div style={{ borderRight: '1px solid', borderTop: '1px solid', height: '100%', padding: '2px' }}>
                                    <p style={{ fontSize: '12px', fontWeight: '500',textTransform: 'uppercase' }}>Order No.</p>
                                    <br />
                                    {/* <p style={{ fontSize: '12px', fontWeight: '600', }}>Order No.</p> */}
                                </div>
                            </Col>
                            <Col span={24} md={12} style={{ textAlign: 'left' }}>
                                <div style={{ borderTop: '1px solid', height: '100%', padding: '2px' }}>
                                    <p style={{ fontSize: '12px', fontWeight: '500',textTransform: 'uppercase' }}>Dated</p>
                                    <br />

                                    {/* <p style={{ fontSize: '12px', fontWeight: '600', }}>Order No.</p> */}
                                </div>
                            </Col>
                            <Col span={24} md={24} style={{ textAlign: 'center' }} >
                                <div style={{ borderTop: '1px solid', height: '100%' }}>
                                    <p style={{ fontSize: '12px', fontWeight: '500',textTransform: 'uppercase' }}>Terms of Delivery</p>
                                </div>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Cardsin>
        )
    }

    const FooterComponent = () => {

        const formattedTotalAmount = record.grand_total.toLocaleString('en-In', { minimumFractionDigits: 2 });

        // const formattedTaxCGST = record.cgst.toLocaleString('en-In', { minimumFractionDigits: 2 });
        // const formattedTaxSGST = record.sgst.toLocaleString('en-In', { minimumFractionDigits: 2 });
        // const formattedTaxIGST = record.igst.toLocaleString('en-In', { minimumFractionDigits: 2 });

        // const savedAmount = record.discount_total.toLocaleString('en-In', { minimumFractionDigits: 2 });

        return (
            <div style={{ background: 'var(--light-color)', marginBottom: '0' }}>
                <Row gutter={[12, 12]}>
                    <Col span={24} md={12}>
                        <PrintTitle Size={'12px'} TextAlign={'left'} style={{textTransform: 'uppercase'}}>Amount Chargeable (in words)</PrintTitle>
                        <PrintTitle Size={'12px'} Weight={'600'} TextAlign={'left'} style={{ textTransform: 'uppercase' }}>INR {record?.gt_in_words} Only</PrintTitle>
                    </Col>
                    <Col span={24} md={12} style={{ justifyContent: 'end', display: 'flex', textAlign: 'end' }}>
                        <Col span={24} md={24}>
                            <Row gutter={[12, 12]}>

                                {/* <Col span={24} md={16}>
                                    <div>
                                        <PrintSubTitle Size={'12px'} Weight={'600'}>Less&nbsp;:&nbsp;&nbsp;Round Off&nbsp;:&nbsp;</PrintSubTitle><br />
                                    </div>
                                </Col>
                                <Col span={24} md={8}>
                                    <div>
                                        <PrintSubTitle Size={'12px'} Weight={'600'} >(-){formattedroundOff}</PrintSubTitle>
                                    </div>
                                </Col> */}
                            </Row><br />
                            <hr />
                            {/* 
                            <Row gutter={[12, 12]} style={{ justifyContent: 'end', display: 'flex', textAlign: 'end', alignItems: 'center' }}>
                                <Col span={24} md={8}><h2 style={{ fontSize: '15px' }}>Saved:</h2></Col>
                                <Col span={24} md={10}><h2 style={{ fontSize: '16px' }}>{savedAmount}</h2></Col>
                            </Row> */}
                            <Row gutter={[12, 12]} style={{ justifyContent: 'end', display: 'flex', textAlign: 'end', alignItems: 'center' }}>
                                <Col span={24} md={8}><h2 style={{ fontSize: '14px',textTransform: 'uppercase'}}>Total:</h2></Col>
                                <Col span={24} md={10}><h2 style={{ fontSize: '14px' }}><span style={{ fontFamily: 'monospace' }}>&#8377;</span>&nbsp;{formattedTotalAmount}</h2></Col>
                            </Row>
                        </Col>
                    </Col>
                </Row><br />
            </div >
        )
    }

    const BottomFooterComponent = () => {
        return (
            <div style={{ pageBreakInside: 'avoid', margin: '10px 0' }}>
                <FooterComponent />
                <Row gutter={[12, 12]}>
                    <Col span={24} md={12} ><PrintSubTitle Under Size={'12px'} Weight={'600'} style={{textTransform: 'uppercase'}}>Declaration</PrintSubTitle>
                        <PrintTitle Size={'12px'} style={{textTransform: 'uppercase'}}>We declare that this invoice shows the actual price of the <br />
                            goods described and that all particulars are true and correct</PrintTitle>
                    </Col>
                    <Col span={24} md={12}>
                        <PrintTitle Size={'14px'} style={{textTransform: 'uppercase'}}>Company's Bank Details</PrintTitle>
                        <Flex gap={'5px'}>
                            <div style={{ textAlign: 'start' }}>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintTitle Size={'14px'}  style={{textTransform: 'uppercase'}} >A/c Holder’s Name&nbsp;</PrintTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintTitle Size={'14px'}  style={{textTransform: 'uppercase'}}>Bank Name&nbsp;</PrintTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintTitle Size={'14px'}  style={{textTransform: 'uppercase'}}>A/c No.&nbsp;</PrintTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintSubTitle Size={'14px'}  style={{textTransform: 'uppercase'}} >Branch&nbsp;</PrintSubTitle>&nbsp;&&nbsp;
                                    <PrintSubTitle Size={'14px'}  style={{textTransform: 'uppercase'}}>IFS&nbsp;code&nbsp;</PrintSubTitle>
                                </div>
                                {/* <div style={{ textAlign: 'start' }}>
                                    <PrintSubTitle Size={'14px'} >SWIFT Code&nbsp;</PrintSubTitle>&nbsp;&&nbsp;
                                </div> */}
                            </div>
                            <div style={{ textAlign: 'start' }}>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintTitle Size={'14px'} UPPER Weight={'600'}  style={{textTransform: 'uppercase'}}>:&nbsp;&nbsp;{companyProfile.bank_account_name}</PrintTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintTitle Size={'14px'} UPPER Weight={'600'}  style={{textTransform: 'uppercase'}}>:&nbsp;&nbsp;{companyProfile.bank_name}</PrintTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintTitle Size={'14px'} UPPER Weight={'600'}  style={{textTransform: 'uppercase'}} >:&nbsp;&nbsp;{companyProfile.bank_account_number}</PrintTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintSubTitle Size={'14px'} UPPER Weight={'600'}  style={{textTransform: 'uppercase'}} >:&nbsp;&nbsp;{companyProfile.bank_branch}&nbsp;&</PrintSubTitle>
                                    <PrintSubTitle Size={'14px'} UPPER Weight={'600'}  style={{textTransform: 'uppercase'}}>&nbsp;{companyProfile.ifsc_code}</PrintSubTitle>
                                </div>
                                {/* <div style={{ textAlign: 'start' }}>
                                </div> */}
                            </div>
                        </Flex>
                    </Col>
                </Row>
                <div style={{ border: '1px solid', padding: '2px 10px', marginTop: '5px' }}>
                    <Row>
                        <Col span={12}><PrintSubTitle Size={'12px'} Weight={'600'}  style={{textTransform: 'uppercase'}}>Customer's Seal and Signature</PrintSubTitle></Col>
                        <Col span={12} style={{ textAlign: 'end',textTransform:'uppercase' }} ><b>for</b><PrintSubTitle Size={'14px'} Weight={'600'} UPPER> {companyProfile.business_name}</PrintSubTitle></Col>
                    </Row>
                    <PrintTitle Size={'14px'} TextAlign={'end'} MT={'30px'}  style={{textTransform: 'uppercase'}}>Authorised Signatory</PrintTitle>
                </div>
                <PrintTitle Size={'12px'} TextAlign={'center'}  style={{textTransform: 'uppercase'}} >This is a Computer Generated Invoice</PrintTitle>
            </div>
        )
    }
    return (
        <Fragment>
            <Flex gap={'20px'} centerVertically>
                <Button.Primary onClick={handlePrint} text={'Click To Print'} />
                <PDFDownloadLink fileName={`QuotationEst-${record?.company_name}${record?.invoice_date}`} document={<PDFMaker record={record} />}>
                    <FilePdfOutlined style={{ color: 'red', border: '1px solid red', borderRadius: '5px', padding: '12px', }} />
                </PDFDownloadLink>
            </Flex>

            <div style={{ margin: '20px 10px', width: '96%' }} ref={componentRef}>

                <Maindesign>
                    <Row gutter={[12, 12]}>
                        <Col span={14}>
                            <div style={{ textAlign: 'center' }}>
                                <InvoiceTitle Title={'QUOTATION'} />
                            </div>
                        </Col>
                        <Col span={10}>
                            <div style={{ textAlign: 'end', marginRight: '40px' }}>
                                {/* <p> <b>Printed&nbsp;Date:</b>&nbsp;{SalesInvoiceDate}</p> */}
                                <p style={{ fontSize: '12px', fontWeight: '500',textTransform:'uppercase' }}>(Original)</p>
                            </div>
                        </Col>
                    </Row>
                    <HeaderTable />

                </Maindesign>
                <BillPrint salesList={record.sales} />
                <Maindesign>
                    <BottomFooterComponent />
                </Maindesign>
            </div>

        </Fragment>
    )
}
