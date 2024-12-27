import React from 'react'
import { Box, Maindesign, Reverse } from './style'
import { Table } from '../../../Components/Table'
import { Row } from '../../../Components/Row'
import { Col } from 'antd'
import Flex from '../../../Components/Flex'

const Print = ({ componentRef }) => {

    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Company ID',
            dataIndex: 'id',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Company Name',
            dataIndex: 'name',
        },
        {
            title: 'Contact',
            dataIndex: 'number',
        }
    ]

    return (
        <div style={{ margin: '20px 0' }} ref={componentRef}>
            <Maindesign>
                <Reverse gutter={[12, 12]} >
                    <Col span={24} lg={12}>
                        <h4>Zayit Tech Solutions</h4>
                        <p>541, Classic Crest, st block Koramangala, Bangalore 34</p>
                        <p>Phon no. 1234567690</p>
                        <p>GSTIN: 1233445677778</p>
                        <p>State: kerala </p>
                    </Col>
                    <Col span={24} lg={12} >
                        <Flex end>
                            <h1>Paint</h1>
                        </Flex>
                    </Col>
                </Reverse>
                <Flex center><h3>TAX INVOICE</h3></Flex>
                <Row gutter={[12, 12]}>
                    <Col span={24} lg={12}>
                        <p>Bill To:</p>
                        <p>Classic Enterprises</p>
                        <p>Maratha road, Bangalore</p>
                        <p>Phone: 1234567890</p>
                        <p>Email: ouph@gmail.com</p>
                    </Col>
                    <Col span={24} lg={12} style={{ float: 'right', textAlign: 'end' }}>
                        <p>Invoice No. 1122334455</p>
                        <p> Date: 08-02-2022</p>
                        <p>Due Date: 18-02-2023</p>
                    </Col>
                </Row>
                <br />
                <Table columns={columns} />
                <br />
                <Row gutter={[24, 24]}>
                    <Col span={24} lg={12}>
                        <p>Pay to - ADE Indian Bank</p>
                        <p>Account Name - Gkudui </p>
                        <p>Account No - 123456GHRFU7890</p>
                        <p>IFSC Code - 879YUH8897</p>
                    </Col>
                    {/* <p><b>Description :</b></p>
                        <Box>
                            <p>The sample check demo some products sample check demo some products</p>
                        </Box>
                        <br />
                        <p><b>Terms & Conditions :</b></p>
                        <Box>
                            <p>The sample check demo some products sample check demo some products</p>
                        </Box> */}

                    <Col span={24} lg={12}>
                        <Flex spcPadding spaceEvenly><p><b>SubTotal:</b></p><p>₹&nbsp;1,500</p></Flex>
                        <Flex spcPadding spaceEvenly><p><b>Discount:</b></p><p>₹&nbsp;0923</p></Flex>
                        <Flex spcPadding spaceEvenly><p><b>SGST@9%:</b></p><p>₹&nbsp;879</p></Flex>
                        <Flex spcPadding spaceEvenly><p><b>CGST%8%:</b></p><p>₹&nbsp;23</p></Flex>
                        <Flex spcPadding style={{ backgroundColor: '#8056F7', color: '#fff', padding: '5px 0', width: '50%', margin: '0 auto' }} spaceEvenly>
                            <p><b>Total:</b></p><p>₹&nbsp;879</p></Flex>
                        <Flex spcPadding spaceEvenly><p><b>Balance Due:</b></p><p>₹&nbsp;9780</p></Flex><br />
                        {/* <Flex spaceEvenly><p><b>Balance Due:</b></p><p>₹&nbsp;9780</p></Flex> */}
                    </Col>
                    <Col span={24} lg={12}></Col>
                    <Col span={24} lg={12} style={{ textAlign: 'center' }}>
                        <p>For , <b>Zayit Tech Solutions</b></p>
                        <p>Signature,</p>
                    </Col>
                </Row>


            </Maindesign>
        </div>
    )
}

export default Print