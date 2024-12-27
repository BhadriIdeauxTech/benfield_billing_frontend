import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import Flex from '../../../Components/Flex';
import Button from '../../../Components/Form/Button';
import { MdLocalPrintshop } from "react-icons/md";
import BottomFooter from './PrintContainer/BottomFooter';
import Tables from './UpdatePrint/Partials/Table';
import Headers from './UpdatePrint/Partials/Header';
import { PrintFixedWrapper } from './TableStyle';

const NewFixedPrintDesign = (props) => {
    const { record, companyProfile,HeadingChange,isGSTClicked } = props;

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })
    return (
        <div>
            <Flex gap={'20px'} centerVertically={true}>
                <Button.Primary onClick={handlePrint} icon={<MdLocalPrintshop size={24} />} />
                {/* <PDFDownloadLink fileName={`Invoice-${record?.company_name}${record?.invoice_date}`}  document={<PDFMaker record={record} />}>
                    <FilePdfOutlined style={{ color: 'red', border: '1px solid red', borderRadius: '5px', padding: '12px', }} />
                </PDFDownloadLink> */}
            </Flex>
            <div style={{ margin: '20px auto', width: '96%' }} ref={componentRef}>
                <PrintFixedWrapper>
                    {/* <h1>Tax Invoice</h1> */}
                    <table className='container' style={{ width: '100%', border: 'none' }}>
                        <thead className='header headerTopspace'>
                            {HeadingChange ? record?.tax_type === "GST" ? <h1>Proforma Tax Invoice</h1> : <h1>Proforma Estimate Invoice</h1>
                                :
                                record?.tax_type === "GST" ? <h1>Tax Invoice</h1> : <h1>Estimate Invoice</h1>}
                            <Headers data={companyProfile} record={record} />
                            {/* <tr className=''>
                                <th style={{ border: '1px solid #000', margin: '20px' }}>
                                </th>
                            </tr> */}
                        </thead>
                        <tbody >
                            <div className='headerTopspace'>
                                <Tables record={record} isGSTClicked={isGSTClicked} HeadingChange={HeadingChange} />
                                <BottomFooter record={companyProfile} grandtotalData={record} />
                                {/* <tr > */}
                                {/* <td></td> */}
                                {/* <td > */}
                                {/* </td> */}
                                {/* </tr> */}
                            </div>
                        </tbody>
                        <tfoot>

                            <h6
                                style={{
                                    fontSize: '10px',
                                    fontWeight: '500',
                                    textAlign: 'center',
                                    position: 'relative',
                                    margin: '18px',

                                }}
                            >
                                This is a Computer Generated Invoice
                            </h6>
                        </tfoot>
                    </table>
                </PrintFixedWrapper>
            </div>
        </div>
    )
}

export default NewFixedPrintDesign




