import React from 'react'
import { TableWrapper } from './style';

const NewTable2 = ({ record }) => {

    const data = [
        {
            name:'Sl.No',
            value:[
                {
                    no:'1',
                },
                {
                    no:'2',
                },
            ]
        },
        {
            name:'descrirtion',
            value:[
                {
                    no:'const formattedCgst = parseFloat(record?.total_cgst_12_amount) + parseFloat(record?.total_cgst_18_amount); const formattedCgst = parseFloat(record?.total_cgst_12_amount) + parseFloat(record?.total_cgst_18_amount);',
                },
                {
                    no:'2',
                },
            ]
        }
    ]

    const formatAmounts = (amount) => {
        return amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    const formattedNoTaxAmt = record?.sub_total - record?.tax_total;

    const formattedCgst = parseFloat(record?.total_cgst_12_amount) + parseFloat(record?.total_cgst_18_amount);  //---> Total CGST
    const formattedSgst = parseFloat(record?.total_sgst_12_amount) + parseFloat(record?.total_sgst_18_amount);  //---> Total SGST
    const formattedIgst = parseFloat(record?.total_igst_12_amount) + parseFloat(record?.total_igst_18_amount);  //---> Total IGST
    return (
        <TableWrapper>
            {/* <Table record={record}/> */}
            {
                data?.map((item)=>(
                    <div className='tableborder'>   {/* -------> Sl. NO */}
                    <div className="content__wrapper">
                        <h5 className='header__content'>
                           {item?.name}
                        </h5>
                        <div className="body__content">
                            {item?.value?.map((sale,index)=>(
                                <h5 style={{background:'green',marginTop:'5px',height:'max-content'}} key={index}>{sale?.no}</h5>
                            ))}
                        </div>
                        <div className="footer__content">
                            <h5></h5>
                        </div>
                    </div>
                </div>
                ))
            }
           
        </TableWrapper>
    )
}

export default NewTable2

