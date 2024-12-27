import React from 'react'
import { TableWrapper } from './style';
import Table from './Table';

const NewTable = ({ record }) => {

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
            <div className='tableborder'>   {/* -------> Sl. NO */}
                <div className="content__wrapper">
                    <h5 className='header__content'>
                        Sl.No
                    </h5>
                    <div className="body__content">
                        {
                            record?.sales?.map((item, index) => (
                                <h6 key={index} style={{textAlign:'left'}}>{index + 1}</h6>
                            ))
                        }
                        <br/>
                    </div>
                    <div className="footer__content">
                        <h5></h5>
                    </div>
                </div>
            </div>
            <div className='tableborder'>     {/* -------> Description of Goods */}
                <div className="content__wrapper">
                    <h5 className='header__content'> Description of Goods </h5>
                    <div className="body__content">
                        {
                            record?.sales?.map((item, index) => (
                                <h5 key={index} style={{textAlign:'left'}}>{item?.item_name}</h5>
                            ))
                        }
                       <div style={{height:'40px'}}></div>
                        {record?.total_cgst_12_percentage == "0.00" && record?.total_cgst_18_percentage == "0.00" ? ('') : (<h4 style={{textAlign:'right'}}>OUTPUT CGST</h4>)}
                        {record?.total_sgst_12_percentage == "0.00" && record?.total_sgst_18_percentage == "0.00" ? ('') : (<h4 style={{textAlign:'right'}}>OUTPUT SGST</h4>)}
                        {record?.total_igst_12_percentage == "0.00" && record?.total_igst_18_percentage == "0.00" ? ('') : (<h4 style={{textAlign:'right'}}>OUTPUT IGST</h4>)}
                        <h4 style={{textAlign:'right'}}>ROUND OFF LESS</h4>
                    </div>
                    <div className="footer__content">
                        <h6 style={{ textAlign: 'right' }}> Total</h6>
                    </div>
                </div>
            </div>
            <div className='tableborder'>  {/* -------> HSN/SAC */}
                <div className="content__wrapper">
                    <h5 className='header__content'> HSN/SAC </h5>
                    <div className="body__content">
                        {
                            record?.sales?.map((item, index) => (
                                <h6 key={index} style={{textAlign:'left'}}>{item?.item_hsn}</h6>
                            ))
                        }
                    </div>
                    <div className="footer__content">
                        <h6 style={{ textAlign: 'right' }}></h6>
                    </div>
                </div>
            </div>
           
            <div className='tableborder'>   {/* -------> Part No. */}
                <div className="content__wrapper">
                    <h5 className='header__content'>Part No. </h5>
                    <div className="body__content">
                    </div>
                    <div className="footer__content">
                        <h5></h5>
                    </div>
                </div>
            </div>

            <div className='tableborder'>   {/* -------> Quantity */}
                <div className="content__wrapper">
                    <h5 className='header__content'>Quantity</h5>
                    <div className="body__content">
                        {
                            record?.sales?.map((item, index) => (
                                <h5 key={index} style={{textAlign:'right'}}>{parseFloat(item.quantity).toFixed(0)} {item.unit}</h5>
                            ))
                        }
                        <br/>
                    </div>
                    <div className="footer__content">
                        <h5>{parseFloat(formatAmounts(parseFloat(record?.qty_total))).toFixed(0)}</h5>
                    </div>
                </div>
            </div>

            <div className='tableborder'>   {/* -------> Rate */}
                <div className="content__wrapper">
                    <h5 className='header__content'>Rate</h5>
                    <div className="body__content">
                        {
                            record?.sales?.map((item, index) => (
                                <h6 key={index} style={{textAlign:'right'}}>{formatAmounts(parseFloat(item?.price_amount))}</h6>
                            ))
                        }
                        <br/>
                    </div>
                    <div className="footer__content">
                        <h5></h5>
                    </div>
                </div>
            </div>

            <div className='tableborder'>   {/* -------> Dis % */}
                <div className="content__wrapper">
                    <h5 className='header__content'>Dis % </h5>
                    <div className="body__content">
                        {
                            record?.sales?.map((item, index) => (
                                <h6 key={index} style={{textAlign:'right'}}>{item?.discount_percentage}</h6>
                            ))
                        }
                        <br/>
                    </div>
                    <div className="footer__content">
                        <h5></h5>
                    </div>
                </div>
            </div>

            <div className='tableborder'>   {/* -------> per*/}
                <div className="content__wrapper">
                    <h5 className='header__content'>per</h5>
                    <div className="body__content">
                        {
                            record?.sales?.map((item, index) => (
                                <h6 key={index} style={{textAlign:'right'}}>{item?.unit}</h6>
                            ))
                        }
                        <br/>
                    </div>
                    <div className="footer__content">
                        <h5></h5>
                    </div>
                </div>
            </div>

            <div className='tableborder'>   {/* -------> Amount*/}
                <div className="content__wrapper">
                    <h5 className='header__content'>Amount</h5>
                    <div className="body__content">
                        {
                            record?.sales?.map((item, index) => (
                                <h5 key={index} style={{textAlign:'right'}}>{formatAmounts(parseFloat(item?.item_amt_no_gst))}</h5>
                            ))
                        }
                        <h6 style={{ fontSize: '12px',textAlign:'right', fontWeight: '500',height:'30px', borderTop: '0.5px solid black', margin: '5px 2px',padding:'5px' }}>{formatAmounts(formattedNoTaxAmt)}</h6>
                        {record?.total_cgst_12_percentage == "0.00" && record?.total_cgst_18_percentage == "0.00" ? ('') : (<h5 style={{textAlign:'right'}}>{formatAmounts(formattedCgst)}</h5>)}
                        {record?.total_sgst_12_percentage == "0.00" && record?.total_sgst_18_percentage == "0.00" ? ('') : (<h5 style={{textAlign:'right'}}>{formatAmounts(formattedSgst)}</h5>)}
                        {record?.total_igst_12_percentage == "0.00" && record?.total_igst_18_percentage == "0.00" ? ('') : (<h5 style={{textAlign:'right'}}>{formatAmounts(formattedIgst)}</h5>)}
                        <h5 style={{textAlign:'right'}}>- {record?.round_off_value}</h5>
                    </div>
                    <div className="footer__content">
                        <h5>₹ {formatAmounts(parseFloat(record?.grand_total))}</h5>
                    </div>
                </div>
            </div>
        </TableWrapper>
    )
}

export default NewTable
