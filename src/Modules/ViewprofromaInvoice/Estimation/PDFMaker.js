import React, { useEffect, useState } from 'react'
import request from '../../../utils/request';
import dayjs from 'dayjs'
import {  Document, Page, View, Text,  } from '@react-pdf/renderer';

export const PDFMaker = ({ record }) => {

    const [companyProfile, setCompanyProfile] = useState({})

    useEffect(() => {
        GetCompProfile()
    }, [])

    const GetCompProfile = () => {
        request.get('profile/business_view')
            .then(resp => {
                setCompanyProfile(resp.data)
            })
            .catch(error => console.log(error))
    }

    const Header = () => {  
        return (
            <>
            <Text style={{textAlign:'center',marginBottom:'10px',fontSize:'12px',fontWeight:'500'}}>Quotation</Text>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-evenly", borderTop: '1px solid black', borderLeft: '1px solid black', borderBottom: '1px solid black', padding: '2px 10px', flex: '0.5' }}>
                            <Text style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>{companyProfile?.business_name}</Text><br />
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>{companyProfile?.address}</Text><br />
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>{companyProfile?.phone_no} , {companyProfile?.phone_no2}</Text><br />
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>Email :&nbsp;{companyProfile?.email}</Text><br />
                            <Text style={{ fontSize: '10px', fontWeight: '500' }}>GSTIN :&nbsp;{companyProfile?.gstin}</Text><br />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0.5' }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ borderLeft: '1px solid black', borderTop: '1px solid black', borderRight: '1px solid black', height: '100%', textAlign: 'center', flex: '0.5' }}>
                                    <Text style={{ fontSize: '10px', fontWeight: '500', marginBottom: '5px', marginTop: '3px' }}>Invoive No.</Text><br />
                                    <Text style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}>{record.invoice_no}</Text>
                                </View>
                                <View style={{ borderTop: '1px solid black', borderRight: '1px solid black', height: '100%', textAlign: 'center', flex: '0.5' }}>
                                    <Text style={{ fontSize: '10px', fontWeight: '500', marginBottom: '5px', marginTop: '3px' }}>Dated</Text><br />
                                    <Text style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}>{dayjs(record?.invoice_date).format("DD-MM-YYYY")}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ borderLeft: '1px solid black', borderTop: '1px solid black', borderBottom: '1px solid black', borderRight: '1px solid black', height: '100%', textAlign: 'center', flex: '0.5' }}>
                                    <Text style={{ fontSize: '10px', fontWeight: '500', marginBottom: '20px', marginTop: '3px' }}>Delivery Note</Text>
                                </View>
                                <View style={{ borderRight: '1px solid black', borderTop: '1px solid black', borderBottom: '1px solid black', height: '100%', textAlign: 'center', flex: '0.5' }}>
                                    <Text style={{ fontSize: '10px', fontWeight: '500', marginBottom: '20px', marginTop: '3px' }}>Mode/ Terms of Payments</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ borderLeft: '1px solid black', borderRight: '1px solid black', borderBottom: '1px solid black', height: '100%', textAlign: 'center', flex: '0.5' }}>
                                    <Text style={{ fontSize: '10px', fontWeight: '500', marginBottom: '20px', marginTop: '3px' }}>Supplier's Ref</Text>
                                </View>
                                <View style={{ borderBottom: '1px solid black', borderRight: '1px solid black', height: '100%', textAlign: 'center', flex: '0.5' }}>
                                    <Text style={{ fontSize: '10px', fontWeight: '500', marginBottom: '20px', marginTop: '3px' }}>Other Reference</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ borderLeft: '1px solid black', borderBottom: '1px solid black', padding: '2px 10px', flex: '0.5', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: "space-evenly", }}>
                            <Text style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>Bill to</Text>
                            <Text style={{ fontSize: '10px', fontWeight: '500', textTransform: 'uppercase' }}>{record.customer_name}</Text>
                            <Text style={{ fontSize: '10px', fontWeight: '500', textTransform: 'uppercase' }}>{record.Address}</Text>
                            <Text style={{ fontSize: '10px', fontWeight: '500', textTransform: 'uppercase' }}>GSTIN : <Text style={{ fontSize: '10px', fontWeight: '500' }}>{record.GSTIN}</Text></Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', flex: '0.5', borderRight: '1px solid black', borderBottom: '1px solid black', borderLeft: '1px solid black', }}>
                            <View style={{ display: 'flex', flexDirection: 'row', flex: '0.5', borderBottom: '1px solid black', justifyContent: 'space-evenly', }}>
                                <View style={{ padding: '2px', flex: '0.5', }}>
                                    <Text style={{ fontSize: '11px', fontWeight: '500' }}>OrderNo.</Text>
                                </View>
                                <View style={{ padding: '2px', flex: '0.5', borderLeft: '1px solid black' }}>
                                    <Text style={{ fontSize: '11px', fontWeight: '500' }}>Dated</Text>
                                </View>
                            </View>
                            <View style={{ flex: '0.5', }}>
                                <Text style={{ fontSize: '11px', fontWeight: '500', textAlign: 'center', marginTop: '3px' }}>Terms of Delivery</Text>
                            </View>
                        </View>

                    </View>

                </View>
            </>

        )
    }

    const Footer = () => {
        const formattedTotalAmount = record.grand_total.toLocaleString('en-In', { minimumFractionDigits: 2 });
        // const formattedroundOff = record.round_off_value.toLocaleString('en-In', { minimumFractionDigits: 2 });
        return (
            <View style={{ position: 'absolute', bottom: '0', left: '0', width: '100vw', padding: '10px 30px' }}>
                <View style={{ marginTop: '50px' }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ flex: '0.5' }}>
                            <Text style={{ fontSize: '10px', fontWeight: '500', marginBottom: '10px' }}>Amount Chargeable (in words)</Text>
                            <Text style={{ fontSize: '10px', fontWeight: '500', marginBottom: '10px' }}>INR {record?.gt_in_words} Only</Text>
                        </View>
                        {/* <View style={{ flex: '0.5', display: 'flex', alignItems: "flex-end", flexDirection: 'row', justifyContent: 'flex-end', borderBottom: '1px solid black' }}>
                            <View style={{ flex: '0.5', alignItems: "flex-end" }}>
                                {record?.total_cgst_12_percentage === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>CGST @{parseFloat(record?.total_cgst_12_percentage).toFixed(0)}%&nbsp;:&nbsp;</Text><br /></>}
                                {record?.total_sgst_12_percentage === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>SGST @{parseFloat(record?.total_sgst_12_percentage).toFixed(0)}%&nbsp;:&nbsp;</Text><br /></>}
                                {record?.total_cgst_18_percentage === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>CGST @{parseFloat(record?.total_cgst_18_percentage).toFixed(0)}%&nbsp;:&nbsp;</Text><br /></>}
                                {record?.total_sgst_18_percentage === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>SGST @{parseFloat(record?.total_sgst_18_percentage).toFixed(0)}%&nbsp;:&nbsp;</Text><br /></>}
                                {record?.total_igst_12_percentage === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>IGST @{parseFloat(record?.total_igst_12_percentage).toFixed(0)}%&nbsp;:&nbsp;</Text><br /></>}
                                {record?.total_igst_18_percentage === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>IGST @{parseFloat(record?.total_igst_18_percentage).toFixed(0)}%&nbsp;:&nbsp;</Text><br /></>}
                            </View>
                            <View style={{ flex: '0.5', alignItems: "flex-end" }}>
                                {record?.total_cgst_12_amount === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: '500', marginBottom: '10px' }}>{record?.total_cgst_12_amount.toLocaleString('en-In', { minimumFractionDigits: 2 })}</Text><br /></>}
                                {record?.total_sgst_12_amount === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: '500', marginBottom: '10px' }}>{record?.total_sgst_12_amount.toLocaleString('en-In', { minimumFractionDigits: 2 })}</Text><br /></>}
                                {record?.total_cgst_18_amount === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: '500', marginBottom: '10px' }}>{record?.total_cgst_18_amount.toLocaleString('en-In', { minimumFractionDigits: 2 })}</Text><br /></>}
                                {record?.total_sgst_18_amount === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: '500', marginBottom: '10px' }}>{record?.total_sgst_18_amount.toLocaleString('en-In', { minimumFractionDigits: 2 })}</Text><br /></>}
                                {record?.total_igst_12_amount === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: '500', marginBottom: '10px' }}>{record?.total_igst_12_amount.toLocaleString('en-In', { minimumFractionDigits: 2 })}</Text><br /></>}
                                {record?.total_igst_18_amount === "0.00" ? <></> : <><Text style={{ fontSize: '11px', fontWeight: '500', marginBottom: '10px' }}>{record?.total_igst_18_amount.toLocaleString('en-In', { minimumFractionDigits: 2 })}</Text><br /></>}
                            </View>
                        </View> */}
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', }}>
                        <View style={{ flex: '0.5' }}>

                        </View>
                        <View style={{ flex: '0.5', display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ fontSize: '11px', fontWeight: 'bold', flex: '0.5', textAlign: 'right', marginTop: '5px' }}>Total :</Text>
                            <Text style={{ fontSize: '11px', fontWeight: 'bold', flex: '0.5', textAlign: 'right', marginTop: '5px' }}>Rs.&nbsp;{formattedTotalAmount}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', }}>
                    <View style={{ flex: '0.5' }}>
                        <Text style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>Delcaration</Text>
                        <Text style={{ fontSize: '10px', fontWeight: '500', paddingRight: '20px' }}>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct</Text>
                    </View>
                    <View style={{ flex: '0.5' }}>
                        <Text style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>Company Bank Details</Text>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>A/c Holder Name : <Text style={{ fontSize: '10px', fontWeight: '500' }}>{companyProfile?.bank_account_name}</Text></Text>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>Bank Name : <Text style={{ fontSize: '10px', fontWeight: '500' }}>{companyProfile?.bank_name}</Text></Text>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>A/c No : <Text style={{ fontSize: '10px', fontWeight: '500' }}>{companyProfile?.bank_account_number}</Text></Text>
                        <Text style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>Branch& IFSC Code : <Text style={{ fontSize: '10px', fontWeight: '500' }}>{companyProfile?.bank_branch} & {companyProfile?.ifsc_code}</Text></Text>
                    </View>
                </View>
                <View style={{ border: '1px solid black', padding: '4px', marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'left' }}>Customer's Seal and Signature</Text>
                        <Text style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'right' }}>For : {companyProfile?.business_name}</Text>
                    </View>
                    <View style={{ marginTop: '30px' }}>
                        <Text style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'right' }}>Authorised Signatory</Text>
                    </View>

                </View>
                <Text style={{ fontSize: '10px', fontWeight: '500', textAlign: 'center', marginTop: '10px' }}>This is a Computer generated Invoice</Text>
            </View>
        )
    }

    const TableHeadings = () => {
        return (
            <View style={{ display: 'flex', flexDirection: 'row', border: '1px solid black', marginTop: '10px', }}>
                <View style={{ flex: '1', borderRight: '1px solid black', padding: '10px 0' }}>
                    <Text style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>S.No</Text>
                </View>
                <View style={{ flex: '1', borderRight: '1px solid black', padding: '10px 0' }}>
                    <Text style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>Particulars</Text>
                </View>
                <View style={{ flex: '1', borderRight: '1px solid black', padding: '10px 0' }}>
                    <Text style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>HSN</Text>
                </View>
                <View style={{ flex: '1', borderRight: '1px solid black', padding: '10px 0' }}>
                    <Text style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>Quantity</Text>
                </View>
                <View style={{ flex: '1', borderRight: '1px solid black', padding: '10px 0' }}>
                    <Text style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>Rate</Text>
                </View>
                <View style={{ flex: '1', borderRight: '1px solid black', padding: '10px 0' }}>
                    <Text style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>Per</Text>
                </View>
                <View style={{ flex: '1', padding: '10px 0' }}>
                    <Text style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>Amount</Text>
                </View>
            </View>
        )
    }


    const objectsPerPage = 10;
    const totalPages = Math.ceil(record?.sales.length / objectsPerPage);
    return (
        <Document>
            {Array.from({ length: totalPages }, (_, pageIndex) => (
                <Page key={pageIndex} style={{ padding: '40px 30px' }}>
                    <Header />
                    <TableHeadings />
                    {record?.sales
                        .slice(pageIndex * objectsPerPage, (pageIndex + 1) * objectsPerPage)
                        .map((value, index) => {
                            // const formattedAmount = (value?.item_amt_no_gst).toLocaleString('en-IN', { minimumFractionDigits: 2 });
                            const formattedTaxRate = (value.price_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 });
                            return (
                                <>
                                    <View style={{ display: 'flex', flexDirection: 'row', }}>
                                        <View style={{ flex: '1', padding: '5px 0', borderBottom: '1px solid black', borderRight: '1px solid black', borderLeft: '1px solid black' }}>
                                            <Text style={{ fontSize: '10px', textAlign: 'center' }}>{index + 1}</Text>
                                        </View>
                                        <View style={{ flex: '1', padding: '5px 0', borderBottom: '1px solid black', borderRight: '1px solid black' }}>
                                            <Text style={{ fontSize: '10px', textAlign: 'center' }}>{value.item_name}</Text>
                                        </View>
                                        <View style={{ flex: '1', padding: '5px 0', borderBottom: '1px solid black', borderRight: '1px solid black' }}>
                                            <Text style={{ fontSize: '10px', textAlign: 'center' }}>{value.item_hsn}</Text>
                                        </View>
                                        <View style={{ flex: '1', padding: '5px 0', borderBottom: '1px solid black', borderRight: '1px solid black' }}>
                                            <Text style={{ fontSize: '10px', textAlign: 'center' }}>{value.quantity} {value.unit}</Text>
                                        </View>
                                        <View style={{ flex: '1', padding: '5px 0', borderBottom: '1px solid black', borderRight: '1px solid black' }}>
                                            <Text style={{ fontSize: '10px', textAlign: 'center' }}>{formattedTaxRate}</Text>
                                        </View>
                                        <View style={{ flex: '1', padding: '5px 0', borderBottom: '1px solid black', borderRight: '1px solid black' }}>
                                            <Text style={{ fontSize: '10px', textAlign: 'center' }}>{value.unit}</Text>
                                        </View>
                                        <View style={{ flex: '1', padding: '5px 0', borderBottom: '1px solid black', borderRight: '1px solid black' }}>
                                            {/* <Text style={{ fontSize: '10px', textAlign: 'center' }}>{formattedAmount}</Text> */}
                                        </View>

                                    </View>
                                </>
                            )
                        })}
                    {pageIndex === totalPages - 1 && (
                        <Footer />
                    )}

                </Page>
            ))}
        </Document>

    )
}
