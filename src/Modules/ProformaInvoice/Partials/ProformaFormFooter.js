import { Col } from 'antd'
import React, { Fragment, useEffect } from 'react'
import { Row } from '../../../Components/Row'
import { CustomInputNumber } from '../../../Components/Form/CustomInputNumber'
import Checkbox from '../../../Components/Form/Checkbox'
import Flex from '../../../Components/Flex'
import { Select } from '../../../Components/Form/Select'
import { InputContent, TotalInputWrapper, TotalWrapper } from '../../../Components/Styled'
import Label from '../../../Components/Form/Label'
import PrintHeader from '../../Sales/Partials/PrintHeader'

export const ProformaFormFooter = (props) => {

    const { setRefDate, setPrintDated, setDeliveryNoteDate, receivedDisable, payType, setPayType, round, setRound, HandleCheQueChage, setRoundAmount, setReceivedAmount, tableSecondaryData, tableFooterData } = props;

    const optionted = [

        { label: 'Cash', value: 'Cash' },
        { label: 'Cheque', value: 'Cheque' },
        { label: 'Credit', value: 'Credit' },
        { label: 'UPI', value: 'UPI' },
    ]

    const handleSelectChange = (value) => {
        setPayType(value);
        HandleCheQueChage(value);
    }

    useEffect(() => {
        if (round) {
            const num = tableSecondaryData[0]?.sub_total;
            const newInteger = parseInt(num);
            const newDecimal = (num - newInteger).toFixed(2).substr(1);
            setRoundAmount(newDecimal)
        } else {
            setRoundAmount(0)
        }
    }, [tableSecondaryData])


    const handleRoundChecked = (e) => {
        setRound(e.target.checked)
        // console.log(e.target.checked, tableSecondaryData[0]?.sub_total, 'checked');
        if (e.target.checked) {
            const num = tableSecondaryData[0]?.sub_total;
            const newInteger = parseInt(num);
            const newDecimal = (num - newInteger).toFixed(2).substr(1);

            setRoundAmount(newDecimal)
        } else {
            setRoundAmount(0)
        }
    }

    const formatAmounts = (amount) => {
        // console.log(amount, 'amountamount');
        return amount?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }


    const HandleOnchange = (val) => {
        setReceivedAmount(val)
    }

    return (
        <Fragment>
            <Row gutter={[12, 12]}>
                <Col span={24} md={12} xl={10}>
                    <PrintHeader
                        setRefDate={setRefDate}
                        setPrintDated={setPrintDated}
                        setDeliveryNoteDate={setDeliveryNoteDate}
                    />
                </Col>
                <Col span={0} xl={4}></Col>
                <Col span={24} md={12} xl={10}>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <TotalWrapper>
                                <Row gutter={[18, 18]}>
                                    <Col sm={12} md={24} span={24}>
                                        <Flex gap={'10px'} alignCenter={'true'} spaceBetween={'true'}>
                                            <h4>Total Quantity&nbsp;:&nbsp;</h4>
                                            <h4>₹&nbsp;{formatAmounts(tableSecondaryData[0].qty_total)}</h4>
                                        </Flex>
                                    </Col>
                                    <Col span={24} sm={12} md={24} >
                                        <Flex gap={'10px'} alignCenter={'true'} spaceBetween={'true'}>
                                            <h4>Total Discount&nbsp;:&nbsp;</h4>
                                            <h4>₹&nbsp;{formatAmounts(tableSecondaryData[0].discount_total)}</h4>
                                        </Flex>
                                    </Col>
                                    <Col span={24} sm={12} md={24} >
                                        <Flex gap={'10px'} alignCenter={'true'} spaceBetween={'true'}>
                                            <h4>Total Tax&nbsp;:&nbsp;</h4>
                                            <h4>₹&nbsp;{formatAmounts(tableSecondaryData[0].tax_total)}</h4>
                                        </Flex>
                                    </Col>
                                    <Col span={24} sm={12} md={24} >
                                        <Flex gap={'10px'} alignCenter={'true'} spaceBetween={'true'}>
                                            <h4>Total Amount&nbsp;:&nbsp;</h4>
                                            <h4>₹&nbsp;{formatAmounts(tableSecondaryData[0].sub_total)}</h4>
                                        </Flex>
                                    </Col>
                                    <Col span={24} sm={12} md={24} >
                                        <CustomInputNumber precision={2}
                                            label={'Old Balance'}
                                            name={'old_balance'}
                                            // placed={'end'}
                                            disabled
                                        />
                                    </Col>
                                </Row>
                            </TotalWrapper>
                        </Col>
                        <Col span={24} sm={12} md={24} lg={12} >
                            <Select
                                options={optionted}
                                label={'Payment type '}
                                placeholder={'Select Payement Type'}
                                onChange={handleSelectChange}
                                name={'payment_type'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Select the payment type !'
                                    }
                                ]} />
                        </Col>

                        <Col span={24} sm={12} md={24} lg={12}>
                            <TotalInputWrapper>
                                <div className='wrapper'>
                                    <Label>Total</Label>
                                </div>
                                <InputContent>
                                    {formatAmounts(tableFooterData?.grand_total)}
                                </InputContent>
                            </TotalInputWrapper>
                        </Col>


                        {payType === 'Cheque' && (
                            <Col span={24} sm={12} md={24} lg={12}>
                                <CustomInputNumber label={'Ref No.'} precision={0} placeholder={'Reference Number'} name={'reference_no'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter the Ref no!'
                                        }
                                    ]} />
                            </Col>
                        )}
                        {payType === 'Credit' && (
                            <Col span={24} sm={12} md={24} lg={12}>
                                <CustomInputNumber precision={0} label={'Credit Period'} placeholder={'No of days'} name={'credit_period'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter the Ref no!'
                                        }
                                    ]} />
                            </Col>
                        )}

                        {
                            payType === 'Cheque' || payType != 'Credit' && (
                                <Col span={24} sm={12} md={24} lg={12}>
                                </Col>
                            )
                        }
                        <Col span={24} sm={12} md={24} lg={12}>
                            <TotalInputWrapper>
                                <div className='wrapper'>
                                    <Label>Round Off</Label>
                                    <Checkbox onChange={handleRoundChecked} name={'round_off'} />
                                </div>
                                <InputContent>
                                    {formatAmounts(tableFooterData?.round_off_value)}
                                </InputContent>
                            </TotalInputWrapper>
                        </Col>

                        <Col span={24} sm={12} md={24} lg={12}>
                            <CustomInputNumber
                                precision={2}
                                name={'received_amt'}
                                label={'Received'}
                                placed={'end'}
                                disabled={receivedDisable}
                                onChange={(val) => HandleOnchange(val)}

                            />
                        </Col>

                        <Col span={24} sm={12} md={24} lg={12}>
                            <TotalInputWrapper>
                                <div className='wrapper'>
                                    <Label>Balance</Label>
                                </div>
                                <InputContent>
                                    {formatAmounts(tableFooterData?.balance)}
                                </InputContent>
                            </TotalInputWrapper>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    )
}