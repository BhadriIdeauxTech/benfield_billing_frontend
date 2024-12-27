import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { MdLocalPrintshop } from "react-icons/md";
import BottomFooter from '../PrintContainer/BottomFooter';
import Button from '../../../../Components/Form/Button';
import { PrintWrapper } from '../PrintContainer/style';
import Flex from '../../../../Components/Flex';
import Header from '../UpdatePrint/Partials/Header';
import Table from '../UpdatePrint/Partials/Table';
import Footer from '../PrintContainer/Footer';


const NewTable3 = (props) => {
    const { record, companyProfile } = props;

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <div>
            <Flex gap={'20px'} centerVertically>
                <Button.Primary onClick={handlePrint} icon={<MdLocalPrintshop size={24} />} />
                {/* <PDFDownloadLink fileName={`Invoice-${record?.company_name}${record?.invoice_date}`}  document={<PDFMaker record={record} />}>
                    <FilePdfOutlined style={{ color: 'red', border: '1px solid red', borderRadius: '5px', padding: '12px', }} />
                </PDFDownloadLink> */}
            </Flex>


            <div style={{ margin: '20px auto', width: '96%' }} ref={componentRef}>
                <PrintWrapper>
                    <h1>Tax Invoice</h1>

                    <div className="wrapper">
                        <Header data={companyProfile} record={record}/>
                        <Table record={record}/>
                        <div style={{pageBreakInside:'avoid'}}>
                        <Footer record={record}/>
                        <BottomFooter record={companyProfile}/>

                        </div>
                    </div>

                    <h6 style={{
                        fontSize:'10px',
                        fontWeight:'500',
                        textAlign:'center'
                    }}>This is a Computer Generated Invoice</h6>
                </PrintWrapper>
            </div>
        </div>
    )
}

export default NewTable3

